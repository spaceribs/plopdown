import { VideoAttachmentComponent } from './../video-attachment/video-attachment.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAttachmentsComponent } from './video-attachments.component';
import { Component, Input } from '@angular/core';
import { Track } from '@plopdown/tracks';

@Component({
  selector: 'plopdown-video-attachment',
  template: '',
})
class MockVideoAttachmentComponent
  implements Partial<VideoAttachmentComponent> {
  @Input() xpath: string;
  @Input() duration: number;
  @Input() track: Track;
}

describe('VideoAttachmentsComponent', () => {
  let component: VideoAttachmentsComponent;
  let fixture: ComponentFixture<VideoAttachmentsComponent>;

  beforeEach(async(() => {
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
