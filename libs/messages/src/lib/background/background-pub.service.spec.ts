import { TestBed } from '@angular/core/testing';

import { BackgroundPubService } from './background-pub.service';

describe('BackgroundPubService', () => {
  let service: BackgroundPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
