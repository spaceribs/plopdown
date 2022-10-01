import { VideoRef } from '@plopdown/video-refs';
import { Injectable } from '@angular/core';
import {
  BackgroundSubService,
  ContentScriptPubService,
} from '@plopdown/messages';
import { Observable, Subject, ReplaySubject, merge, of } from 'rxjs';
import { map, mapTo, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentScriptVideoRefsService {
  private videoRefs$: Observable<VideoRef[]>;
  private loading$: Observable<boolean>;
  private getVideoRefs$: Subject<void> = new ReplaySubject(1);

  constructor(
    private bgSub: BackgroundSubService,
    private csPub: ContentScriptPubService
  ) {
    this.videoRefs$ = this.getVideoRefs$.pipe(
      switchMap(() => {
        this.csPub.getVideoRefs();
        return this.bgSub.getVideoRefsFound();
      }),
      map((res) => res.args[0]),
      shareReplay(1)
    );

    this.loading$ = merge(
      of(false),
      this.getVideoRefs$.pipe(mapTo(true)),
      this.videoRefs$.pipe(mapTo(false))
    );

    this.getVideoRefs$.next();
  }

  public getVideoRefs(): Observable<VideoRef[]> {
    return this.videoRefs$;
  }

  public getLoading() {
    return this.loading$;
  }

  public createTrack(videoRef: VideoRef): Observable<VideoRef> {
    return new Observable((observer) => {
      this.csPub.createTrack(videoRef);
      observer.next();
      observer.complete();
    }).pipe(
      switchMap(() => {
        return this.bgSub.getVideoRefAdded();
      }),
      map((command) => {
        return command.args[0];
      })
    );
  }

  public refreshVideos() {
    this.getVideoRefs$.next();
  }
}
