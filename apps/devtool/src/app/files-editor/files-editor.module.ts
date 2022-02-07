import { PouchDBModule } from '@plopdown/pouchdb';
import { TracksModule } from '@plopdown/tracks';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FilesEditorRoutingModule } from './files-editor-routing.module';
import { FilesEditorComponent } from './files-editor.component';
import { FileEditorModule } from '@plopdown/file-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: FilesEditorComponent }];

@NgModule({
  declarations: [FilesEditorComponent],
  imports: [
    CommonModule,
    TracksModule,
    FormsModule,
    ReactiveFormsModule,
    PouchDBModule,
    FileEditorModule,
    FilesEditorRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class FilesEditorModule {}
