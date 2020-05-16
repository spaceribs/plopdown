import { TestBed } from '@angular/core/testing';

import { EditSkipService } from './edit-skip.service';

describe('EditSkipService', () => {
  let service: EditSkipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSkipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
