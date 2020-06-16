import { NgModule } from '@angular/core';
import {
  BrowserRefModule,
  RuntimeService,
  BrowserRefService,
  TabsService,
} from '@plopdown/browser-ref';
import { MockRuntimeService } from './runtime.service.mock';
import { MockBrowserRefService } from './browser-ref.service.mock';
import { MockTabsService } from './tabs.service.mock';

@NgModule({
  imports: [BrowserRefModule],
  providers: [
    { provide: RuntimeService, useClass: MockRuntimeService },
    { provide: BrowserRefService, useClass: MockBrowserRefService },
    { provide: TabsService, useClass: MockTabsService },
  ],
})
export class MockBrowserRefModule {}
