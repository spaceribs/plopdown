import { TestBed } from '@angular/core/testing';

import { BrowserRefService } from './browser-ref.service';

describe('BrowserService', () => {
  let service: BrowserRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
