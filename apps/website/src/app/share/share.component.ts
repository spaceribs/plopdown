import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ContentScriptWebSubService,
  WebsiteWebPubService,
  ContentScriptReady,
  WindowRefService,
} from '@plopdown/window-ref';

@Component({
  selector: 'plopdown-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit, OnDestroy {
  public csReady$: Observable<ContentScriptReady>;
  public step$: Observable<number>;
  public loading$: Observable<boolean>;
  public error$: Observable<string | null>;
  private readonly subs: Subscription = new Subscription();

  constructor(
    csSub: ContentScriptWebSubService,
    private webPub: WebsiteWebPubService
  ) {
    this.csReady$ = csSub.onReady();
  }

  ngOnInit(): void {
    const csReadySub = this.csReady$.pipe().subscribe((cmd) => {
      console.log('heyo', cmd);
    });
    this.subs.add(csReadySub);

    this.webPub.ready();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
