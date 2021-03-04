import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoRefsRequestedComponent } from './video-refs-requested.component';

describe('TracksRequestedComponent', () => {
  let component: VideoRefsRequestedComponent;
  let fixture: ComponentFixture<VideoRefsRequestedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule, MockVideoRefsModule],
      declarations: [VideoRefsRequestedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRefsRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
