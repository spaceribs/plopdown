import { LoggerService } from '@plopdown/logger';
import { Observable, merge, Subject, Subscription, from } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { VideoRef, SavedVideoRef } from './video-ref.model';
import {
  shareReplay,
  map,
  withLatestFrom,
  concatMap,
  switchMap,
  first
} from 'rxjs/operators';
import { VideoRefsModule } from './video-refs.module';
import { Track } from '@plopdown/tracks';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);
const STORAGE_KEY = 'videoRefs';

@Injectable({
  providedIn: VideoRefsModule
})
export class VideoRefsService implements OnDestroy {
  private db$: Observable<PouchDB.Database<VideoRef>>;
  private videoRefs$: Observable<VideoRef[]>;
  private addVideoRef$: Subject<VideoRef> = new Subject();
  private updateVideoRef$: Subject<VideoRef> = new Subject();
  private removeVideoRef$: Subject<SavedVideoRef> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(private logger: LoggerService) {
    this.db$ = new Observable<PouchDB.Database<VideoRef>>(observer => {
      const db = new PouchDB<VideoRef>(STORAGE_KEY);

      observer.next(db);

      return () => {
        db.close();
      };
    }).pipe(shareReplay(1));

    const changes$ = this.db$
      .pipe(
        concatMap(db => {
          return new Observable<PouchDB.Core.ChangesResponseChange<VideoRef>>(
            observer => {
              const changes = db.changes({
                live: true,
                since: 'now',
                include_docs: true
              });

              changes.on('change', change => {
                observer.next(change);
              });

              changes.on('complete', () => {
                observer.complete();
              });

              changes.on('error', err => {
                observer.error(err);
              });

              return () => {
                changes.cancel();
              };
            }
          ).pipe(
            switchMap(() => {
              return db.allDocs<VideoRef>({ include_docs: true });
            }),
            map(res => {
              return res.rows.map(row => row.doc);
            })
          );
        })
      )
      .pipe(shareReplay(1));

    const initial$ = this.db$.pipe(
      switchMap(db => {
        return from(
          db.allDocs<Track>({ include_docs: true })
        );
      }),
      map(res => {
        return res.rows
          .map(row => row.doc)
          .filter(row => row['language'] !== 'query');
      })
    );

    this.videoRefs$ = merge(initial$, changes$).pipe(shareReplay(1));

    this.db$
      .pipe(
        switchMap(db => {
          return from(
            db.createIndex({
              index: {
                fields: ['frameOrigin', 'framePath', 'frameSearch']
              }
            })
          );
        })
      )
      .subscribe({
        next: info => {
          logger.debug('VideoRef Indexed', info);
        },
        error: err => {
          logger.error(err);
        }
      });

    const setVideoRefSub = this.addVideoRef$
      .pipe(
        withLatestFrom(this.db$),
        concatMap(([videoRef, db]) => {
          return from(db.post(videoRef));
        })
      )
      .subscribe({
        next: info => {
          logger.debug('VideoRef Set', info);
        }
      });
    this.subs.add(setVideoRefSub);

    const updateVideoRefSub = this.updateVideoRef$
      .pipe(
        withLatestFrom(this.db$),
        concatMap(([videoRef, db]) => {
          return from(db.put(videoRef));
        })
      )
      .subscribe({
        next: info => {
          logger.debug('VideoRef Updated', info);
        },
        error: err => {
          logger.error(err);
        }
      });
    this.subs.add(updateVideoRefSub);

    const removeVideoRefSub = this.removeVideoRef$
      .pipe(
        withLatestFrom(this.db$),
        concatMap(([videoRef, db]) => {
          return from(db.remove(videoRef));
        })
      )
      .subscribe({
        next: info => {
          logger.debug('Track Removed', info);
        },
        error: err => {
          logger.error(err);
        }
      });
    this.subs.add(removeVideoRefSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public getVideoRefs(): Observable<VideoRef[]> {
    return this.videoRefs$;
  }

  public updateVideoRef(videoRef: VideoRef) {
    this.updateVideoRef$.next(videoRef);
  }

  public addVideoRef(videoRef: VideoRef) {
    this.addVideoRef$.next(videoRef);
  }

  public removeVideoRef(videoRef: SavedVideoRef) {
    this.removeVideoRef$.next(videoRef);
  }

  public findVideoRefs(videoRef: VideoRef) {
    return this.db$.pipe(
      switchMap(db => {
        return from(
          db.find({
            selector: {
              frameOrigin: videoRef.frameOrigin,
              framePath: videoRef.framePath,
              frameSearch: videoRef.frameSearch
            }
          })
        );
      }),
      map(res => {
        if (res.warning) {
          this.logger.warn('PouchDB Find', res.warning);
        }
        return res.docs;
      }),
      first()
    );
  }
}
