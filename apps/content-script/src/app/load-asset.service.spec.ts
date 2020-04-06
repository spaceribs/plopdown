import { TestBed } from '@angular/core/testing';

import { LoadAssetService } from './load-asset.service';

describe('LoadAssetService', () => {
  let service: LoadAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
