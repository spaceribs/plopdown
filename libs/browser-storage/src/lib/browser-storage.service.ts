import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Injectable, ErrorHandler } from '@angular/core';

export enum StorageAreaName {
  Local = 'local',
  Sync = 'sync',
  Managed = 'managed'
}

@Injectable()
export class BrowserStorageService {
  private readonly changed$: Observable<
    [browser.storage.StorageChange, StorageAreaName]
  >;

  constructor(errorHandler: ErrorHandler) {
    if (browser == null) {
      errorHandler.handleError(new Error('Browser global could not be found.'));
      return;
    }

    this.changed$ = new Observable<
      [browser.storage.StorageChange, StorageAreaName]
    >(observer => {
      function listener(
        change: browser.storage.StorageChange,
        area: StorageAreaName
      ) {
        observer.next([change, area]);
      }

      browser.storage.onChanged.addListener(listener);

      return () => {
        browser.storage.onChanged.removeListener(listener);
      };
    }).pipe(share());
  }

  public onChanged(): Observable<
    [browser.storage.StorageChange, StorageAreaName]
  > {
    return this.changed$;
  }

  public get(area: StorageAreaName, keys: string | string[]) {
    return browser.storage[area].get(keys);
  }

  public set(area: StorageAreaName, keys: object) {
    browser.storage[area].set(keys);
  }

  public clear(area: StorageAreaName) {
    browser.storage[area].clear();
  }

  public remove(area: StorageAreaName, keys: string | string[]) {
    return browser.storage[area].remove(keys);
  }
}
