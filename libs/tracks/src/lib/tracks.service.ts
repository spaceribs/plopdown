import { LoggerService } from '@plopdown/logger';
import { Injectable, OnDestroy } from '@angular/core';
import { Track, SavedTrack } from './track.model';
import {
  map,
  shareReplay,
  concatMap,
  withLatestFrom,
  switchMap,
  first,
  tap
} from 'rxjs/operators';
import { Observable, merge, Subscription, Subject, from, forkJoin } from 'rxjs';
import { TracksModule } from './tracks.module';
import PouchDB from 'pouchdb';

const STORAGE_KEY = 'tracks';

@Injectable({
  providedIn: TracksModule
})
export class TracksService implements OnDestroy {
  private removeTrack$: Subject<SavedTrack> = new Subject();
  private addTrack$: Subject<[Track, File[]]> = new Subject();
  private updateTrack$: Subject<SavedTrack> = new Subject();
  private db$: Observable<PouchDB.Database<Track>>;
  private tracks$: Observable<SavedTrack[]>;
  private subs: Subscription = new Subscription();

  constructor(logger: LoggerService) {
    this.db$ = new Observable<PouchDB.Database<Track>>(observer => {
      const db = new PouchDB<Track>(STORAGE_KEY);

      observer.next(db);

      return () => {
        db.close();
      };
    }).pipe(shareReplay(1));

    const changes$ = this.db$
      .pipe(
        concatMap(db => {
          return new Observable<PouchDB.Core.ChangesResponseChange<Track>>(
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
              return db.allDocs<Track>({ include_docs: true });
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
        return res.rows.map(row => row.doc);
      })
    );

    this.tracks$ = merge(initial$, changes$).pipe(shareReplay(1));

    const setTracksSub = this.addTrack$
      .pipe(
        withLatestFrom(this.db$),
        concatMap(([[track, files], db]) => {
          return from(db.post(track)).pipe(
            switchMap(info => {
              const attachments$ = files.map(file => {
                return from(
                  db.putAttachment(
                    info.id,
                    file.name,
                    info.rev,
                    file as any,
                    file.type
                  )
                ).pipe(first());
              });

              return forkJoin(attachments$);
            })
          );
        })
      )
      .subscribe({
        next: info => {
          logger.debug('Track Set', info);
        }
      });
    this.subs.add(setTracksSub);

    const updateTrackSub = this.updateTrack$
      .pipe(
        withLatestFrom(this.db$),
        concatMap(([track, db]) => {
          return from(db.put(track));
        })
      )
      .subscribe({
        next: info => {
          logger.debug('Track Updated', info);
        },
        error: err => {
          logger.error(err);
        }
      });
    this.subs.add(updateTrackSub);

    const removeTrackSub = this.removeTrack$
      .pipe(
        withLatestFrom(this.db$),
        concatMap(([track, db]) => {
          return from(db.remove(track));
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
    this.subs.add(removeTrackSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public addTrack(track: Track, files: File[]) {
    this.addTrack$.next([track, files]);
  }

  public updateTrack(track: SavedTrack) {
    this.updateTrack$.next(track);
  }

  public removeTrack(track: SavedTrack) {
    this.removeTrack$.next(track);
  }

  public getTracks(): Observable<SavedTrack[]> {
    return this.tracks$;
  }

  public getTrack(id: SavedTrack['_id']): Observable<SavedTrack | null> {
    return this.db$.pipe(
      switchMap(db => {
        return from(
          db.get(id, {
            attachments: true,
            binary: true
          })
        );
      }),
      first()
    );
  }
}
