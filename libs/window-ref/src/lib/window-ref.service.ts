import { WindowRefModule } from './window-ref.module';
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public getLocation() {
    return this.window.location;
  }

  public getIndexedDB() {
    return this.window.indexedDB;
  }

  public getCustomEvent<T>(eventName: string) {
    return fromEvent<T>(this.window, eventName).pipe(
      map((event: any) => {
        return JSON.parse(event.detail) as T;
      })
    );
  }

  public dispatchEvent<T>(eventName: string, detail: T) {
    const event = new CustomEvent<T>(eventName, {
      detail: JSON.stringify(detail) as any,
    });
    return this.window.dispatchEvent(event);
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
