import { Track } from '@plopdown/tracks';
import { Injectable } from '@angular/core';
import {
  BackgroundSubService,
  ContentScriptPubService,
} from '@plopdown/messages';
import { Observable, Subject, ReplaySubject, merge } from 'rxjs';
import { map, mapTo, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentScriptTracksService {
  private tracks$: Observable<Track[]>;
  private loading$: Observable<boolean>;
  private getTracks$: Subject<void> = new ReplaySubject(1);

  constructor(
    private bgSub: BackgroundSubService,
    private csPub: ContentScriptPubService
  ) {
    this.tracks$ = this.getTracks$.pipe(
      switchMap(() => {
        this.csPub.getTracks();
        return this.bgSub.getTracksFound();
      }),
      map((res) => res.args[0]),
      shareReplay(1)
    );

    this.loading$ = merge(
      this.getTracks$.pipe(mapTo(true)),
      this.tracks$.pipe(mapTo(false))
    );

    this.getTracks$.next();
  }

  public getTracks() {
    return this.tracks$;
  }

  public getLoading() {
    return this.loading$;
  }

  public refreshTracks() {
    this.getTracks$.next();
  }
}
