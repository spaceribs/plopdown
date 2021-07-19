import { PouchDBService } from '@plopdown/pouchdb';
import { LoggerService } from '@plopdown/logger';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, of, merge, from } from 'rxjs';
import { Remote, UnsavedRemote } from './remotes.model';
import {
  shareReplay,
  switchMap,
  mapTo,
  catchError,
  withLatestFrom,
  map,
} from 'rxjs/operators';

const STORAGE_KEY = 'feeds';

@Injectable()
export class RemotesService implements OnDestroy {
  private db$: Observable<PouchDB.Database<UnsavedRemote>>;
  private remotes$: Observable<Remote[]>;
  private manualRefresh$: Subject<void> = new Subject();
  private subs: Subscription = new Subscription();

  private loading$: Observable<boolean>;
  private error$: Observable<Error>;

  constructor(private logger: LoggerService, pouchdb: PouchDBService) {
    this.db$ = pouchdb
      .createObservableDatabase<UnsavedRemote>(STORAGE_KEY)
      .pipe(shareReplay(1));

    const changes$ = this.db$.pipe(
      switchMap((db) => {
        return pouchdb.createObservableChanges(db);
      })
    );

    this.error$ = changes$.pipe(
      mapTo(null),
      catchError((err: any) => of(err))
    );

    const loadRemotes$ = merge(
      changes$.pipe(mapTo('changes')),
      this.manualRefresh$.pipe(mapTo('manual')),
      of('initial')
    );

    this.remotes$ = loadRemotes$.pipe(
      withLatestFrom(this.db$),
      switchMap(([source, db]) => {
        logger.debug('Remotes updated', source);
        return from(db.allDocs<Remote>({ include_docs: true }));
      }),
      map((res) => {
        return res.rows
          .map(
            (row) =>
              row.doc as PouchDB.Core.ExistingDocument<
                Remote & PouchDB.Core.AllDocsMeta
              >
          )
          .filter((doc) => doc != null)
          .filter((doc) => (doc as any)?.language !== 'query');
      }),
      shareReplay(1)
    );

    this.loading$ = merge(
      loadRemotes$.pipe(mapTo(true)),
      this.remotes$.pipe(mapTo(false)),
      of(false)
    ).pipe(shareReplay(1));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public refreshRemotes() {
    this.manualRefresh$.next();
  }

  public getRemotes(): Observable<Remote[]> {
    return this.remotes$;
  }

  public getLoading(): Observable<boolean> {
    return this.loading$;
  }

  public getError(): Observable<any> {
    return this.error$;
  }

  public resetRemotes() {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.destroy());
      })
    );
  }

  public updateRemote(remote: Remote) {
    return of(remote).pipe(
      withLatestFrom(this.db$),
      switchMap(([rem, db]) => {
        return from(db.put(rem));
      })
    );
  }

  public addRemote(remote: UnsavedRemote): Observable<Remote> {
    return of(remote).pipe(
      withLatestFrom(this.db$),
      switchMap(([rem, db]) => {
        return from(db.post(rem)).pipe(
          switchMap((res) => {
            return from(db.get<Remote>(res.id));
          })
        );
      })
    );
  }

  public removeRemote(remote: Remote) {
    return of(remote).pipe(
      withLatestFrom(this.db$),
      switchMap(([rem, db]) => {
        return from(db.remove(rem));
      })
    );
  }
}
