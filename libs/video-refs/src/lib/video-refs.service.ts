import { StorageService, StorageAreaName } from '@plopdown/browser';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { VideoRef } from './video-ref.model';
import { filter, pluck, shareReplay, map, switchMap } from 'rxjs/operators';

const STORAGE_KEY = 'videoRefs';

@Injectable()
export class VideoRefsService {
  private videoRefs$: Observable<VideoRef[]>;

  constructor(storage: StorageService) {
    const changed$ = storage.getOnChanged().pipe(
      filter(([_, area]) => area === StorageAreaName.Local),
      filter(([changes]) => changes['videoRefs'] != null),
      map(([changes]) => {
        return changes[STORAGE_KEY];
      })
    );

    this.videoRefs$ = storage.get(StorageAreaName.Local, STORAGE_KEY).pipe(
      pluck(STORAGE_KEY),
      switchMap(() => {
        return changed$;
      }),
      shareReplay(1)
    );
  }

  public getVideoRefs(): Observable<VideoRef[]> {
    return this.videoRefs$;
  }
}
