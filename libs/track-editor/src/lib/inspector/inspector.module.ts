import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { InspectorComponent } from './inspector.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    IconModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
  ],
  declarations: [InspectorComponent],
  exports: [InspectorComponent],
})
export class InspectorModule {}
