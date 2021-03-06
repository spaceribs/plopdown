import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockTrackEditorComponent } from './../../../mock/track-editor.component.mock';
import { MockFileManagerComponent } from '../../../mock/file-manager.component.mock';
import { MockFileImporterComponent } from './../../../mock/file-importer.component.mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TracksComponent } from './tracks.component';

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          MockIconModule,
          MockTracksModule,
          MockLoggerModule,
          MockWindowRefModule,
          MockVideoRefsModule,
        ],
        declarations: [
          TracksComponent,
          MockFileImporterComponent,
          MockFileManagerComponent,
          MockTrackEditorComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
