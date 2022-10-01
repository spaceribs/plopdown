import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@plopdown/icon';
import { NgModule } from '@angular/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ShapeFormComponent } from './shape-form.component';
import { EllipseFormComponent } from './shapes/ellipse-form/ellipse-form.component';
import { PathFormComponent } from './shapes/path/path-form.component';
import { PolygonFormComponent } from './shapes/polygon/polygon-form.component';
import { PolylineFormComponent } from './shapes/polyline/polyline-form.component';
import { RectFormComponent } from './shapes/rect/rect-form.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
  ],
  declarations: [
    ShapeFormComponent,
    EllipseFormComponent,
    PathFormComponent,
    PolygonFormComponent,
    PolylineFormComponent,
    RectFormComponent,
  ],
  exports: [ShapeFormComponent],
})
export class ShapeFormModule {}
