import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgStackFormsModule } from '@ng-stack/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { InspectorComponent } from './inspector.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IconModule,
    FormsModule,
    NgStackFormsModule
  ],
  declarations: [
    InspectorComponent,
  ],
  exports: [InspectorComponent],
})
export class InspectorModule {}
