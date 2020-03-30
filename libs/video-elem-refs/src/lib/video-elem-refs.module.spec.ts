import { async, TestBed } from '@angular/core/testing';
import { VideoElemRefsModule } from './video-elem-refs.module';

describe('VideoElemRefsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VideoElemRefsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(VideoElemRefsModule).toBeDefined();
  });
});
