import { async, TestBed } from '@angular/core/testing';
import { VideoRefsModule } from './video-refs.module';

describe('VideoRefsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VideoRefsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(VideoRefsModule).toBeDefined();
  });
});
