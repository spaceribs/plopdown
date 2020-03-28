import { StorageService, StorageAreaName } from '@plopdown/browser-ref';
import { Observable, merge, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { VideoRef } from './video-ref.model';
import {
  filter,
  pluck,
  shareReplay,
  map,
  switchMap,
  withLatestFrom,
  mapTo
} from 'rxjs/operators';
import { VideoRefsModule } from './video-refs.module';

const STORAGE_KEY = 'videoRefs';

@Injectable({
  providedIn: VideoRefsModule
})
export class VideoRefsService {
  private updating$: Observable<boolean>;
  private videoRefs$: Observable<VideoRef[]>;
  private addVideoRef$: Subject<VideoRef> = new Subject();
  private removeVideoRef$: Subject<VideoRef> = new Subject();

  constructor(private storage: StorageService) {
    this.initChangeListeners();
    this.initUpdateListeners();
  }

  private initChangeListeners() {
    const storageChanged$ = this.storage.getOnChanged().pipe(
      filter(([_, area]) => area === StorageAreaName.Local),
      filter(([changes]) => changes[STORAGE_KEY] != null),
      map(([changes]) => {
        return changes[STORAGE_KEY];
      })
    );

    const storageInitial$ = this.storage
      .get(StorageAreaName.Local, STORAGE_KEY)
      .pipe(pluck(STORAGE_KEY));

    this.videoRefs$ = merge(storageInitial$, storageChanged$).pipe(
      shareReplay(1)
    );
  }

  private initUpdateListeners() {
    const addVideoRefs$ = this.addVideoRef$.pipe(
      withLatestFrom(this.videoRefs$),
      map(([ref, videoRefs]) => {
        return [...videoRefs, ref];
      })
    );

    const removeVideoRefs$ = this.removeVideoRef$.pipe(
      withLatestFrom(this.videoRefs$),
      map(([ref, videoRefs]) => {
        return videoRefs.filter(item => {
          return item !== ref;
        });
      })
    );

    const storageUpdates$ = merge(addVideoRefs$, removeVideoRefs$);
    const storageUpdated$ = storageUpdates$.pipe(
      switchMap(newRefs => {
        return this.storage.set(StorageAreaName.Local, {
          [STORAGE_KEY]: newRefs
        });
      })
    );

    this.updating$ = merge(
      storageUpdates$.pipe(mapTo(true)),
      storageUpdated$.pipe(mapTo(false))
    );
  }

  public getVideoRefs(): Observable<VideoRef[]> {
    return this.videoRefs$;
  }

  public getUpdating(): Observable<boolean> {
    return this.updating$;
  }

  public addVideoRef(videoRef: VideoRef) {
    this.addVideoRef$.next(videoRef);
  }

  public removeVideoRef(videoRef: VideoRef) {
    this.removeVideoRef$.next(videoRef);
  }
}
