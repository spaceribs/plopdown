import { LoggerService } from '@plopdown/logger';
import { Observable, merge, Subject, Subscription, from, of } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { VideoRef, UnsavedVideoRef } from './video-ref.model';
import {
  shareReplay,
  map,
  withLatestFrom,
  switchMap,
  first,
  mapTo,
  catchError,
} from 'rxjs/operators';
import { VideoRefsModule } from './video-refs.module';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

const STORAGE_KEY = 'videoRefs';

@Injectable({
  providedIn: VideoRefsModule,
})
export class VideoRefsService implements OnDestroy {
  private db$: Observable<PouchDB.Database<UnsavedVideoRef>>;
  private videoRefs$: Observable<VideoRef[]>;
  private manualRefresh$: Subject<void> = new Subject();
  private subs: Subscription = new Subscription();

  private loading$: Observable<boolean>;
  private error$: Observable<Error>;

  static createObservableDatabase() {
    return new Observable<PouchDB.Database<UnsavedVideoRef>>((observer) => {
      PouchDB.plugin(PouchDBFind);

      const db = new PouchDB<UnsavedVideoRef>(STORAGE_KEY);

      observer.next(db);

      return () => {
        db.close();
      };
    });
  }

  static createObservableChanges(
    db: PouchDB.Database<UnsavedVideoRef>
  ): Observable<PouchDB.Core.ChangesResponseChange<UnsavedVideoRef>> {
    return new Observable<PouchDB.Core.ChangesResponseChange<UnsavedVideoRef>>(
      (observer) => {
        const changes = db.changes({
          live: true,
          since: 'now',
          include_docs: true,
        });

        changes.on('change', (change) => {
          observer.next(change);
        });

        changes.on('complete', () => {
          observer.complete();
        });

        changes.on('error', (err) => {
          observer.error(err);
        });

        return () => {
          changes.cancel();
        };
      }
    );
  }

  constructor(private logger: LoggerService) {
    this.db$ = VideoRefsService.createObservableDatabase().pipe(shareReplay(1));

    const changes$ = this.db$.pipe(
      switchMap((db) => {
        return VideoRefsService.createObservableChanges(db);
      })
    );

    this.error$ = changes$.pipe(
      mapTo(null),
      catchError((err: any) => of(err))
    );

    const loadVideoRefs$ = merge(
      changes$.pipe(mapTo('changes')),
      this.manualRefresh$.pipe(mapTo('manual')),
      of('initial')
    );

    this.videoRefs$ = loadVideoRefs$.pipe(
      withLatestFrom(this.db$),
      switchMap(([source, db]) => {
        logger.debug('VideoRefs updated', source);
        return from(
          db.allDocs<VideoRef>({ include_docs: true })
        );
      }),
      map((res) => {
        return res.rows
          .map(
            (row) =>
              row.doc as PouchDB.Core.ExistingDocument<
                VideoRef & PouchDB.Core.AllDocsMeta
              >
          )
          .filter((doc) => doc != null)
          .filter((doc) => (doc as any)?.language !== 'query');
      }),
      shareReplay(1)
    );

    this.loading$ = merge(
      loadVideoRefs$.pipe(mapTo(true)),
      this.videoRefs$.pipe(mapTo(false)),
      of(false)
    ).pipe(shareReplay(1));

    const indexDBSub = this.db$
      .pipe(
        switchMap((db) => {
          return from(
            db.createIndex({
              index: {
                fields: ['frameOrigin', 'framePath', 'frameSearch'],
              },
            })
          );
        })
      )
      .subscribe({
        next: (info) => {
          logger.debug('VideoRef Indexed', info);
        },
        error: (err) => {
          logger.error(err);
        },
      });
    this.subs.add(indexDBSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public refreshVideos() {
    this.manualRefresh$.next();
  }

  public getVideoRefs(): Observable<VideoRef[]> {
    return this.videoRefs$;
  }

  public getLoading(): Observable<boolean> {
    return this.loading$;
  }

  public getError(): Observable<any> {
    return this.error$;
  }

  public resetVideoRefs() {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.destroy());
      })
    );
  }

  public updateVideoRef(videoRef: VideoRef) {
    return of(videoRef).pipe(
      withLatestFrom(this.db$),
      switchMap(([vRef, db]) => {
        return from(db.put(vRef));
      })
    );
  }

  public addVideoRef(videoRef: UnsavedVideoRef): Observable<VideoRef> {
    return of(videoRef).pipe(
      withLatestFrom(this.db$),
      switchMap(([vRef, db]) => {
        return from(db.post(vRef)).pipe(
          switchMap((res) => {
            return from(db.get<VideoRef>(res.id));
          })
        );
      })
    );
  }

  public removeVideoRef(videoRef: VideoRef) {
    return of(videoRef).pipe(
      withLatestFrom(this.db$),
      switchMap(([vRef, db]) => {
        return from(db.remove(vRef));
      })
    );
  }

  public findVideoRefs(videoRef: Partial<VideoRef>) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(
          db.find({
            selector: {
              frameOrigin: videoRef.frameOrigin,
              framePath: videoRef.framePath,
              frameSearch: videoRef.frameSearch,
            },
          })
        );
      }),
      map((res) => {
        if (res.warning) {
          this.logger.warn('PouchDB Find', res.warning);
        }
        return res.docs;
      }),
      first()
    );
  }
}
