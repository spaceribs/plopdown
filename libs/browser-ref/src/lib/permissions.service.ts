import { Injectable } from '@angular/core';
import { BrowserRefModule } from './browser-ref.module';
import { BrowserRefService } from './browser-ref.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: BrowserRefModule
})
export class PermissionsService {
  browser: typeof browser;

  constructor(browserService: BrowserRefService) {
    this.browser = browserService.getBrowser();
  }

  contains(perms: browser.permissions.Permissions) {
    return from(this.browser.permissions.contains(perms));
  }

  request(perms: browser.permissions.Permissions) {
    return from(this.browser.permissions.request(perms));
  }
}
