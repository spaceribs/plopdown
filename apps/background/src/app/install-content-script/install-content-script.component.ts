import { Component, ErrorHandler, OnInit, OnDestroy } from '@angular/core';
import {
  PermissionsRequestService,
  TabsService,
  WebNavigationDetails,
  WebNavigationService,
} from '@plopdown/browser-ref';
import { LoggerService } from '@plopdown/logger';
import {
  BackgroundPubService,
  ContentScriptReady,
  ContentScriptSubService,
} from '@plopdown/messages';
import { Subscription, Observable, of, concat } from 'rxjs';
import {
  switchMap,
  mapTo,
  catchError,
  share,
  filter,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'plopdown-install-content-script',
  template: 'install-content-script',
})
export class InstallContentScriptComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  // private onBrowserActionQueryVideoRefs$: Observable<
  //   BrowserActionQueryVideoRefs
  // >;
  private onContentScriptReady$: Observable<ContentScriptReady>;
  private webNavComplete$: Observable<WebNavigationDetails>;

  constructor(
    private errorHandler: ErrorHandler,
    private logger: LoggerService,
    private tabs: TabsService,
    private bgPub: BackgroundPubService,
    private webNav: WebNavigationService,
    private permReq: PermissionsRequestService,
    csSub: ContentScriptSubService
  ) {
    this.webNavComplete$ = this.webNav.getOnCompleted();
    this.onContentScriptReady$ = csSub.onReady();
  }

  ngOnInit(): void {
    const canInject$: Observable<boolean> = this.webNavComplete$.pipe(
      switchMap((details) => {
        if (/localhost/.test(details.url)) {
          return of(true);
        }
        return this.permReq.contains({ origins: [details.url] });
      }),
      tap((allowed) => {
        this.logger.debug('Can Inject', allowed);
      })
    );

    const installContentScript$: Observable<null | Error> = canInject$.pipe(
      filter((allowed) => allowed),
      switchMap(() => {
        return this.installContentScript().pipe(
          mapTo(null),
          catchError((err) => of(err))
        );
      }),
      share()
    );

    const contentScriptReady$ = installContentScript$.pipe(
      filter((res) => !(res instanceof Error)),
      switchMap(() => {
        return this.onContentScriptReady$;
      })
    );

    const contentScriptError$ = installContentScript$.pipe(
      filter((res) => res instanceof Error)
    );

    const contentScriptReadySub = contentScriptReady$.subscribe({
      next: () => {
        this.logger.debug('Content Scripts Installed');
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(contentScriptReadySub);

    const contentScriptErrorSub = contentScriptError$.subscribe({
      next: (res) => {
        this.logger.warn(res);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(contentScriptErrorSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private installContentScript() {
    const polyfills$ = this.tabs.executeScript({
      file: 'content-script/polyfills.js',
      allFrames: true,
    });

    const styles$ = this.tabs.insertCSS({
      file: 'content-script/styles.css',
      allFrames: true,
    });

    const main$ = this.tabs.executeScript({
      file: 'content-script/main.js',
      allFrames: true,
    });

    return concat(polyfills$, styles$, main$);
  }
}
