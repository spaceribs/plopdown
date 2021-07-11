import { MockPanelsService } from './panels.service.mock';
import { NgModule } from '@angular/core';
import { DevtoolsRefModule } from '../src/lib/devtools-ref.module';
import { PanelsService } from '../src/lib/panels.service';

@NgModule({
  imports: [DevtoolsRefModule],
  providers: [{ provide: PanelsService, useClass: MockPanelsService }],
})
export class MockDevtoolsRefModule {}
