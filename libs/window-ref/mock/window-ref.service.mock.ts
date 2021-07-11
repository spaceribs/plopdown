import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { WindowRefService } from '../src/lib/window-ref.service';

@Injectable()
export class MockWindowRefService implements Partial<WindowRefService> {
  getDocument = jest.fn();
  getLocation = jest.fn().mockReturnValue(EMPTY);
  getHashChange = jest.fn().mockReturnValue(EMPTY);
  getPopStateChange = jest.fn().mockReturnValue(EMPTY);
  getHashValueFound = jest.fn().mockReturnValue(EMPTY);
  getDocumentMutation = jest.fn().mockReturnValue(EMPTY);
  getLoaded = jest.fn().mockReturnValue(EMPTY);
}
