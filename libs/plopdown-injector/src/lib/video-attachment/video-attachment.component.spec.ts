import { MockPlopdownEmbedModule } from '@plopdown/plopdown-embed/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { LzStringModule } from '@plopdown/lz-string';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideoAttachmentComponent } from './video-attachment.component';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { HashVideoRefsService } from '../hash-video-refs.service';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';

describe('VideoAttachmentComponent', () => {
  let component: VideoAttachmentComponent;
  let fixture: ComponentFixture<VideoAttachmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MockLoggerModule,
        MockWindowRefModule,
        MockPlopdownFileModule,
        MockVideoRefsModule,
        MockTracksModule,
        MockPlopdownEmbedModule,
        LzStringModule,
      ],
      declarations: [VideoAttachmentComponent],
      providers: [HashVideoRefsService],
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
