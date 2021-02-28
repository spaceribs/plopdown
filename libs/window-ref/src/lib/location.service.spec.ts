import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { WindowRefService } from './window-ref.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService, LocationService],
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
