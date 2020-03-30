import { TestBed } from '@angular/core/testing';

import { ExtStorageService } from './ext-storage.service';

describe('ExtStorageService', () => {
  let service: ExtStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
