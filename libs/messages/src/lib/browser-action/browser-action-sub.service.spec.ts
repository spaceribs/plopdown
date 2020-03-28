import { TestBed } from '@angular/core/testing';

import { BrowserActionSubService } from './browser-action-sub.service';

describe('BrowserActionSubService', () => {
  let service: BrowserActionSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserActionSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
