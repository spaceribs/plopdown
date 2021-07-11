import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { RuntimeService } from '../src/lib/runtime.service';

@Injectable()
export class MockRuntimeService implements Partial<RuntimeService> {
  getOnMessage = jest.fn().mockReturnValue(EMPTY);
  getOnInstalled = jest.fn().mockReturnValue(EMPTY);
}
