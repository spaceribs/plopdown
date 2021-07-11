import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { VideoRefsService } from '../src/lib/video-refs.service';

@Injectable()
export class MockVideoRefsService implements Partial<VideoRefsService> {
  getLoading = jest.fn().mockReturnValue(EMPTY);
  getVideoRefs = jest.fn().mockReturnValue(EMPTY);
}
