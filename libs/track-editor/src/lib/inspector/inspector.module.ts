import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgStackFormsModule } from '@ng-stack/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { InspectorComponent } from './inspector.component';
import { BrowserModule } from '@angular/platform-browser';
import { PlopFormComponent } from './cue-forms/plop-form/plop-form.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IconModule,
    FormsModule,
    NgStackFormsModule,
    PickerModule,
  ],
  declarations: [InspectorComponent, PlopFormComponent],
  exports: [InspectorComponent],
})
export class InspectorModule {}
