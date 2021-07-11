import { NgModule } from '@angular/core';
import { MockRuntimeService } from './runtime.service.mock';
import { MockBrowserRefService } from './browser-ref.service.mock';
import { MockTabsService } from './tabs.service.mock';
import { MockPermissionsRequestService } from './permissions-request.service.mock';
import { MockWebNavigationService } from './web-navigation.service.mock';
import { BrowserRefModule } from '../src/lib/browser-ref.module';
import { RuntimeService } from '../src/lib/runtime.service';
import { BrowserRefService } from '../src/lib/browser-ref.service';
import { PermissionsRequestService } from '../src/lib/permissions-req.service';
import { TabsService } from '../src/lib/tabs.service';
import { WebNavigationService } from '../src/lib/web-navigation.service';

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
