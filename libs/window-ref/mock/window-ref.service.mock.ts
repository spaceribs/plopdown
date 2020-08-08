import { Injectable } from '@angular/core';
import { WindowRefService } from '@plopdown/window-ref';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockWindowRefService implements Partial<WindowRefService> {
  getDocument = jest.fn();
  getHashValueFound = jest.fn().mockReturnValue(EMPTY);
}
