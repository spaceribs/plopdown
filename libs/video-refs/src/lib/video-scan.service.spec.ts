import { TestBed } from '@angular/core/testing';

import { VideoScanService } from './video-scan.service';

describe('VideoScanService', () => {
  let service: VideoScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
