import { Injectable } from '@angular/core';
import { BrowserRefModule } from './browser-ref.module';

@Injectable({
  providedIn: BrowserRefModule
})
export class BrowserRefService {
  constructor() {}

  public getBrowser(): typeof browser {
    if (!browser) {
      throw new Error('browser global not found.');
    }
    return browser;
  }
}
