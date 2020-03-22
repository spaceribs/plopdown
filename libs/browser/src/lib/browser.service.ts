import { Injectable } from '@angular/core';

@Injectable()
export class BrowserService {
  constructor() {}

  public getBrowser(): typeof browser {
    if (!browser) {
      throw new Error('browser global not found.');
    }
    return browser;
  }
}
