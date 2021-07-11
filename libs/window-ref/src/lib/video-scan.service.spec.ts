import { TestBed } from '@angular/core/testing';

import { VideoScanService } from './video-scan.service';
import { MockWindowRefModule } from '../../mock';

describe('VideoScanService', () => {
  let service: VideoScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockWindowRefModule],
    });
    service = TestBed.inject(VideoScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
