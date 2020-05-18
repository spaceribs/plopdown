import { TestBed } from '@angular/core/testing';

import { LogStorageService } from './log-storage.service';

describe('LogStorageService', () => {
  let service: LogStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
