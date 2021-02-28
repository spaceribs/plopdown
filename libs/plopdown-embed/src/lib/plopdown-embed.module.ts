import { WindowRefModule } from '@plopdown/window-ref';
import { IconModule } from '@plopdown/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CueTimelineComponent } from './cue-timeline/cue-timeline.component';
import { InjectorMenuModule } from './embed-menu/embed-menu.module';
import { PlopdownEmbedComponent } from './plopdown-embed.component';
import { PlopdownCuesModule } from '@plopdown/plopdown-cues';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    WindowRefModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    InjectorMenuModule,
    PlopdownCuesModule,
  ],
  declarations: [PlopdownEmbedComponent, CueTimelineComponent],
  providers: [],
  entryComponents: [PlopdownEmbedComponent],
})
export class PlopdownEmbedModule {}
