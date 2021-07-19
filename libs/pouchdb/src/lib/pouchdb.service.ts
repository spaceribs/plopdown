import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PouchDBModule } from './pouchdb.module';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import PouchDBAuth from 'pouchdb-authentication';

@Injectable({
  providedIn: PouchDBModule,
})
export class PouchDBService {
  constructor() {
    PouchDB.plugin(PouchDBFind);
    PouchDB.plugin(PouchDBAuth);
  }

  public createObservableDatabase<Model>(
    storageKey: string,
    username?: string | null,
    password?: string | null
  ) {
    return new Observable<PouchDB.Database<Model>>((observer) => {
      const authed = username?.length && password?.length;
      const db = new PouchDB<Model>(storageKey);

      if (authed) {
        db.logIn(username as string, password as string)
          .then(() => {
            observer.next(db);
          })
          .catch((err) => {
            observer.error(err);
          });
      } else {
        observer.next(db);
      }

      return () => {
        db.close();
      };
    });
  }

  public createObservableChanges<Model>(
    db: PouchDB.Database<Model>
  ): Observable<PouchDB.Core.ChangesResponseChange<Model>> {
    return new Observable<PouchDB.Core.ChangesResponseChange<Model>>(
      (observer) => {
        const changes = db.changes({
          live: true,
          since: 'now',
          include_docs: false,
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

  public createObservableSync<T>(
    local: PouchDB.Database<T>,
    remote: PouchDB.Database<T>
  ) {
    return new Observable<
      | PouchDB.Replication.SyncResult<T>
      | PouchDB.Replication.SyncResultComplete<T>
    >((observer) => {
      const init = local
        .sync(remote)
        .on('complete', function (complete) {
          observer.next(complete);
        })
        .on('error', function (err) {
          observer.error(err);
        });

      const sync = local
        .sync(remote, {
          live: true,
          retry: true,
        })
        .on('change', function (change) {
          observer.next(change);
        })
        .on('error', function (err) {
          observer.error(err);
        });

      return () => {
        init.cancel();
        sync.cancel();
      };
    });
  }

  public createObservablePull<T>(
    local: PouchDB.Database<T>,
    remote: PouchDB.Database<T>
  ) {
    return new Observable<PouchDB.Replication.ReplicationResult<T>>(
      (observer) => {
        const init = local.replicate
          .from(remote)
          .on('complete', function (complete) {
            observer.next(complete);
          })
          .on('error', function (err) {
            observer.error(err);
          });

        const sync = local.replicate
          .from(remote, {
            live: true,
            retry: true,
          })
          .on('change', function (change) {
            observer.next(change);
          })
          .on('error', function (err) {
            observer.error(err);
          });

        return () => {
          init.cancel();
          sync.cancel();
        };
      }
    );
  }
}
