import { TestBed, waitForAsync } from '@angular/core/testing';
import { VideoRefsModule } from './video-refs.module';

describe('VideoRefsModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VideoRefsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(VideoRefsModule).toBeDefined();
  });
});
