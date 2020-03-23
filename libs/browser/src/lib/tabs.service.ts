import { BrowserService } from './browser.service';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TabsService {
  browser: typeof browser;

  constructor(browserService: BrowserService) {
    this.browser = browserService.getBrowser();
  }

  public executeScript(
    details: browser.extensionTypes.InjectDetails
  ): Observable<any[]> {
    return from(browser.tabs.executeScript(details));
  }
}
