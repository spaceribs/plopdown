import { LoggerService } from '@plopdown/logger';
import { browser } from 'webextension-polyfill';
import { BrowserRefService } from './browser-ref.service';
import { Observable, from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BrowserRefModule } from './browser-ref.module';
import {
  map,
  withLatestFrom,
  switchMap,
  mapTo,
  tap,
  catchError,
} from 'rxjs/operators';

@Injectable({
  providedIn: BrowserRefModule,
})
export class TabsService {
  tabs: typeof browser.tabs;

  constructor(
    browserRefService: BrowserRefService,
    private logger: LoggerService
  ) {
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
