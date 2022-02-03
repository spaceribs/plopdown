import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgStackFormsModule } from '@ng-stack/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ShapeFormComponent } from './shape-form.component';
import { EllipseFormComponent } from './shapes/ellipse-form/ellipse-form.component';
import { PathFormComponent } from './shapes/path/path-form.component';
import { PolygonFormComponent } from './shapes/polygon/polygon-form.component';
import { PolylineFormComponent } from './shapes/polyline/polyline-form.component';
import { RectFormComponent } from './shapes/rect/rect-form.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    IconModule,
    FormsModule,
    NgStackFormsModule,
    PickerModule,
  ],
  declarations: [ShapeFormComponent, EllipseFormComponent, PathFormComponent, PolygonFormComponent, PolylineFormComponent, RectFormComponent],
  exports: [ShapeFormComponent],
})
export class ShapeFormModule {}
