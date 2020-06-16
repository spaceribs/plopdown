import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { TestBed } from '@angular/core/testing';

import { VideoScanService } from './video-scan.service';

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
