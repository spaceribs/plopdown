import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackEditorComponent } from './track-editor/track-editor.component';
import { ActionsComponent } from './actions/actions.component';
import { RulerComponent } from './ruler/ruler.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { LayersComponent } from './layers/layers.component';
import { LayerComponent } from './layer/layer.component';
import { ElementComponent } from './element/element.component';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [
    TrackEditorComponent,
    ActionsComponent,
    RulerComponent,
    CurrentTimeComponent,
    LayersComponent,
    LayerComponent,
    ElementComponent,
    CanvasComponent,
  ],
  exports: [TrackEditorComponent],
})
export class TrackEditorModule {}
