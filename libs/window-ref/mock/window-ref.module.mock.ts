import { NgModule } from '@angular/core';
import { WindowRefModule } from '../src/lib/window-ref.module';
import { WindowRefService } from '../src/lib/window-ref.service';
import { XPathService } from '../src/lib/xpath.service';
import { MockWindowRefService } from './window-ref.service.mock';
import { MockXPathService } from './xpath.service.mock';

@NgModule({
  imports: [WindowRefModule],
  providers: [
    { provide: WindowRefService, useClass: MockWindowRefService },
    { provide: XPathService, useClass: MockXPathService },
  ],
})
export class MockWindowRefModule {}
