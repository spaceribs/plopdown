import {
  ContentScriptSubService,
  BackgroundPubService,
  BrowserActionSubService,
  BrowserActionOpened,
  BrowserActionRefreshed,
  ContentScriptCommand,
  ContentScriptReady
} from '@plopdown/messages';
import { LoggerService } from '@plopdown/logger';
import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import { Component, OnDestroy, OnInit, ErrorHandler } from '@angular/core';
import {
  RuntimeService,
  OnInstalledDetails,
  TabsService
} from '@plopdown/browser-ref';
import { Subscription, Observable, concat, merge } from 'rxjs';
import { filter, switchMap, map, first } from 'rxjs/operators';
import { Track, TracksService } from '@plopdown/tracks';
import { HttpClient } from '@angular/common/http';

@Component({
  template: 'plopdown-background',
  selector: 'plopdown-background'
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private onNewInstall$: Observable<OnInstalledDetails>;

  private onBrowserActionOpened$: Observable<BrowserActionOpened>;
  private onBrowserActionRefreshed$: Observable<BrowserActionRefreshed>;

  private onContentScriptVideos$: Observable<ContentScriptCommand>;
  private onContentScriptReady$: Observable<ContentScriptReady>;

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
    NewInstalls: {
      const nullTracks$ = tracksService
        .getTracks()
        .pipe(filter<null>(tracks => tracks == null));

      const onInstall$ = runtime
        .getOnInstalled()
        .pipe(filter(details => details.reason === 'install'));

      this.onNewInstall$ = merge(nullTracks$, onInstall$).pipe(first());
    }

    ContentScriptCommands: {
      this.onContentScriptReady$ = csSub.onReady();
      this.onContentScriptVideos$ = csSub.onVideosFound();
    }

    BrowserActionCommands: {
      this.onBrowserActionOpened$ = baSub.getOpened();
      this.onBrowserActionRefreshed$ = baSub.getRefreshed();
    }
  }

  ngOnInit(): void {
    NewInstall: {
      const newInstallSub = this.onNewInstall$
        .pipe(
          switchMap(() => {
            return this.addIntroTrack();
          })
        )
        .subscribe({
          next: () => {
            this.runtime.openOptionsPage();
            this.logger.info('First time install detected');
          },
          error: err => {
            this.errorHandler.handleError(err);
          }
        });
      this.subs.add(newInstallSub);
    }

    InstallContentScript: {
      const installContentScriptSub = this.onBrowserActionOpened$.subscribe({
        next: () => this.installContentScript(),
        error: err => this.errorHandler.handleError(err)
      });
      this.subs.add(installContentScriptSub);
    }

    VideosRefresh: {
      const videosRefreshSub = this.onBrowserActionRefreshed$.subscribe({
        next: () => {
          this.bgPub.findVideos();
        },
        error: err => this.errorHandler.handleError(err)
      });
      this.subs.add(videosRefreshSub);
    }

    VideosFound: {
      const videosFoundSub = this.onContentScriptVideos$.subscribe({
        next: msg => {
          this.bgPub.videosFound(msg.args);
        },
        error: err => this.errorHandler.handleError(err)
      });
      this.subs.add(videosFoundSub);
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
        switchMap(track => {
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
