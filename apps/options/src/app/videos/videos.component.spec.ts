import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockVideoEditorComponent } from './../../../mock/video-editor.component.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { MockTrackSelectorComponent } from './../../../mock/track-selector.component.mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosComponent } from './videos.component';

describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockIconModule,
        RouterTestingModule,
        MockVideoRefsModule,
        MockLoggerModule,
        MockWindowRefModule,
      ],
      declarations: [
        VideosComponent,
        MockTrackSelectorComponent,
        MockVideoEditorComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
