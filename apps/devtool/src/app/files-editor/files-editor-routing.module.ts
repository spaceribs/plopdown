import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesEditorComponent } from './files-editor.component';

const routes: Routes = [{ path: '', component: FilesEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesEditorRoutingModule {}
