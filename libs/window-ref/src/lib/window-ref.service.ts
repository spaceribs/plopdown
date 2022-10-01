import { shareReplay, debounceTime } from 'rxjs/operators';
import { WindowRefModule } from './window-ref.module';
import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: WindowRefModule,
})
export class WindowRefService {
  private window: Window & typeof globalThis;
  private documentModification$: Observable<MutationRecord[]>;
  private loaded$: Observable<Event>;

  constructor() {
    this.window = window;
    this.documentModification$ = new Observable<MutationRecord[]>((observe) => {
      function callback(mutationsList: MutationRecord[]) {
        observe.next(mutationsList);
      }

      const observer = new MutationObserver(callback);
      observer.observe(this.window.document, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
      };
    }).pipe(debounceTime(500), shareReplay(1));

    this.loaded$ = fromEvent(window, 'load').pipe(shareReplay(1));
  }

  public getURL() {
    return this.window.URL;
  }

  public getDocument() {
    return this.window.document;
  }

  public getLoaded() {
    return this.loaded$;
  }

  public getDocumentMutation() {
    return this.documentModification$;
  }

  public getLocation() {
    return this.window.location;
  }

  public getIndexedDB() {
    return this.window.indexedDB;
  }

  public getHashChange() {
    return fromEvent(this.window, 'hashchange');
  }

  public getPopStateChange() {
    return fromEvent(this.window, 'popstate');
  }

  public open(
    path: string,
    target?: string,
    features?: string
  ) {
    return this.window.open(path, target, features);
  }

  reload() {
    this.window.location.reload();
  }

  public close() {
    return this.window.close();
  }
}
