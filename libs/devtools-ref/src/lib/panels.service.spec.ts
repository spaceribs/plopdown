import { TestBed } from '@angular/core/testing';

import { PanelsService } from './panels.service';

describe('PanelsService', () => {
  let service: PanelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
