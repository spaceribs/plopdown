import { TestBed } from '@angular/core/testing';

import { PlopdownFileService } from './plopdown-file.service';

describe('PlopdownFileService', () => {
  let service: PlopdownFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlopdownFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
