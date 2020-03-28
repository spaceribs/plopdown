import { TestBed } from '@angular/core/testing';

import { BackgroundSubService } from './background-sub.service';

describe('BackgroundSubService', () => {
  let service: BackgroundSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
