import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRefsRequestedComponent } from './video-refs-requested.component';

describe('TracksRequestedComponent', () => {
  let component: VideoRefsRequestedComponent;
  let fixture: ComponentFixture<VideoRefsRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
