import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  PlopdownShape,
  PlopdownShapeElements,
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';
import { InfoFormGroup } from './shape-form.form-group';
import { FormArray } from '@angular/forms';
import { EllipseFormGroupBuilder } from './shapes/ellipse-form/ellipse-form.form-group';
import {
  mdiShapeCirclePlus,
  mdiShapePolygonPlus,
  mdiShapeRectanglePlus,
  mdiTrashCanOutline,
  mdiVectorPolylinePlus,
  mdiVectorSquarePlus,
} from '@mdi/js';
import { PathFormGroupBuilder } from './shapes/path/path-form.form-group';
import { PolygonFormGroupBuilder } from './shapes/polygon/polygon-form.form-group';
import { PolylineFormGroupBuilder } from './shapes/polyline/polyline-form.form-group';
import { RectFormGroupBuilder } from './shapes/rect/rect-form.form-group';

@Component({
  selector: 'plopdown-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss'],
})
export class ShapeFormComponent {
  private subs = new Subscription();
  public templateGroup = InfoFormGroup;

  public trashIcon = mdiTrashCanOutline;

  public ellipseIcon = mdiShapeCirclePlus;
  public polygonIcon = mdiShapePolygonPlus;
  public rectIcon = mdiShapeRectanglePlus;
  public polylineIcon = mdiVectorPolylinePlus;
  public pathIcon = mdiVectorSquarePlus;

  @Input()
  public set data(val: PlopdownTemplate | null) {
    this.templateGroup.reset(undefined, { emitEvent: false });

    if (val == null || val.type !== PlopdownTemplateType.Shape) {
      return;
    }

    this.templateGroup.patchValue(val, { emitEvent: false });
  }
  @Output() public dataChange: EventEmitter<PlopdownShape> = new EventEmitter();
  @Output() public formUpdate: EventEmitter<void> = new EventEmitter();

  constructor() {
    const valueChangeSub = this.templateGroup.valueChanges.subscribe((val) => {
      if (this.templateGroup.invalid) {
        return;
      }

      this.dataChange.emit(val);
    });
    this.subs.add(valueChangeSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public addElement(
    array: FormArray,
    element: PlopdownShapeElements['element']
  ): void {
    switch (element) {
      case 'ellipse':
        array.push(EllipseFormGroupBuilder());
        break;

      case 'rect':
        array.push(RectFormGroupBuilder());
        break;

      case 'path':
        array.push(PathFormGroupBuilder());
        break;

      case 'polygon':
        array.push(PolygonFormGroupBuilder());
        break;

      case 'polyline':
        array.push(PolylineFormGroupBuilder());
        break;
    }
    this.formUpdate.emit();
  }

  public removeShape(array: FormArray, index: number) {
    array.removeAt(index);
    this.formUpdate.emit();
  }
}
