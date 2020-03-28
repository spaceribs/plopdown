import { OnInstalledDetails } from './runtime.model';
import { share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, fromEventPattern, from } from 'rxjs';
import { BrowserRefService } from './browser-ref.service';
import { BrowserRefModule } from './browser-ref.module';

@Injectable({
  providedIn: BrowserRefModule
})
export class RuntimeService {
  private readonly onInstalled$: Observable<OnInstalledDetails>;
  private readonly onConnect$: Observable<browser.runtime.Port>;
  private readonly browser: typeof browser;
  private onMessage$: Observable<object>;

  constructor(browserRefService: BrowserRefService) {
    this.browser = browserRefService.getBrowser();

    this.onInstalled$ = fromEventPattern<OnInstalledDetails>(
      handler => {
        this.browser.runtime.onInstalled.addListener(handler);
      },
      handler => {
        if (this.browser.runtime.onInstalled.hasListener(handler)) {
          this.browser.runtime.onInstalled.removeListener(handler);
        }
      }
    ).pipe(share());

    this.onConnect$ = fromEventPattern<browser.runtime.Port>(
      handler => {
        this.browser.runtime.onConnect.addListener(handler);
      },
      handler => {
        if (this.browser.runtime.onConnect.hasListener(handler)) {
          this.browser.runtime.onConnect.removeListener(handler);
        }
      }
    ).pipe(share());

    this.onMessage$ = fromEventPattern<object>(
      handler => {
        this.browser.runtime.onMessage.addListener(handler);
      },
      handler => {
        if (this.browser.runtime.onMessage.hasListener(handler)) {
          this.browser.runtime.onMessage.removeListener(handler);
        }
      }
    ).pipe(share());
  }

  public getOnInstalled() {
    return this.onInstalled$;
  }

  public getOnMessage() {
    return this.onMessage$;
  }

  public sendMessage(msg: object) {
    return from(this.browser.runtime.sendMessage(msg));
  }

  public openOptionsPage(): Observable<void> {
    return from(this.browser.runtime.openOptionsPage());
  }

  public getURL(path: string) {
    return this.browser.runtime.getURL(path);
  }
}
