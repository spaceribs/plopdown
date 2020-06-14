import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAttachmentComponent } from './video-attachment.component';

describe('VideoAttachmentComponent', () => {
  let component: VideoAttachmentComponent;
  let fixture: ComponentFixture<VideoAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
