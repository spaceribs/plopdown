import { TestBed } from '@angular/core/testing';

import { XPathService } from './xpath.service';

describe('XpathService', () => {
  let service: XPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
