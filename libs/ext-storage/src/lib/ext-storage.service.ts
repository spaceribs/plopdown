import { ExtStorageModule } from './ext-storage.module';
import { Observable, from } from 'rxjs';
import { share } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';
import { ExtStorageAreaName } from './ext-storage.model';
import { BrowserRefService } from '@plopdown/browser-ref';

@Injectable({
  providedIn: ExtStorageModule
})
export class ExtStorageService {
  private readonly changed$: Observable<
    [browser.storage.StorageChange, ExtStorageAreaName]
  >;
  private storage: typeof browser.storage;

  constructor(browserRefService: BrowserRefService, ngZone: NgZone) {
    this.storage = browserRefService.getBrowser().storage;

    this.changed$ = new Observable<
      [browser.storage.StorageChange, ExtStorageAreaName]
    >(observer => {
      function listener(
        change: browser.storage.StorageChange,
        area: ExtStorageAreaName
      ) {
        ngZone.run(() => {
          observer.next([change, area]);
        });
      }

      this.storage.onChanged.addListener(listener);

      return () => {
        if (this.storage.onChanged.hasListener(listener)) {
          this.storage.onChanged.removeListener(listener);
        }
      };
    }).pipe(share());
  }

  public getOnChanged(): Observable<
    [browser.storage.StorageChange, ExtStorageAreaName]
  > {
    return this.changed$;
  }

  public get(
    area: ExtStorageAreaName,
    keys: string | string[]
  ): Observable<object> {
    return from(this.storage[area].get(keys));
  }

  public set(area: ExtStorageAreaName, keys: object): Observable<void> {
    return from(this.storage[area].set(keys));
  }

  public clear(area: ExtStorageAreaName): Observable<void> {
    return from(this.storage[area].clear());
  }

  public remove(
    area: ExtStorageAreaName,
    keys: string | string[]
  ): Observable<void> {
    return from(this.storage[area].remove(keys));
  }
}
