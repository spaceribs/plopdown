import { Injectable } from '@angular/core';
import { BrowserRefService } from '../src/lib/browser-ref.service';

@Injectable()
export class MockBrowserRefService implements Partial<BrowserRefService> {
  getBrowser = jest.fn().mockReturnValue({
    storage: {},
  });
}
