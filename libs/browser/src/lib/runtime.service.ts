import { OnInstalledDetails } from './runtime.model';
import { share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, fromEventPattern } from 'rxjs';
import { BrowserService } from './browser.service';

@Injectable()
export class RuntimeService {
  private readonly onInstalled$: Observable<OnInstalledDetails>;
  private readonly onConnect$: Observable<browser.runtime.Port>;
  private readonly browser: typeof browser;

  constructor(browserService: BrowserService) {
    this.browser = browserService.getBrowser();

    this.onInstalled$ = fromEventPattern<OnInstalledDetails>(
      handler => {
        this.browser.runtime.onInstalled.addListener(handler);
      },
      handler => {
        this.browser.runtime.onInstalled.removeListener(handler);
      }
    ).pipe(share());

    this.onConnect$ = fromEventPattern<browser.runtime.Port>(
      handler => {
        this.browser.runtime.onConnect.addListener(handler);
      },
      handler => {
        this.browser.runtime.onConnect.removeListener(handler);
      }
    ).pipe(share());
  }

  public getOnInstalled() {
    return this.onInstalled$;
  }

  public getOnConnect() {
    return this.onConnect$;
  }
}
