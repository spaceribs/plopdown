import { MockPanelsService } from './panels.service.mock';
import { DevtoolsRefModule, PanelsService } from '@plopdown/devtools-ref';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [DevtoolsRefModule],
  providers: [{ provide: PanelsService, useClass: MockPanelsService }],
})
export class MockDevtoolsRefModule {}
