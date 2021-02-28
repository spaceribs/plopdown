import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { TestBed } from '@angular/core/testing';

import { BrowserActionService } from './browser-action.service';

describe('BrowserActionRefService', () => {
  let service: BrowserActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockBrowserRefModule],
      providers: [BrowserActionService],
    });
    service = TestBed.inject(BrowserActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
