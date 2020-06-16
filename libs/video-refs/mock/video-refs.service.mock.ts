import { Injectable } from '@angular/core';
import { VideoRefsService } from '@plopdown/video-refs';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockVideoRefsService implements Partial<VideoRefsService> {
  getLoading = jest.fn().mockReturnValue(EMPTY);
  getVideoRefs = jest.fn().mockReturnValue(EMPTY);
}
