import { Observable } from 'rxjs';
import { BrowserRefService } from './browser-ref.service';
import { BrowserRefModule } from './browser-ref.module';
import { Injectable, NgZone } from '@angular/core';
import { share } from 'rxjs/operators';
import { WebNavigationDetails } from './web-navigation.model';

@Injectable({
  providedIn: BrowserRefModule,
})
export class WebNavigationService {
  private webNavigation: typeof browser.webNavigation;
  private beforeNavigated$: Observable<WebNavigationDetails>;
  private completed$: Observable<WebNavigationDetails>;

  constructor(browserRef: BrowserRefService, ngZone: NgZone) {
    this.webNavigation = browserRef.getBrowser().webNavigation;

    this.beforeNavigated$ = new Observable<WebNavigationDetails>((observer) => {
      function listener(details: WebNavigationDetails) {
        ngZone.run(() => {
          observer.next(details);
        });
        observer.next(details);
      }

      this.webNavigation.onBeforeNavigate.addListener(listener);

      return () => {
        if (this.webNavigation.onBeforeNavigate.hasListener(listener)) {
          this.webNavigation.onBeforeNavigate.removeListener(listener);
        }
      };
    }).pipe(share());

    this.completed$ = new Observable<WebNavigationDetails>((observer) => {
      function listener(details: WebNavigationDetails) {
        ngZone.run(() => {
          observer.next(details);
        });
        observer.next(details);
      }

      this.webNavigation.onCompleted.addListener(listener);

      return () => {
        if (this.webNavigation.onCompleted.hasListener(listener)) {
          this.webNavigation.onCompleted.removeListener(listener);
        }
      };
    }).pipe(share());
  }

  getBeforeNavigated(): Observable<WebNavigationDetails> {
    return this.beforeNavigated$;
  }

  getOnCompleted(): Observable<WebNavigationDetails> {
    return this.completed$;
  }
}
