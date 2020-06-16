import { IconModule } from '@plopdown/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './cues/info/info.component';
import { PlopComponent } from './cues/plop/plop.component';
import { CueRendererComponent } from './cue-renderer/cue-renderer.component';
import { AudioComponent } from './cues/audio/audio.component';
import { ShapeComponent } from './cues/shape/shape.component';
import { StageComponent } from './stage/stage.component';
import { OverlayMenuComponent } from './widgets/overlay-menu/overlay-menu.component';
import { CueTimelineComponent } from './widgets/cue-timeline/cue-timeline.component';

@NgModule({
  imports: [CommonModule, FormsModule, IconModule],
  declarations: [
    StageComponent,
    OverlayMenuComponent,
    CueTimelineComponent,
    CueRendererComponent,
    InfoComponent,
    PlopComponent,
    ShapeComponent,
    AudioComponent,
  ],
  exports: [
    CueRendererComponent,
    InfoComponent,
    PlopComponent,
    ShapeComponent,
    AudioComponent,
  ],
  providers: [],
})
export class PlopdownEmbedModule {}
