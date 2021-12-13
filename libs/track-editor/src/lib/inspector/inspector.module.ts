import { CommonModule } from '@angular/common';
import { FieldInputComponent } from './inputs/field-input/field-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { InspectorComponent } from './inspector.component';
import { BrowserModule } from '@angular/platform-browser';
import { ObjectInputComponent } from './inputs/object-input/object-input.component';
import { ArrayInputComponent } from './inputs/array-input/array-input.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        { name: 'input', component: FieldInputComponent },
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'object', component: ObjectInputComponent },
        { name: 'array', component: ArrayInputComponent },
      ],
    }),
  ],
  declarations: [
    InspectorComponent,
    ObjectInputComponent,
    FieldInputComponent,
    ArrayInputComponent,
  ],
  exports: [InspectorComponent],
})
export class InspectorModule {}
