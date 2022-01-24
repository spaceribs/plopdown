import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgStackFormsModule } from '@ng-stack/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ShapeFormComponent } from './shape-form.component';
import { EllipseFormComponent } from './shapes/ellipse-form/ellipse-form.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IconModule,
    FormsModule,
    NgStackFormsModule,
    PickerModule,
  ],
  declarations: [ShapeFormComponent, EllipseFormComponent],
  exports: [ShapeFormComponent],
})
export class ShapeFormModule {}
