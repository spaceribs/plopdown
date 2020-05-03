import {
  VideoRef,
  VideoRefsService,
  SavedVideoRef
} from '@plopdown/video-refs';
import {
  ContentScriptSubService,
  BackgroundPubService,
  BrowserActionSubService,
  ContentScriptCommand,
  ContentScriptReady,
  BrowserActionQueryVideoRefs,
  ContentScriptIFramesFound,
  ContentScriptTrackRequested
} from '@plopdown/messages';
import { LoggerService } from '@plopdown/logger';
import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import { Component, OnDestroy, OnInit, ErrorHandler } from '@angular/core';
import {
  RuntimeService,
  OnInstalledDetails,
  TabsService
} from '@plopdown/browser-ref';
import {
  Subscription,
  Observable,
  concat,
  combineLatest,
  forkJoin,
  pipe
} from 'rxjs';
import {
  filter,
  switchMap,
  map,
  first,
  tap,
  shareReplay,
  scan,
  concatAll
} from 'rxjs/operators';
import { Track, TracksService } from '@plopdown/tracks';
import { HttpClient } from '@angular/common/http';

@Component({
  template: 'plopdown-background',
  selector: 'plopdown-background'
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private onNewInstall$: Observable<OnInstalledDetails>;

  private onBrowserActionQueryVideoRefs$: Observable<
    BrowserActionQueryVideoRefs
  >;

  private onContentScriptVideos$: Observable<ContentScriptCommand>;
  private onContentScriptIFrames$: Observable<ContentScriptIFramesFound>;
  private onContentScriptReady$: Observable<ContentScriptReady>;
  private knownVideos$: Observable<VideoRef[]>;
  private knownIFrames$: Observable<string[]>;
  private onContentScriptTrackReq$: Observable<ContentScriptTrackRequested>;

  constructor(
    private errorHandler: ErrorHandler,
    private logger: LoggerService,
    private fileService: PlopdownFileService,
    private tracksService: TracksService,
    private videoRefsService: VideoRefsService,
    private runtime: RuntimeService,
    private tabs: TabsService,
    private http: HttpClient,
    private bgPub: BackgroundPubService,
    csSub: ContentScriptSubService,
    baSub: BrowserActionSubService
  ) {
    this.onNewInstall$ = runtime.getOnInstalled().pipe(
      filter(details => details.reason === 'install'),
      first()
    );

    this.onBrowserActionQueryVideoRefs$ = baSub.getQueryVideoRefs();

    this.onContentScriptReady$ = csSub.onReady();
    this.onContentScriptVideos$ = csSub.onVideosFound();
    this.onContentScriptIFrames$ = csSub.onIFramesFound();
    this.onContentScriptTrackReq$ = csSub.onTrackRequested();

    this.knownVideos$ = this.onContentScriptVideos$.pipe(
      scan((acc, msg) => {
        msg.args.forEach(videoRef => {
          const exists = acc.find(item => {
            return (
              item.frameOrigin === videoRef.frameOrigin &&
              videoRef.xpath === item.xpath
            );
          });

          if (!exists) {
            acc.push(videoRef);
          }
        });

        return acc;
      }, [] as VideoRef[]),
      shareReplay(1)
    );

    this.knownIFrames$ = this.onContentScriptIFrames$.pipe(
      scan((acc, msg) => {
        msg.args.forEach(iframe => {
          if (!acc.includes(iframe)) {
            acc.push(iframe);
          }
        });

        return acc;
      }, []),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    NewInstall: {
      const newInstallSub = this.onNewInstall$
        .pipe(
          tap(() => {
            this.logger.info('First Time Install Detected');
          }),
          switchMap(() => {
            return this.addIntroTrack();
          })
        )
        .subscribe({
          next: () => {
            this.runtime.openOptionsPage();
          },
          error: err => {
            this.errorHandler.handleError(err);
          }
        });
      this.subs.add(newInstallSub);
    }

    InstallContentScript: {
      const installContentScriptSub = this.onBrowserActionQueryVideoRefs$
        .pipe(
          switchMap(() => {
            return this.installContentScript();
          }),
          switchMap(() => {
            return this.onContentScriptReady$;
          })
        )
        .subscribe({
          next: () => {
            this.logger.debug('Content Scripts Installed');
            setTimeout(() => {
              this.bgPub.findVideos();
            }, 100);
          },
          error: err => {
            this.errorHandler.handleError(err);
          }
        });
      this.subs.add(installContentScriptSub);
    }

    VideosFound: {
      const contentFoundSub = combineLatest([
        this.knownVideos$,
        this.knownIFrames$
      ]).subscribe({
        next: ([videoRefs, iframes]) => {
          this.bgPub.contentFound(videoRefs, iframes);
        },
        error: err => this.errorHandler.handleError(err)
      });
      this.subs.add(contentFoundSub);
    }

    VideoRefsFound: {
      const foundVideoRefs$ = this.knownVideos$.pipe(
        switchMap(videoRefs => {
          return forkJoin(
            videoRefs.map(videoRef => {
              return this.videoRefsService.findVideoRefs(videoRef);
            })
          );
        }),
        map<any, SavedVideoRef[]>(results =>
          results.reduce((memo, result) => memo.concat(result), [])
        )
      );

      const foundRefsAndTrack$ = foundVideoRefs$.pipe(
        switchMap(videoRefs => {
          const refs$ = videoRefs.map(videoRef => {
            return this.tracksService.getTrack(videoRef.trackId).pipe(
              map(track => {
                videoRef.track = track;
                return videoRef;
              })
            );
          });
          return forkJoin(refs$);
        })
      );

      const foundVideoRefsSub = foundRefsAndTrack$.subscribe({
        next: next => {
          this.bgPub.videoRefsFound(next);
        },
        error: err => {
          this.logger.error(err);
        }
      });
      this.subs.add(foundVideoRefsSub);
    }

    // TrackRequested: {
    //   const trackReqSub = this.onContentScriptTrackReq$
    //     .pipe(map(req => req.args))
    //     .subscribe({
    //       next: ([track]) => {
    //         console.log('yep', track);

    //         const aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // an array consisting of a single DOMString
    //         const oMyBlob = new Blob(aFileParts, { type: 'text/html' }); // the blob

    //         this.bgPub.trackFound({
    //           _id: 'test',
    //           _rev: 'test',
    //           title: 'test',
    //           for: 'test',
    //           created: 'test',
    //           cues: [],
    //           test: oMyBlob
    //         } as SavedTrack);
    //       },
    //       error: err => this.errorHandler.handleError(err)
    //     });
    //   this.subs.add(trackReqSub);
    // }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private addIntroTrack(): Observable<void> {
    const getTrack$ = this.http
      .get('/background/assets/intro.vtt', { responseType: 'text' })
      .pipe(
        map(raw => {
          const file: PlopdownFile = this.fileService.decode(raw);

          const introTrack: Track = {
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            cues: file.cues
          };

          return introTrack;
        })
      );

    const getFile$ = this.http.get('/background/assets/classics.mp3', {
      responseType: 'blob'
    });

    return forkJoin([getTrack$, getFile$]).pipe(
      map(([track, blob]) => {
        const file = new File([blob], 'classics.mp3', {
          type: 'audio/mpeg'
        });

        return this.tracksService.addTrack(track, [file]);
      })
    );
  }

  private installContentScript() {
    const zone$ = this.tabs.executeScript({
      file: 'content-script/zone-js-dist-zone.js',
      allFrames: true
    });

    const polyfills$ = this.tabs.executeScript({
      file: 'content-script/polyfills.js',
      allFrames: true
    });

    const styles$ = this.tabs.executeScript({
      file: 'content-script/styles.js',
      allFrames: true
    });

    const main$ = this.tabs.executeScript({
      file: 'content-script/main.js',
      allFrames: true
    });

    return concat(zone$, polyfills$, styles$, main$);
  }
}
