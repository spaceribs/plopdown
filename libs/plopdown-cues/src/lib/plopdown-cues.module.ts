import { IconModule } from '@plopdown/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './cues/info/info.component';
import { PlopComponent } from './cues/plop/plop.component';
import { CueRendererComponent } from './cue-renderer/cue-renderer.component';
import { CueEditorComponent } from './cue-editor/cue-editor.component';
import { HtmlContentComponent } from './html-content/html-content.component';
import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry
} from 'ngx-schema-form';
import { AudioComponent } from './cues/audio/audio.component';

@NgModule({
  imports: [CommonModule, FormsModule, SchemaFormModule.forRoot(), IconModule],
  declarations: [
    InfoComponent,
    PlopComponent,
    CueRendererComponent,
    CueEditorComponent,
    HtmlContentComponent,
    AudioComponent
  ],
  exports: [CueRendererComponent],
  providers: [{ provide: WidgetRegistry, useClass: DefaultWidgetRegistry }]
})
export class PlopdownCuesModule {}
