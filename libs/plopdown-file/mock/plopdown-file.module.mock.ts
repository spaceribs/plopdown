import {
  PlopdownFileModule,
  PlopdownFileService,
} from '@plopdown/plopdown-file';
import { NgModule } from '@angular/core';
import { MockPlopdownFileService } from './plopdown-file.service.mock';

@NgModule({
  imports: [PlopdownFileModule],
  providers: [
    { provide: PlopdownFileService, useClass: MockPlopdownFileService },
  ],
})
export class MockPlopdownFileModule {}
