import { NgModule } from '@angular/core';
import {
  BrowserRefModule,
  RuntimeService,
  BrowserRefService,
  TabsService,
  PermissionsRequestService,
  WebNavigationService,
} from '@plopdown/browser-ref';
import { MockRuntimeService } from './runtime.service.mock';
import { MockBrowserRefService } from './browser-ref.service.mock';
import { MockTabsService } from './tabs.service.mock';
import { MockPermissionsRequestService } from './permissions-request.service.mock';
import { MockWebNavigationService } from './web-navigation.service.mock';

@NgModule({
  imports: [BrowserRefModule],
  providers: [
    { provide: RuntimeService, useClass: MockRuntimeService },
    { provide: BrowserRefService, useClass: MockBrowserRefService },
    {
      provide: PermissionsRequestService,
      useClass: MockPermissionsRequestService,
    },
    { provide: TabsService, useClass: MockTabsService },
    { provide: WebNavigationService, useClass: MockWebNavigationService },
  ],
})
export class MockBrowserRefModule {}
