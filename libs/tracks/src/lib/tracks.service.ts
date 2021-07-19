import { Remote } from '@plopdown/remotes';
import { LoggerService } from '@plopdown/logger';
import { Injectable, OnDestroy } from '@angular/core';
import { Track } from './track.model';
import {
  map,
  shareReplay,
  switchMap,
  first,
  mapTo,
  withLatestFrom,
} from 'rxjs/operators';
import {
  Observable,
  merge,
  Subscription,
  from,
  Subject,
  of,
  combineLatest,
} from 'rxjs';
import { TracksModule } from './tracks.module';
import { PouchDBService } from '@plopdown/pouchdb';

const STORAGE_KEY = 'tracks';

@Injectable({
  providedIn: TracksModule,
})
export class TracksService implements OnDestroy {
  private manualRefresh$: Subject<void> = new Subject();
  private db$: Observable<PouchDB.Database<Track>>;
  private tracks$: Observable<Track[]>;
  private subs: Subscription = new Subscription();
  private loading$: Observable<boolean>;

  constructor(logger: LoggerService, private pouchdb: PouchDBService) {
    this.db$ = pouchdb
      .createObservableDatabase<Track>(STORAGE_KEY)
      .pipe(shareReplay(1));

    const changes$ = this.db$
      .pipe(
        switchMap((db) => {
          return pouchdb.createObservableChanges(db);
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
        return db.allDocs<Track>({
          include_docs: true,
          attachments: true,
          binary: true,
        });
      }),
      map((res) => {
        return res.rows
          .map(
            (row) =>
              row.doc as PouchDB.Core.ExistingDocument<
                Track & PouchDB.Core.AllDocsMeta
              >
          )
          .filter((doc) => doc != null)
          .filter((doc) => (doc as any)?.language !== 'query');
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
      switchMap((db) => {
        return from(db.destroy());
      })
    );
  }

  public addTrack(track: PouchDB.Core.PostDocument<Track>) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.post(track)).pipe(
          switchMap((res) => {
            return from(db.get(res.id)) as Observable<Track>;
          })
        );
      }),
      first()
    );
  }

  public attachTrackFile(trackId: Track['_id'], trackRev: string, file: File) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(
          db.putAttachment(trackId, file.name, trackRev, file as any, file.type)
        );
      }),
      first()
    );
  }

  public updateTrack(track: PouchDB.Core.PutDocument<Track>) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.put(track));
      })
    );
  }

  public removeTrack(track: Track) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.remove(track as any));
      })
    );
  }

  public getTracks(): Observable<Track[]> {
    return this.tracks$;
  }

  public getTrack(id: Track['_id']) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(
          db.get(id, {
            attachments: true,
            binary: true,
          })
        );
      }),
      first()
    );
  }

  public refreshTracks() {
    this.manualRefresh$.next();
  }

  private getRemoteDB(remote: Remote) {
    return this.pouchdb.createObservableDatabase<Track>(
      `${remote.url}/${STORAGE_KEY}`,
      remote.username,
      remote.password
    );
  }

  public syncronizeRemoteDB(remote: Remote) {
    const remote$ = this.getRemoteDB(remote);
    return combineLatest([this.db$, remote$]).pipe(
      switchMap(([local, remote]) => {
        return this.pouchdb.createObservableSync(local, remote);
      })
    );
  }

  public pullRemoteDB(remote: Remote) {
    const remote$ = this.getRemoteDB(remote);
    return combineLatest([this.db$, remote$]).pipe(
      switchMap(([local, remote]) => {
        return this.pouchdb.createObservablePull(local, remote);
      })
    );
  }
}
