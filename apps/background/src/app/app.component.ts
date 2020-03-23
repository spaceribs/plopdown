import {
  BrowserActionCommand,
  ContentScriptCommand,
  BackgroundCommand
} from '@plopdown/ports';
import { LoggerService } from '@plopdown/logger';
import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import { VideoRefsService, VideoElementRef } from '@plopdown/video-refs';
import { Component, OnDestroy, OnInit, ErrorHandler } from '@angular/core';
import {
  RuntimeService,
  OnInstalledDetails,
  TabsService
} from '@plopdown/browser';
import { PortNames } from '@plopdown/ports';
import { Subscription, Observable, concat, merge, Subject } from 'rxjs';
import {
  filter,
  switchMap,
  map,
  first,
  tap,
  share,
  shareReplay,
  withLatestFrom,
  scan,
  mergeMap
} from 'rxjs/operators';
import { Track, TracksService } from '@plopdown/tracks';
import { HttpClient } from '@angular/common/http';

type FrameIdMap = Map<number, browser.runtime.Port>;
type TabIdMap = Map<number, FrameIdMap>;

@Component({
  template: 'plopdown-background',
  selector: 'plopdown-background'
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private sendCommands$: Subject<BackgroundCommand> = new Subject();
  private onNewInstall$: Observable<OnInstalledDetails>;
  private onBrowserActionPort$: Observable<browser.runtime.Port>;
  private onBrowserActionOpened$: Observable<
    [BrowserActionCommand, browser.runtime.Port]
  >;
  private onBrowserActionRefresh$: Observable<
    [BrowserActionCommand, browser.runtime.Port]
  >;

  private onContentScriptPorts$: Observable<TabIdMap>;
  private onContentScriptReady$: Observable<
    [ContentScriptCommand, browser.runtime.Port]
  >;
  private onContentScriptVideos$: Observable<
    [ContentScriptCommand, browser.runtime.Port]
  >;

  constructor(
    private errorHandler: ErrorHandler,
    private logger: LoggerService,
    private fileService: PlopdownFileService,
    private tracksService: TracksService,
    private runtime: RuntimeService,
    private tabs: TabsService,
    private http: HttpClient,
    vRefService: VideoRefsService
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

    BrowserActionCommands: {
      this.onBrowserActionPort$ = runtime.getOnConnect().pipe(
        filter(port => (port.name as PortNames) === PortNames.BrowserAction),
        tap(port => this.logger.debug('Browser Action Port Connected', port)),
        shareReplay(1)
      );

      const onBrowserActionCommand$ = this.onBrowserActionPort$.pipe(
        switchMap(port => {
          return this.getPortMessages<BrowserActionCommand>(port);
        }),
        share()
      );

      this.onBrowserActionOpened$ = onBrowserActionCommand$.pipe(
        filter(([msg]) => msg.command === 'BA_OPENED')
      );

      this.onBrowserActionRefresh$ = onBrowserActionCommand$.pipe(
        filter(([msg]) => msg.command === 'BA_REFRESH')
      );
    }

    ContentScriptCommands: {
      const onContentScriptPort$ = runtime.getOnConnect().pipe(
        filter(port => (port.name as PortNames) === PortNames.ContentScript),
        tap(port =>
          this.logger.debug('New Content Script Port Connected', port)
        )
      );

      this.onContentScriptPorts$ = onContentScriptPort$.pipe(
        scan((tabIdMap, port) => {
          const tabId = port.sender?.tab?.id;
          const frameId = port.sender?.frameId;

          if (tabId == null || frameId == null) {
            this.logger.warn(
              'TabId or FrameId for content script unavailable.'
            );
            return;
          }

          let tabRef = tabIdMap.get(tabId);

          if (tabRef == null) {
            tabRef = new Map();
            tabIdMap.set(tabId, tabRef);
          }

          tabRef.set(frameId, port);

          return tabIdMap;
        }, new Map() as TabIdMap),
        shareReplay(1)
      );

      const onContentScriptCommand$ = onContentScriptPort$.pipe(
        mergeMap(port => {
          return this.getPortMessages<ContentScriptCommand>(port);
        }),
        share()
      );

      this.onContentScriptReady$ = onContentScriptCommand$.pipe(
        filter(([msg]) => msg.command === 'CS_READY')
      );

      this.onContentScriptVideos$ = onContentScriptCommand$.pipe(
        filter(([msg]) => msg.command === 'CS_VIDEOS_FOUND')
      );
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

    SendContentScriptCommand: {
      const sendCSSub = this.sendCommands$
        .pipe(withLatestFrom(this.onContentScriptPorts$))
        .subscribe({
          next: ([command, ports]) => {
            ports.forEach(frameIdMap => {
              frameIdMap.forEach(port => {
                port.postMessage(command);
              });
            });

            this.logger.debug('Message sent to Content Scripts', command);
          },
          error: err => {
            this.errorHandler.handleError(err);
          }
        });
      this.subs.add(sendCSSub);
    }

    SendBrowserActionCommand: {
      const sendBASub = this.sendCommands$
        .pipe(withLatestFrom(this.onBrowserActionPort$))
        .subscribe({
          next: ([command, port]) => {
            port.postMessage(command);
            this.logger.debug('Message sent to Browser Action', command);
          },
          error: err => this.errorHandler.handleError(err)
        });
      this.subs.add(sendBASub);
    }

    InstallContentScript: {
      const installContentScriptSub = this.onBrowserActionOpened$.subscribe({
        next: () => this.installContentScript(),
        error: err => this.errorHandler.handleError(err)
      });
      this.subs.add(installContentScriptSub);
    }

    VideosRefresh: {
      const videosRefreshSub = this.onBrowserActionRefresh$.subscribe({
        next: () => this.refreshVideos(),
        error: err => this.errorHandler.handleError(err)
      });
      this.subs.add(videosRefreshSub);
    }

    VideosFound: {
      const videosFoundSub = this.onContentScriptVideos$.subscribe({
        next: ([msg]) => this.videosFound(msg.args),
        error: err => this.errorHandler.handleError(err)
      });
      this.subs.add(videosFoundSub);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getPortMessages<T>(
    port: browser.runtime.Port
  ): Observable<[T, browser.runtime.Port]> {
    return new Observable<[T, browser.runtime.Port]>(observer => {
      function onMessage(msg) {
        observer.next([msg, port]);
      }

      port.onMessage.addListener(onMessage);

      port.onDisconnect.addListener(() => {
        observer.complete();
      });

      return () => {
        port.onMessage.removeListener(onMessage);
      };
    });
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

  private refreshVideos() {
    this.sendCommands$.next({
      command: 'BG_FIND_VIDEOS',
      args: null
    });
  }

  private videosFound(videoRefs: VideoElementRef[]) {
    this.sendCommands$.next({
      command: 'BG_VIDEOS_FOUND',
      args: videoRefs
    });
  }
}
