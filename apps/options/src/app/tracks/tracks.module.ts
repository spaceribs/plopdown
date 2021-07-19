import { IconModule } from '@plopdown/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FileImporterComponent } from './file-importer/file-importer.component';
import { FileManagerComponent } from './file-manager/file-manager/file-manager.component';
import { TrackEditorComponent } from './track-editor/track-editor.component';
import { TracksComponent } from './tracks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TracksComponent,
    TrackEditorComponent,
    FileManagerComponent,
    FileImporterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: TracksComponent,
      },
    ]),
  ],
})
export class TracksViewModule {}
