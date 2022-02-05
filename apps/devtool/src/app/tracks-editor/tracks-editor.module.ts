import { PouchDBModule } from '@plopdown/pouchdb';
import { TracksModule } from '@plopdown/tracks';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TracksEditorRoutingModule } from './tracks-editor-routing.module';
import { TracksEditorComponent } from './tracks-editor.component';
import { TrackEditorModule } from '@plopdown/track-editor';

const routes: Routes = [{ path: '', component: TracksEditorComponent }];

@NgModule({
  declarations: [TracksEditorComponent],
  imports: [
    CommonModule,
    TracksModule,
    PouchDBModule,
    TrackEditorModule,
    TracksEditorRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class TracksEditorModule {}
