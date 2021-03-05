import { LoggerService } from '@plopdown/logger';
import { OnInstalledDetails } from './runtime.model';
import { share, tap, map } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BrowserRefService } from './browser-ref.service';
import { BrowserRefModule } from './browser-ref.module';

@Injectable({
  providedIn: BrowserRefModule,
})
export class RuntimeService {
  private readonly onInstalled$: Observable<OnInstalledDetails>;
  private readonly runtime: typeof browser.runtime;
  private onMessage$: Observable<Record<string, unknown>>;

  constructor(
    browserRefService: BrowserRefService,
    logger: LoggerService,
    ngZone: NgZone
  ) {
    this.runtime = browserRefService.getBrowser().runtime;

    this.onInstalled$ = new Observable<OnInstalledDetails>((observer) => {
      function listener(details: OnInstalledDetails) {
        ngZone.run(() => {
          observer.next(details);
        });
      }

      this.runtime.onInstalled.addListener(listener);

      return () => {
        if (this.runtime.onInstalled.hasListener(listener)) {
          this.runtime.onInstalled.removeListener(listener);
        }
      };
    }).pipe(share());

    this.onMessage$ = new Observable((observer) => {
      function listener(
        msg: any,
        sender: browser.runtime.MessageSender,
        cb: () => void
      ) {
        ngZone.run(() => {
          observer.next([msg, sender, cb]);
        });
      }

      this.runtime.onMessage.addListener(listener);

      return () => {
        if (this.runtime.onMessage.hasListener(listener)) {
          this.runtime.onMessage.removeListener(listener);
        }
      };
    }).pipe(
      tap((msg) => logger.debug('New Message', msg)),
      map(([cmd]) => cmd),
      share()
    );
  }

  public getOnInstalled() {
    return this.onInstalled$;
  }

  public getOnMessage() {
    return this.onMessage$;
  }

  public sendMessage(message: Record<string, unknown>) {
    return from(this.runtime.sendMessage(message));
  }

  public openOptionsPage(): Observable<void> {
    return from(this.runtime.openOptionsPage());
  }

  public getURL(path: string) {
    return this.runtime.getURL(path);
  }
}
