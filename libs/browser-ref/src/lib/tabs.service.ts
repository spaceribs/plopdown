import { BrowserRefService } from './browser-ref.service';
import { from, of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BrowserRefModule } from './browser-ref.module';
import { map, switchMap, mapTo, catchError, filter, tap } from 'rxjs/operators';

export interface TabUpdatedInfo {
  active: boolean;
  attention: boolean;
  audible: boolean;
  discarded: boolean;
  height: number;
  hidden: boolean;
  highlighted: boolean;
  id: number;
  incognito: boolean;
  index: number;
  isArticle: boolean;
  lastAccessed: number;
  mutedInfo: { muted: boolean };
  pinned: boolean;
  sharingState: { camera: boolean; microphone: boolean; screen?: string };
  status: browser.tabs.TabStatus;
  successorTabId: number;
  width: number;
  windowId: number;
  url?: string;
}

@Injectable({
  providedIn: BrowserRefModule,
})
export class TabsService {
  tabs: typeof browser.tabs;

  constructor(browserRefService: BrowserRefService) {
    this.tabs = browserRefService.getBrowser().tabs;
  }

  public executeScript(details: browser.extensionTypes.InjectDetails) {
    return from(this.tabs.executeScript(details));
  }

  public getActiveTab() {
    return from(this.tabs.query({ active: true, currentWindow: true })).pipe(
      map(([activeTab]) => activeTab)
    );
  }

  public onAutoPlop() {
    return new Observable<[number, Partial<TabUpdatedInfo>, TabUpdatedInfo]>(
      (observe) => {
        const listener = (
          tabId: number,
          updated: Partial<TabUpdatedInfo>,
          info: TabUpdatedInfo
        ) => {
          observe.next([tabId, updated, info]);
        };

        browser.tabs.onUpdated.addListener(listener, {
          // urls: PLOPDOWN_SHARING_SITES,
          properties: ['status'],
        });

        return () => {
          browser.tabs.onUpdated.removeListener(listener);
        };
      }
    ).pipe(
      tap(console.log),
      filter((event) => event[2].status === 'complete')
      // filter((event) => event[2].url != null)
    );
  }

  public sendMessage(message: object) {
    return from(this.tabs.query({ active: true, currentWindow: true })).pipe(
      switchMap(([tab]) => {
        return from(this.tabs.sendMessage(tab.id, message));
      }),
      mapTo(null),
      catchError((err) => of(err))
    );
  }
}
