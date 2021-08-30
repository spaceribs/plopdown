import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TrackEditorRoutingModule } from './track-editor-routing.module';
import { TrackEditorComponent } from './track-editor.component';

const routes: Routes = [
  { path: '', component: TrackEditorComponent }
];

@NgModule({
  declarations: [
    TrackEditorComponent
  ],
  imports: [
    CommonModule,
    TrackEditorRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class TrackEditorModule { }
