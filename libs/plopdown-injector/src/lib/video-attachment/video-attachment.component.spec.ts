import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAttachmentComponent } from './video-attachment.component';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('VideoAttachmentComponent', () => {
  let component: VideoAttachmentComponent;
  let fixture: ComponentFixture<VideoAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule, MockWindowRefModule],
      declarations: [VideoAttachmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
