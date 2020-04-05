import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOverlayComponent } from './video-overlay.component';

describe('VideoOverlayComponent', () => {
  let component: VideoOverlayComponent;
  let fixture: ComponentFixture<VideoOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
