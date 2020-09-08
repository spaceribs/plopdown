import { Observable, Subject, ReplaySubject, merge, fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mapTo,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { WindowRefModule } from './window-ref.module';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: WindowRefModule,
})
export class VideoScanService {
  private document: Document;

  private refresh$: Subject<void> = new ReplaySubject(1);
  private videoElems$: Observable<HTMLVideoElement[]>;

  constructor(window: WindowRefService) {
    this.document = window.getDocument();

    this.videoElems$ = merge(window.getDocumentMutation(), this.refresh$).pipe(
      map(() => {
        return this.document.querySelectorAll<HTMLVideoElement>(
          'video:not([plopdown-ignore])'
        );
      }),
      distinctUntilChanged((a, b) => {
        if (a.length !== b.length) {
          return false;
        }
        return Array.from(a).every((node, index) => node === b[index]);
      }),
      map((domElems) => {
        const videos: HTMLVideoElement[] = [];

        if (domElems == null) {
          return videos;
        }

        domElems.forEach((elem) => {
          videos.push(elem);
        });

        return videos;
      }),
      switchMap((videos) => {
        return merge(
          ...videos.map((video) => {
            return fromEvent(video, 'onloadedmetadata');
          }),
          ...videos.map((video) => {
            return fromEvent(video, 'onplay');
          })
        ).pipe(
          tap((change) => {
            console.log(change);
          }),
          mapTo(videos),
          startWith(videos)
        );
      }),
      shareReplay(1)
    );
  }

  public refresh(): void {
    this.refresh$.next();
  }

  public getVideoElems(): Observable<HTMLVideoElement[]> {
    return this.videoElems$;
  }
}
