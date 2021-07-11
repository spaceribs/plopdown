import { Injectable } from '@angular/core';
import { PlopdownFileModule } from '../src/lib/plopdown-file.module';
import { PlopdownFileService } from '../src/lib/plopdown-file.service';

@Injectable({
  providedIn: PlopdownFileModule,
})
export class MockPlopdownFileService implements Partial<PlopdownFileService> {
  decode = jest.fn();
  encode = jest.fn();
}
