import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  PlopdownShapeElements,
  PlopdownShapeEllipse,
} from '@plopdown/plopdown-cues';
import { EllipseFormGroup } from './ellipse-form.form-group';

@Component({
  selector: 'plopdown-ellipse-form',
  templateUrl: './ellipse-form.component.html',
  styleUrls: ['./ellipse-form.component.scss'],
})
export class EllipseFormComponent {
  private subs = new Subscription();
  public shapeGroup = EllipseFormGroup;

  @Input()
  public set data(val: PlopdownShapeElements | null) {
    this.shapeGroup.reset(undefined, { emitEvent: false });

    if (val == null || val.element !== 'ellipse') {
      return;
    }

    this.shapeGroup.patchValue(val, { emitEvent: false });
  }

  @Output() public dataChange: EventEmitter<PlopdownShapeEllipse> =
    new EventEmitter();
  @Output() public formUpdate: EventEmitter<void> = new EventEmitter();

  constructor() {
    const valueChangeSub = this.shapeGroup.valueChanges.subscribe((val) => {
      if (this.shapeGroup.invalid) {
        return;
      }

      this.dataChange.emit(val);
    });
    this.subs.add(valueChangeSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
