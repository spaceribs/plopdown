import { WindowRefModule } from './window-ref.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: WindowRefModule
})
export class WindowRefService {
  window: Window & typeof globalThis;

  constructor() {
    this.window = window;
  }

  public getDocument() {
    return this.window.document;
  }

  public open(
    path: string,
    target?: string,
    features?: string,
    replace?: boolean
  ) {
    return this.window.open(path, target, features, replace);
  }
}
