import { NgModule } from '@angular/core';
import { PlopdownFileModule } from '../src/lib/plopdown-file.module';
import { PlopdownFileService } from '../src/lib/plopdown-file.service';
import { MockPlopdownFileService } from './plopdown-file.service.mock';

@NgModule({
  imports: [PlopdownFileModule],
  providers: [
    { provide: PlopdownFileService, useClass: MockPlopdownFileService },
  ],
})
export class MockPlopdownFileModule {}
