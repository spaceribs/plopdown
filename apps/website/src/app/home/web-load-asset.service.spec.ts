import { TestBed } from '@angular/core/testing';

import { WebLoadAssetService } from './web-load-asset.service';

describe('FakeRuntimeService', () => {
  let service: WebLoadAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebLoadAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
