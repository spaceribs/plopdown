import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackEditorComponent } from './track-editor/track-editor.component';
import { ActionsComponent } from './actions/actions.component';
import { RulerComponent } from './ruler/ruler.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { LayersComponent } from './layers/layers.component';
import { LayerComponent } from './layer/layer.component';
import { LayerCueComponent } from './layer-cue/layer-cue.component';
import { CanvasComponent } from './canvas/canvas.component';
import { InspectorModule } from './inspector/inspector.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    InspectorModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({}),
  ],
  declarations: [
    TrackEditorComponent,
    ActionsComponent,
    RulerComponent,
    CurrentTimeComponent,
    LayersComponent,
    LayerComponent,
    LayerCueComponent,
    CanvasComponent,
  ],
  exports: [TrackEditorComponent],
})
export class TrackEditorModule {}
