import { RuntimeService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockRuntimeService implements Partial<RuntimeService> {
  getOnMessage = jest.fn().mockReturnValue(EMPTY);
  getOnInstalled = jest.fn().mockReturnValue(EMPTY);
}
