import { Component, Input } from '@angular/core';
import {
  PlopdownShapeElements,
  PlopdownShapeEllipse,
} from '@plopdown/plopdown-cues';
import { FormGroup } from '@ng-stack/forms';

@Component({
  selector: 'plopdown-ellipse-form',
  templateUrl: './ellipse-form.component.html',
})
export class EllipseFormComponent {
  public ellipseGroup: FormGroup<PlopdownShapeEllipse> | null = null;
  @Input() public set shapeGroup(val: FormGroup<PlopdownShapeElements> | null) {
    if (val?.controls.element.value === 'ellipse') {
      this.ellipseGroup = val as FormGroup<PlopdownShapeEllipse>;
      return;
    }
    this.ellipseGroup = null;
  }
}
