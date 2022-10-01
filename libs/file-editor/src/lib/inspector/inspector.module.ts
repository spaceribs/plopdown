import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { InspectorComponent } from './inspector.component';
import { PlopFormComponent } from './cue-forms/plop-form/plop-form.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { InfoFormComponent } from './cue-forms/info-form/info-form.component';
import { AudioFormComponent } from './cue-forms/audio-form/audio-form.component';
import { ShapeFormModule } from './cue-forms/shape-form/shape-form.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
    ShapeFormModule,
  ],
  declarations: [
    InspectorComponent,
    PlopFormComponent,
    InfoFormComponent,
    AudioFormComponent,
  ],
  exports: [InspectorComponent],
})
export class InspectorModule {}
