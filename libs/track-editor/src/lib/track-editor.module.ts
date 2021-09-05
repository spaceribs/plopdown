import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackEditorComponent } from './track-editor/track-editor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TrackEditorComponent],
  exports: [TrackEditorComponent],
})
export class TrackEditorModule {}
