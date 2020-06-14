import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAttachmentsComponent } from './video-attachments.component';

describe('VideoAttachmentsComponent', () => {
  let component: VideoAttachmentsComponent;
  let fixture: ComponentFixture<VideoAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAttachmentsComponent ]
    })
    .compileComponents();
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
