import {
  PlopdownFileModule,
  PlopdownFileService,
} from '@plopdown/plopdown-file';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: PlopdownFileModule,
})
export class MockPlopdownFileService implements Partial<PlopdownFileService> {
  decode = jest.fn();
  encode = jest.fn();
}
