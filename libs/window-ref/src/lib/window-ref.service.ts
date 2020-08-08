import { WindowRefModule } from './window-ref.module';
import {
  Injectable,
} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import LZString from 'lz-string'

@Injectable({
  providedIn: WindowRefModule,
})
export class WindowRefService {
  private window: Window & typeof globalThis;
  private hashValueFound$: Observable<string>;

  constructor() {
    this.window = window;
    this.hashValueFound$ = fromEvent(this.window, 'hashchange').pipe(
      map(() => this.getHash()),
    ).pipe(
      startWith(this.getHash()),
      filter((hash: string) => hash.startsWith('#plopdown:')),
      map((hash: string) => hash.split(":")[1]),
      map((hash: string) => this.decompressFromHash(hash)),
      filter(video => video != null)
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

  public getHashValueFound(): Observable<string> {
    return this.hashValueFound$;
  }

  //NOTE: could be moved into a library, does not depend on its parent object.
  private decompressFromHash(compressedValue: string): string {
    const decompressedValue: string = LZString.decompressFromEncodedURIComponent(compressedValue);
    if (decompressedValue === null) {
      throw new Error('Plopdown string could not be decoded'); 
    }
    return decompressedValue;
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
