import { TestBed } from '@angular/core/testing';

import { LzStringService } from './lz-string.service';

describe('LzStringService', () => {
  let service: LzStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LzStringService],
    });
    service = TestBed.inject(LzStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
