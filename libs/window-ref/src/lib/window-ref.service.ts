import { WindowRefModule } from './window-ref.module';
import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, of, throwError } from 'rxjs';
import LZString from 'lz-string';
import { map, filter, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: WindowRefModule,
})
export class WindowRefService {
  private window: Window & typeof globalThis;
  private hashPlopdown$: Observable<string>;

  constructor() {
    this.window = window;

    const hashInitial$ = of(this.getHash());
    const hashChange$ = fromEvent(this.window, 'hashchange').pipe(
      map(() => this.getHash())
    );

    const hash$ = merge(hashInitial$, hashChange$).pipe(
      filter((hash) => hash != null && hash !== ''),
      shareReplay(1)
    );

    this.hashPlopdown$ = hash$.pipe(
      filter((hash) => hash.startsWith('#plopdown:')),
      switchMap((plopdownHash) => {
        const plopdownCompressed = plopdownHash.split(':')[1];

        const plopdown = LZString.decompressFromEncodedURIComponent(
          plopdownCompressed
        );

        if (plopdown == null) {
          return throwError(new Error('Plopdown string could not be decoded'));
        } else {
          return of(plopdown);
        }
      }),
      shareReplay(1)
    );
  }

  public getURL() {
    return this.window.URL;
  }

  public getDocument() {
    return this.window.document;
  }

  public getHash() {
    return this.window.location.hash;
  }

  public getIndexedDB() {
    return this.window.indexedDB;
  }

  public getPlopdownFromHash(): Observable<string> {
    return this.hashPlopdown$;
  }

  public open(
    path: string,
    target?: string,
    features?: string,
    replace?: boolean
  ) {
    return this.window.open(path, target, features, replace);
  }

  reload() {
    this.window.location.reload();
  }

  public close() {
    return this.window.close();
  }
}
