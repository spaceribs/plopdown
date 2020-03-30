import { VideoElementRef } from '@plopdown/video-elem-refs';
import {
  ContentScriptSubService,
  BackgroundPubService,
  BrowserActionSubService,
  ContentScriptCommand,
  ContentScriptReady,
  BrowserActionQueryVideoRefs,
  ContentScriptIFramesFound
} from '@plopdown/messages';
import { LoggerService } from '@plopdown/logger';
import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import { Component, OnDestroy, OnInit, ErrorHandler } from '@angular/core';
import {
  RuntimeService,
  OnInstalledDetails,
  TabsService
} from '@plopdown/browser-ref';
import { Subscription, Observable, concat, combineLatest } from 'rxjs';
import {
  filter,
  switchMap,
  map,
  first,
  tap,
  shareReplay,
  scan
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
  private knownVideos$: Observable<VideoElementRef[]>;
  private knownIFrames$: Observable<string[]>;

  constructor(
    private errorHandler: ErrorHandler,
    private logger: LoggerService,
    private fileService: PlopdownFileService,
    private tracksService: TracksService,
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
      }, [] as VideoElementRef[]),
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
            this.bgPub.findVideos();
          },
          error: err => this.errorHandler.handleError(err)
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
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private addIntroTrack(): Observable<void> {
    return this.http
      .get('/background/assets/intro.vtt', { responseType: 'text' })
      .pipe(
        map(raw => {
          const file: PlopdownFile = this.fileService.decode(raw);

          const introTrack: Track = {
            id: file.headers.id,
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            cues: file.cues
          };

          return introTrack;
        }),
        map(track => {
          return this.tracksService.setTracks([track]);
        })
      );
  }

  private installContentScript() {
    const runtime$ = this.tabs.executeScript({
      file: 'content-script/runtime.js',
      allFrames: true
    });

    const polyfills$ = this.tabs.executeScript({
      file: 'content-script/polyfills.js',
      allFrames: true
    });

    const main$ = this.tabs.executeScript({
      file: 'content-script/main.js',
      allFrames: true
    });

    return concat(runtime$, polyfills$, main$);
  }
}
