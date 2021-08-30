import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackEditorComponent } from './track-editor.component';

const routes: Routes = [{ path: '', component: TrackEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackEditorRoutingModule { }
