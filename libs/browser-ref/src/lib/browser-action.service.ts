import { BrowserRefService } from './browser-ref.service';
import { BrowserRefModule } from './browser-ref.module';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

export enum IconState {
  Ready,
  Disabled,
  Error,
}

const iconMap = {
  [IconState.Ready]: {
    16: 'icons/16.png',
    19: 'icons/19.png',
    38: 'icons/38.png',
    48: 'icons/48.png',
    128: 'icons/128.png',
  },
  [IconState.Disabled]: {
    16: 'icons/disabled/16.png',
    19: 'icons/disabled/19.png',
    38: 'icons/disabled/38.png',
    48: 'icons/disabled/48.png',
    128: 'icons/disabled/128.png',
  },
  [IconState.Error]: {
    16: 'icons/error/16.png',
    19: 'icons/error/19.png',
    38: 'icons/error/38.png',
    48: 'icons/error/48.png',
    128: 'icons/error/128.png',
  },
};

@Injectable({
  providedIn: BrowserRefModule,
})
export class BrowserActionService {
  private readonly browserAction: typeof browser.browserAction;

  constructor(browserRef: BrowserRefService) {
    this.browserAction = browserRef.getBrowser().browserAction;
  }

  setIcon(state: IconState, tabId?: number): void {
    this.browserAction.setIcon({
      path: iconMap[state],
      tabId,
    });
  }

  openPopup(): Observable<void> {
    return from(this.browserAction.openPopup());
  }
}
