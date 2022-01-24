import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  PlopdownShape,
  PlopdownShapeElements,
  PlopdownTemplate,
  PlopdownTemplateType,
} from '@plopdown/plopdown-cues';
import { InfoFormGroup } from './shape-form.form-group';
import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { EllipseFormGroup } from './shapes/ellipse-form/ellipse-form.form-group';
import {
  mdiShapeCirclePlus,
  mdiShapePolygonPlus,
  mdiShapeRectanglePlus,
  mdiVectorPolylinePlus,
  mdiVectorSquarePlus,
} from '@mdi/js';

@Component({
  selector: 'plopdown-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss'],
})
export class ShapeFormComponent {
  private subs = new Subscription();
  public templateGroup = InfoFormGroup;

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
    array: FormArray<PlopdownShapeElements>,
    element: PlopdownShapeElements['element']
  ): void {
    switch (element) {
      case 'ellipse':
        array.push(EllipseFormGroup);
        break;

      case 'rect':
        array.push(
          new FormGroup<PlopdownShapeElements>({
            element: new FormControl('rect', [Validators.required]),
            x: new FormControl(0, [Validators.required]),
            y: new FormControl(0, [Validators.required]),
            width: new FormControl(0, [Validators.required]),
            height: new FormControl(0, [Validators.required]),
            rx: new FormControl(0),
            ry: new FormControl(0),
          })
        );
        break;

      case 'path':
        array.push(
          new FormGroup<PlopdownShapeElements>({
            element: new FormControl('path', [Validators.required]),
            d: new FormControl('M10 10', [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(1024),
            ]),
          })
        );
        break;

      case 'polygon':
        array.push(
          new FormGroup<PlopdownShapeElements>({
            element: new FormControl('polygon', [Validators.required]),
            points: new FormControl('M10 10', [
              Validators.required,
              Validators.pattern(
                /^((-?[0-9]+),(-?[0-9]+)\s)+(-?[0-9]+),(-?[0-9]+)$/
              ),
            ]),
          })
        );
        break;

      case 'polyline':
        array.push(
          new FormGroup<PlopdownShapeElements>({
            element: new FormControl('polyline', [Validators.required]),
            points: new FormControl('M10 10', [
              Validators.required,
              Validators.pattern(
                /^((-?[0-9]+),(-?[0-9]+)\s)+(-?[0-9]+),(-?[0-9]+)$/
              ),
            ]),
          })
        );
        break;

      default:
        break;
    }
    element;
    this.formUpdate.emit();
  }

  public removeShape(array: FormArray<PlopdownShapeElements>, index: number) {
    array.removeAt(index);
    this.formUpdate.emit();
  }
}
