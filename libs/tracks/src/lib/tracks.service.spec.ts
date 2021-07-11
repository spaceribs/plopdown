import { MockTracksModule } from '../../mock';
import { TestBed } from '@angular/core/testing';

import { TracksService } from './tracks.service';

describe('TracksService', () => {
  let service: TracksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockTracksModule],
    });
    service = TestBed.inject(TracksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
