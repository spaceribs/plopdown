import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { TestBed } from '@angular/core/testing';

import { TrackService } from './track.service';

describe('TrackService', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule, MockWindowRefModule],
      providers: [TrackService],
    });
    service = TestBed.inject(TrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
