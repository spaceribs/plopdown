import { TestBed } from '@angular/core/testing';

import { BrowserActionPubService } from './browser-action-pub.service';

describe('BrowserActionPubService', () => {
  let service: BrowserActionPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserActionPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
