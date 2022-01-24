import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgStackFormsModule } from '@ng-stack/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { InspectorComponent } from './inspector.component';
import { BrowserModule } from '@angular/platform-browser';
import { PlopFormComponent } from './cue-forms/plop-form/plop-form.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { InfoFormComponent } from './cue-forms/info-form/info-form.component';
import { AudioFormComponent } from './cue-forms/audio-form/audio-form.component';
import { ShapeFormComponent } from './cue-forms/shape-form/shape-form.component';
import { ShapeFormModule } from './cue-forms/shape-form/shape-form.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IconModule,
    FormsModule,
    NgStackFormsModule,
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
