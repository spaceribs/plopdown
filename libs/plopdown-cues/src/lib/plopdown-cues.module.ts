import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './cues/info/info.component';
import { PlopComponent } from './cues/plop/plop.component';
import { CueRendererComponent } from './cue-renderer/cue-renderer.component';
import { HtmlContentComponent } from './html-content/html-content.component';
import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry
} from 'ngx-schema-form';

@NgModule({
  imports: [CommonModule, SchemaFormModule.forRoot()],
  declarations: [
    InfoComponent,
    PlopComponent,
    CueRendererComponent,
    HtmlContentComponent
  ],
  exports: [CueRendererComponent],
  providers: [{ provide: WidgetRegistry, useClass: DefaultWidgetRegistry }]
})
export class PlopdownCuesModule {}
