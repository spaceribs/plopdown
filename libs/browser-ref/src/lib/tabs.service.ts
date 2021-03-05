import { BrowserRefService } from './browser-ref.service';
import { from, of, Observable, merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { BrowserRefModule } from './browser-ref.module';
import {
  switchMap,
  mapTo,
  catchError,
  shareReplay,
  map,
  filter,
} from 'rxjs/operators';

interface ActiveInfo {
  tabId: number;
  previousTabId?: number;
  windowId: number;
}

@Injectable({
  providedIn: BrowserRefModule,
})
export class TabsService {
  tabs: typeof browser.tabs;
  private onActivated$: Observable<ActiveInfo>;

  constructor(browserRefService: BrowserRefService) {
    this.tabs = browserRefService.getBrowser().tabs;
    this.onActivated$ = new Observable((observer) => {
      function handler(activeInfo: ActiveInfo) {
        observer.next(activeInfo);
      }

      this.tabs.onActivated.addListener(handler);

      return () => {
        if (this.tabs.onActivated.hasListener(handler)) {
          this.tabs.onActivated.removeListener(handler);
        }
      };
    });
  }

  public executeScript(details: browser.extensionTypes.InjectDetails) {
    return new Observable((observer) => {
      this.tabs
        .executeScript(details)
        .then((res: any) => {
          observer.next(res);
          observer.complete();
        })
        .catch((err: Error) => {
          observer.error(err);
        });
    });
  }

  public getActiveTab(): Observable<browser.tabs.Tab> {
    const tabInit$ = from(this.tabs.query({ active: true })).pipe(
      map((tabs) => {
        return tabs[0];
      }),
      filter((tab) => tab != null)
    );
    const tabChange$ = this.onActivated$.pipe(
      switchMap((activeInfo) => {
        return this.tabs.get(activeInfo.tabId);
      })
    );
    return merge(tabInit$, tabChange$).pipe(shareReplay(1));
  }

  public sendMessage(message: Record<string, unknown>) {
    return this.getActiveTab().pipe(
      switchMap((tab) => {
        if (tab.id == null) {
          return of();
        }
        return from(this.tabs.sendMessage(tab.id, message));
      }),
      mapTo(null),
      catchError((err) => of(err))
    );
  }

  public reload(tabId: number) {
    return this.tabs.reload(tabId);
  }
}
