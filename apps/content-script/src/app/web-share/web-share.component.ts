import { Subscription, Observable } from 'rxjs';
import {
  WebsiteWebSubService,
  ContentScriptWebPubService,
  WebsiteReady,
} from '@plopdown/window-ref';
import { Component, OnInit, ErrorHandler, OnDestroy } from '@angular/core';

@Component({
  selector: 'plopdown-web-share',
  template: '',
})
export class WebShareComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private webReady$: Observable<WebsiteReady>;

  constructor(
    private errorHandler: ErrorHandler,
    webSub: WebsiteWebSubService,
    private csWebPub: ContentScriptWebPubService
  ) {
    this.webReady$ = webSub.onReady();
  }

  ngOnInit(): void {
    const webReadySub = this.webReady$.subscribe({
      next: (cmd) => {
        console.log(cmd);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(webReadySub);

    this.csWebPub.ready();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
