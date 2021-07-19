import { PouchDBService } from '@plopdown/pouchdb';
import { LoggerService } from '@plopdown/logger';
import { Injectable, OnDestroy } from '@angular/core';
import { PermissionsModule } from './permissions.module';
import { Subject, Observable, Subscription, merge, of, from } from 'rxjs';
import { SavedPermission, Permission } from './permissions.model';
import {
  shareReplay,
  switchMap,
  mapTo,
  withLatestFrom,
  map,
  first,
} from 'rxjs/operators';

const STORAGE_KEY = 'permissions';

@Injectable({
  providedIn: PermissionsModule,
})
export class PermissionsService implements OnDestroy {
  private manualRefresh$: Subject<void> = new Subject();
  private db$: Observable<PouchDB.Database<Permission>>;
  private permissions$: Observable<SavedPermission[]>;
  private subs: Subscription = new Subscription();
  private loading$: Observable<boolean>;

  constructor(logger: LoggerService, pouchdb: PouchDBService) {
    this.db$ = pouchdb
      .createObservableDatabase<SavedPermission>(STORAGE_KEY)
      .pipe(shareReplay(1));

    const changes$ = this.db$
      .pipe(
        switchMap((db) => {
          return pouchdb.createObservableChanges(db);
        })
      )
      .pipe(shareReplay(1));

    const loadPermissions$ = merge(
      changes$.pipe(mapTo('changes')),
      this.manualRefresh$.pipe(mapTo('manual')),
      of('initial')
    );

    this.permissions$ = loadPermissions$.pipe(
      withLatestFrom(this.db$),
      switchMap(([source, db]) => {
        logger.debug('Permissions updated', source);
        return db.allDocs<SavedPermission>({
          include_docs: true,
          attachments: true,
          binary: true,
        });
      }),
      map((res) => {
        return res.rows
          .map((row) => row.doc as any)
          .filter((doc) => doc != null)
          .filter((doc: any) => doc['language'] !== 'query');
      }),
      shareReplay(1)
    );

    this.loading$ = merge(
      loadPermissions$.pipe(mapTo(true)),
      this.permissions$.pipe(mapTo(false)),
      of(false)
    ).pipe(shareReplay(1));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public getLoading() {
    return this.loading$;
  }

  public resetPermissions() {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.destroy());
      })
    );
  }

  public addPermission(permission: Permission) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.post(permission));
      }),
      first()
    );
  }

  public updatePermission(
    permission: PouchDB.Core.PutDocument<SavedPermission>
  ) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.put(permission));
      })
    );
  }

  public removePermission(permission: SavedPermission) {
    return this.db$.pipe(
      switchMap((db) => {
        return from(db.remove(permission));
      })
    );
  }

  public getPermissions(): Observable<SavedPermission[]> {
    return this.permissions$;
  }

  public getPermission(id: SavedPermission['_id']) {
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

  public refreshPermissions() {
    this.manualRefresh$.next();
  }
}
