import { BrowserRefService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';

@Injectable()
export class MockBrowserRefService implements Partial<BrowserRefService> {
  getBrowser = jest.fn().mockReturnValue({
    storage: {},
  });
}
