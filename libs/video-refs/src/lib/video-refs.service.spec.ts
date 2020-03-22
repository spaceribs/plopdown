import { TestBed } from '@angular/core/testing';

import { VideoRefsService } from './video-refs.service';

describe('VideoRefsService', () => {
  let service: VideoRefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoRefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
