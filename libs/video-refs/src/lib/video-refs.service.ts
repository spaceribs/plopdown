import { LoggerService } from '@plopdown/logger';
import { StorageService, StorageAreaName } from '@plopdown/browser-ref';
import { Observable, merge, Subject, Subscription, of } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { VideoRef } from './video-ref.model';
import {
  filter,
  pluck,
  shareReplay,
  map,
  withLatestFrom,
  mapTo,
  tap,
  concatMap
} from 'rxjs/operators';
import { VideoRefsModule } from './video-refs.module';

const STORAGE_KEY = 'videoRefs';

@Injectable({
  providedIn: VideoRefsModule
})
export class VideoRefsService implements OnDestroy {
  private updating$: Observable<boolean>;
  private videoRefs$: Observable<VideoRef[]>;
  private setVideoRefs$: Subject<VideoRef[]> = new Subject();
  private addVideoRef$: Subject<VideoRef> = new Subject();
  private removeVideoRef$: Subject<VideoRef> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(private storage: StorageService, private logger: LoggerService) {
    this.initChangeListeners();
    this.initUpdateListeners();

    const emptySub = this.videoRefs$
      .pipe(
        filter(refs => {
          return refs == null;
        }),
        tap(refs => {
          logger.debug('videoRefs empty', refs);
        })
      )
      .subscribe({
        next: () => {
          this.setVideoRefs([]);
        },
        error: err => {
          logger.error(err);
        }
      });

    this.subs.add(emptySub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initChangeListeners() {
    const storageChanged$ = this.storage.getOnChanged().pipe(
      tap(change => {
        this.logger.debug('Change Detected', change);
      }),
      filter(([_, area]) => area === StorageAreaName.Local),
      map(([changes]) => changes),
      filter(changes => changes[STORAGE_KEY] != null),
      map(changes => changes[STORAGE_KEY].newValue),
      tap(change => {
        this.logger.debug('Changed VideoRefs', change);
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

    const storageUpdates$ = merge(
      addVideoRefs$,
      removeVideoRefs$,
      this.setVideoRefs$
    );

    const storageUpdated$ = storageUpdates$.pipe(
      concatMap(newRefs => {
        return this.storage.set(StorageAreaName.Local, {
          [STORAGE_KEY]: newRefs
        });
      })
    );

    this.updating$ = merge(
      storageUpdates$.pipe(mapTo(true)),
      storageUpdated$.pipe(mapTo(false))
    );

    const updateSub = this.updating$.subscribe({
      next: updated => {
        this.logger.debug(updated ? 'Updating videoRefs' : 'VideoRefs updated');
      }
    });
    this.subs.add(updateSub);
  }

  public getVideoRefs(): Observable<VideoRef[]> {
    return this.videoRefs$;
  }

  public getUpdating(): Observable<boolean> {
    return this.updating$;
  }

  public setVideoRefs(videoRefs: VideoRef[]) {
    this.setVideoRefs$.next(videoRefs);
  }

  public addVideoRef(videoRef: VideoRef) {
    this.addVideoRef$.next(videoRef);
  }

  public removeVideoRef(videoRef: VideoRef) {
    this.removeVideoRef$.next(videoRef);
  }
}
