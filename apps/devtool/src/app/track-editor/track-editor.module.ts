import { PouchDBModule } from '@plopdown/pouchdb';
import { TracksModule } from '@plopdown/tracks';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TrackEditorRoutingModule } from './track-editor-routing.module';
import { TrackEditorComponent } from './track-editor.component';
import { TimelineEditorComponent } from '../timeline-editor/timeline-editor.component';

const routes: Routes = [{ path: '', component: TrackEditorComponent }];

@NgModule({
  declarations: [TrackEditorComponent, TimelineEditorComponent],
  imports: [
    CommonModule,
    TracksModule,
    PouchDBModule,
    TrackEditorRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class TrackEditorModule {}
