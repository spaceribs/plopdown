import { BrowserService } from './browser.service';
import { Observable, from } from 'rxjs';
import { share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StorageAreaName } from './storage.model';

@Injectable()
export class StorageService {
  private readonly changed$: Observable<
    [browser.storage.StorageChange, StorageAreaName]
  >;
  browser: typeof browser;

  constructor(browserService: BrowserService) {
    this.browser = browserService.getBrowser();

    this.changed$ = new Observable<
      [browser.storage.StorageChange, StorageAreaName]
    >(observer => {
      function listener(
        change: browser.storage.StorageChange,
        area: StorageAreaName
      ) {
        observer.next([change, area]);
      }

      this.browser.storage.onChanged.addListener(listener);

      return () => {
        this.browser.storage.onChanged.removeListener(listener);
      };
    }).pipe(share());
  }

  public getOnChanged(): Observable<
    [browser.storage.StorageChange, StorageAreaName]
  > {
    return this.changed$;
  }

  public get(
    area: StorageAreaName,
    keys: string | string[]
  ): Observable<object> {
    return from(this.browser.storage[area].get(keys));
  }

  public set(area: StorageAreaName, keys: object): Observable<void> {
    return from(this.browser.storage[area].set(keys));
  }

  public clear(area: StorageAreaName): Observable<void> {
    return from(this.browser.storage[area].clear());
  }

  public remove(
    area: StorageAreaName,
    keys: string | string[]
  ): Observable<void> {
    return from(this.browser.storage[area].remove(keys));
  }
}
