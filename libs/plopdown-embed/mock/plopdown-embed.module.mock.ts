import { NgModule } from '@angular/core';
import { PlopdownEmbedModule, StageComponent } from '@plopdown/plopdown-embed';

@NgModule({
  imports: [PlopdownEmbedModule],
  entryComponents: [StageComponent],
})
export class MockPlopdownEmbedModule {}
