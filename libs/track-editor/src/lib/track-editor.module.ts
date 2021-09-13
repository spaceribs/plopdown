import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackEditorComponent } from './track-editor/track-editor.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [TrackEditorComponent, ActionsComponent],
  exports: [TrackEditorComponent],
})
export class TrackEditorModule {}
