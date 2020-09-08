import { TestBed } from '@angular/core/testing';

import { WebNavigationService } from './web-navigation.service';

describe('WebNavigationService', () => {
  let service: WebNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
