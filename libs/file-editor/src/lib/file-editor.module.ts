import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileEditorComponent } from './file-editor/file-editor.component';
import { ActionsComponent } from './actions/actions.component';
import { RulerComponent } from './ruler/ruler.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { LayersComponent } from './layers/layers.component';
import { LayerComponent } from './layer/layer.component';
import { LayerCueComponent } from './layer-cue/layer-cue.component';
import { CanvasComponent } from './canvas/canvas.component';
import { InspectorModule } from './inspector/inspector.module';
import { TimecodeEditorComponent } from './actions/timecode-editor/timecode-editor.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    InspectorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FileEditorComponent,
    ActionsComponent,
    TimecodeEditorComponent,
    RulerComponent,
    CurrentTimeComponent,
    LayersComponent,
    LayerComponent,
    LayerCueComponent,
    CanvasComponent,
  ],
  exports: [FileEditorComponent],
})
export class FileEditorModule {}
