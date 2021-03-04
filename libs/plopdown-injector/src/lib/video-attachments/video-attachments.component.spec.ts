import { VideoAttachmentComponent } from './../video-attachment/video-attachment.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoAttachmentsComponent } from './video-attachments.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'plopdown-video-attachment',
  template: '',
})
class MockVideoAttachmentComponent
  implements Partial<VideoAttachmentComponent> {
  @Input() videoElem: HTMLVideoElement;
}

describe('VideoAttachmentsComponent', () => {
  let component: VideoAttachmentsComponent;
  let fixture: ComponentFixture<VideoAttachmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VideoAttachmentsComponent, MockVideoAttachmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
