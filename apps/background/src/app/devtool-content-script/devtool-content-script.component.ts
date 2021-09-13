import { Component, ErrorHandler, OnInit, OnDestroy } from '@angular/core';
import {
  BackgroundPubService,
  ContentScriptSubService,
  DevtoolGetDevRefs,
  DevtoolSubService,
} from '@plopdown/messages';
import { UnsavedVideoRef } from '@plopdown/video-refs';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'plopdown-devtool-content-script',
  template: '',
})
export class DevtoolContentScriptComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private onGetDevRefs$: Observable<DevtoolGetDevRefs>;
  private onDevRefs$: Observable<UnsavedVideoRef[]>;

  constructor(
    private errorHandler: ErrorHandler,
    private bgPub: BackgroundPubService,
    dtSub: DevtoolSubService,
    csSub: ContentScriptSubService
  ) {
    this.onDevRefs$ = csSub.onDevRefs().pipe(
      map((command) => {
        return command.args[0];
      })
    );

    this.onGetDevRefs$ = dtSub.onGetDevRefs();
  }

  ngOnInit(): void {
    const getDevRefsSub = this.onGetDevRefs$.subscribe(() => {
      this.bgPub.getDevRefs();
    });
    this.subs.add(getDevRefsSub);

    const devRefsFoundSub = this.onDevRefs$.subscribe((devRefs) => {
      this.bgPub.devRefsFound(devRefs);
    });
    this.subs.add(devRefsFoundSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
