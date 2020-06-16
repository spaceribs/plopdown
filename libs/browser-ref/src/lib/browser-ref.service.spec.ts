import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { TestBed } from '@angular/core/testing';

import { BrowserRefService } from './browser-ref.service';

describe('BrowserRefService', () => {
  let service: BrowserRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockBrowserRefModule],
    });
    service = TestBed.inject(BrowserRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
