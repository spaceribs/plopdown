import { NgModule } from '@angular/core';
import { MockWindowRefService } from './window-ref.service.mock';
import {
  WindowRefModule,
  WindowRefService,
  XPathService,
} from '@plopdown/window-ref';
import { MockXPathService } from './xpath.service.mock';

@NgModule({
  imports: [WindowRefModule],
  providers: [
    { provide: WindowRefService, useClass: MockWindowRefService },
    { provide: XPathService, useClass: MockXPathService },
  ],
})
export class MockWindowRefModule {}
