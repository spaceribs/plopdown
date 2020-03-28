import { BrowserRefService } from './browser-ref.service';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { BrowserRefModule } from './browser-ref.module';

@Injectable({
  providedIn: BrowserRefModule
})
export class TabsService {
  browser: typeof browser;

  constructor(browserRefService: BrowserRefService) {
    this.browser = browserRefService.getBrowser();
  }

  public executeScript(
    details: browser.extensionTypes.InjectDetails
  ): Observable<any[]> {
    return from(this.browser.tabs.executeScript(details));
  }
}
