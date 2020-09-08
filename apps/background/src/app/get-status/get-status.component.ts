import {
  PermissionsRequestService,
  TabsService,
  WebNavigationDetails,
  WebNavigationService,
} from '@plopdown/browser-ref';
import { scan, switchMap, shareReplay, startWith, map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BackgroundPubService,
  BrowserActionQueryStatus,
  BrowserActionSubService,
  BackgroundStatus,
} from '@plopdown/messages';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import * as parser from 'tld-extract';

@Component({
  selector: 'plopdown-get-status',
  template: `get-status`,
})
export class GetStatusComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  private webNavComplete$: Observable<WebNavigationDetails>;
  private onQueryStatus$: Observable<BrowserActionQueryStatus>;

  constructor(
    private bgPub: BackgroundPubService,
    private baSub: BrowserActionSubService,
    private tabs: TabsService,
    private webNav: WebNavigationService,
    private permReq: PermissionsRequestService
  ) {
    this.webNavComplete$ = this.webNav.getOnCompleted();
    this.onQueryStatus$ = this.baSub.getQueryStatus();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const activeOrigins$ = this.webNavComplete$.pipe(
      scan((acc, details) => {
        if (details.frameId === 0 && /^https?/.test(details.url)) {
          let url: any;
          try {
            url = parser(details.url, {
              allowUnknownTLD: true,
              allowPrivateTLD: true,
            });
          } catch (err) {
            url = {
              domain: new URL(details.url).hostname,
            };
          }
          if (/\./.test(url.domain)) {
            acc.set(details.tabId, `*://*.${url.domain}/*`);
          } else {
            acc.set(details.tabId, `*://${url.domain}/*`);
          }
        }
        return acc;
      }, new Map<number, string>()),
      startWith(new Map<number, string>()),
      shareReplay(1)
    );

    const queryStatusSub = combineLatest([this.onQueryStatus$, activeOrigins$])
      .pipe(
        switchMap(([_, origins]) => {
          return this.tabs.getActiveTab().pipe(
            switchMap((tab) => {
              const tabOrigin = origins.get(tab.id || 0);
              if (tabOrigin == null) {
                return of<BackgroundStatus>({
                  active_allowed: false,
                  active_origin: null,
                });
              } else {
                return this.permReq.contains({ origins: [tabOrigin] }).pipe(
                  map((allowed) => {
                    return {
                      active_allowed: allowed,
                      active_origin: tabOrigin,
                    };
                  })
                );
              }
            })
          );
        })
      )
      .subscribe({
        next: (status: BackgroundStatus) => {
          this.bgPub.publishStatus(status);
        },
      });
    this.subs.add(queryStatusSub);
  }
}
