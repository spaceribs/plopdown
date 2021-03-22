import { Injectable } from '@angular/core';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { map, startWith, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SyncMediaService {
  /**
   * Get the difference of 2 media elements with an offset.
   *
   * @param parent The primary media element to sync.
   * @param child The secondary media element to sync.
   * @param offset The offset in seconds that should be applied to the sync
   * @returns A observable number representing the difference in seconds between the two media elements.
   */
  getTimeDifference(
    parent: HTMLMediaElement,
    child: HTMLMediaElement,
    offset = 0
  ): Observable<number> {
    return combineLatest([
      fromEvent(parent, 'timeupdate').pipe(
        startWith(null),
        map(() => parent.currentTime)
      ),
      fromEvent(child, 'timeupdate').pipe(
        startWith(null),
        map(() => child.currentTime)
      ),
    ]).pipe(
      map(([parentTime, childTime]) => {
        return parentTime - (childTime + offset);
      }),
      shareReplay(1)
    );
  }

  /**
   * Get an observable that only emits true when both media elements are ready.
   *
   * @param parent The primary media element to sync with
   * @param child The secondary media element to sync with
   * @returns An observable that fires when both media elements are ready
   */
  allMediaReady(
    parent: HTMLMediaElement,
    child: HTMLMediaElement
  ): Observable<boolean> {
    return combineLatest([
      fromEvent(parent, 'loadeddata').pipe(
        startWith(null),
        map(() => parent.readyState)
      ),
      fromEvent(child, 'loadeddata').pipe(
        startWith(null),
        map(() => child.readyState)
      ),
    ]).pipe(
      map(([parentReady, childReady]) => {
        return (
          parentReady >= HTMLMediaElement.HAVE_FUTURE_DATA &&
          childReady >= HTMLMediaElement.HAVE_FUTURE_DATA
        );
      }),
      shareReplay(1)
    );
  }

  playAll(...mediaElems: HTMLMediaElement[]): void {
    mediaElems.forEach((media) => {
      media.play();
    });
  }

  pauseAll(...mediaElems: HTMLMediaElement[]): void {
    mediaElems.forEach((media) => {
      media.pause();
    });
  }
}
