import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksEditorComponent } from './tracks-editor.component';

const routes: Routes = [{ path: '', component: TracksEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksEditorRoutingModule {}
