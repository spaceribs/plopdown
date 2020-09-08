import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import {
  ContentScriptCommand,
  BackgroundPubService,
  ContentScriptSubService,
} from '@plopdown/messages';
import { TracksService } from '@plopdown/tracks';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'plopdown-tracks-requested',
  template: 'tracks-requested',
})
export class TracksRequestedComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  private onTracksRequested$: Observable<ContentScriptCommand>;

  constructor(
    private tracksService: TracksService,
    private errorHandler: ErrorHandler,
    private bgPub: BackgroundPubService,
    csSub: ContentScriptSubService
  ) {
    this.onTracksRequested$ = csSub.onTracksRequested();
  }

  ngOnInit(): void {
    const tracksRequestedSub = this.onTracksRequested$
      .pipe(
        switchMap(() => {
          return this.tracksService.getTracks();
        })
      )
      .subscribe({
        next: (tracks) => {
          this.bgPub.publishTracks(tracks);
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(tracksRequestedSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
