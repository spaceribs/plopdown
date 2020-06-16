import { Injectable } from '@angular/core';
import { WindowRefService } from '@plopdown/window-ref';

@Injectable()
export class MockWindowRefService implements Partial<WindowRefService> {
  getDocument = jest.fn();
}
