import { WindowRefModule } from './window-ref.module';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import LZString from 'lz-string'

@Injectable({
  providedIn: WindowRefModule,
})
export class WindowRefService {
  private window: Window & typeof globalThis;

  constructor() {
    this.window = window;
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
    const plopdowns = new Observable<string>(subscriber => {
      this.emitPlopdownFromHash(subscriber);
      this.window.addEventListener('hashchange', function() {
        this.emitPlopdownFromHash(subscriber);
      }.bind(this), false);
    });
    return plopdowns;
  }

  private emitPlopdownFromHash(subscriber) {
    const plopdown: string = this.parsePlopdownFromHash(this.getHash());
    if (plopdown !== "") {
      subscriber.next(plopdown);
    }
  }

  private parsePlopdownFromHash(hash: string): string {
    if (!hash.startsWith("#plopdown:")) {
      return "";
    }
    const linkedVideo: string = LZString.decompressFromEncodedURIComponent(hash.split(":")[1]);
    return linkedVideo;
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
