import { LoggerService } from '@plopdown/logger';
import { Injectable, OnDestroy } from '@angular/core';
import { Track, SavedTrack } from './track.model';
import {
  map,
  shareReplay,
  switchMap,
  first,
  mapTo,
  withLatestFrom
} from 'rxjs/operators';
import { Observable, merge, Subscription, from, Subject, of } from 'rxjs';
import { TracksModule } from './tracks.module';
import PouchDB from 'pouchdb';

const STORAGE_KEY = 'tracks';

@Injectable({
  providedIn: TracksModule
})
export class TracksService implements OnDestroy {
  private manualRefresh$: Subject<void> = new Subject();
  private db$: Observable<PouchDB.Database<Track>>;
  private tracks$: Observable<SavedTrack[]>;
  private subs: Subscription = new Subscription();
  private loading$: Observable<boolean>;

  static createObservableDatabase() {
    return new Observable<PouchDB.Database<Track>>(observer => {
      const db = new PouchDB<Track>(STORAGE_KEY);

      observer.next(db);

      return () => {
        db.close();
      };
    });
  }

  static createObservableChanges(
    db: PouchDB.Database<Track>
  ): Observable<PouchDB.Core.ChangesResponseChange<Track>> {
    return new Observable<PouchDB.Core.ChangesResponseChange<Track>>(
      observer => {
        const changes = db.changes({
          live: true,
          since: 'now',
          include_docs: false
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
    );
  }

  constructor(logger: LoggerService) {
    this.db$ = TracksService.createObservableDatabase().pipe(shareReplay(1));

    const changes$ = this.db$
      .pipe(
        switchMap(db => {
          return TracksService.createObservableChanges(db);
        })
      )
      .pipe(shareReplay(1));

    const loadTracks$ = merge(
      changes$.pipe(mapTo('changes')),
      this.manualRefresh$.pipe(mapTo('manual')),
      of('initial')
    );

    this.tracks$ = loadTracks$.pipe(
      withLatestFrom(this.db$),
      switchMap(([source, db]) => {
        logger.debug('Tracks updated', source);
        return db.allDocs<SavedTrack>({
          include_docs: true,
          attachments: true,
          binary: true
        });
      }),
      map(res => {
        return res.rows
          .map(row => row.doc)
          .filter(row => row['language'] !== 'query');
      }),
      shareReplay(1)
    );

    this.loading$ = merge(
      loadTracks$.pipe(mapTo(true)),
      this.tracks$.pipe(mapTo(false)),
      of(false)
    ).pipe(shareReplay(1));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public getLoading() {
    return this.loading$;
  }

  public resetTracks() {
    return this.db$.pipe(
      switchMap(db => {
        return from(db.destroy());
      })
    );
  }

  public addTrack(track: PouchDB.Core.PostDocument<Track>) {
    return this.db$.pipe(
      switchMap(db => {
        return from(db.post(track));
      }),
      first()
    );
  }

  public attachTrackFile(
    trackId: SavedTrack['_id'],
    trackRev: SavedTrack['_rev'],
    file: File
  ) {
    return this.db$.pipe(
      switchMap(db => {
        return from(
          db.putAttachment(trackId, file.name, trackRev, file as any, file.type)
        );
      }),
      first()
    );
  }

  public updateTrack(track: PouchDB.Core.PutDocument<Track>) {
    return this.db$.pipe(
      switchMap(db => {
        return from(db.put(track));
      })
    );
  }

  public removeTrack(track: SavedTrack) {
    return this.db$.pipe(
      switchMap(db => {
        return from(db.remove(track));
      })
    );
  }

  public getTracks(): Observable<SavedTrack[]> {
    return this.tracks$;
  }

  public getTrack(id: SavedTrack['_id']) {
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

  public refreshTracks() {
    this.manualRefresh$.next();
  }
}
