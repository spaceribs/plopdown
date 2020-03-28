import { TestBed } from '@angular/core/testing';

import { XpathService } from './xpath.service';

describe('XpathService', () => {
  let service: XpathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XpathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
