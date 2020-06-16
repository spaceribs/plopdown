import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoManagerComponent } from './video-manager.component';
import { MockIconModule } from '@plopdown/icon/mock';

describe('VideoManagerComponent', () => {
  let component: VideoManagerComponent;
  let fixture: ComponentFixture<VideoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockIconModule,
        MockBrowserRefModule,
        MockWindowRefModule,
        MockLoggerModule,
        MockVideoRefsModule,
      ],
      declarations: [VideoManagerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
