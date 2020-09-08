import { CueRendererComponent } from './cue-renderer/cue-renderer.component';
import { ShapeComponent } from './cues/shape/shape.component';
import { PlopComponent } from './cues/plop/plop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioComponent } from './cues/audio/audio.component';
import { InfoComponent } from './cues/info/info.component';
import { IconModule } from '@plopdown/icon';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [
    AudioComponent,
    InfoComponent,
    PlopComponent,
    ShapeComponent,
    CueRendererComponent,
  ],
  exports: [CueRendererComponent],
})
export class PlopdownCuesModule {}
