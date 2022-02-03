import { Component, Input } from '@angular/core';
import {
  PlopdownShapeElements,
  PlopdownShapePolyline,
} from '@plopdown/plopdown-cues';
import { FormGroup } from '@ng-stack/forms';

@Component({
  selector: 'plopdown-polyline-form',
  templateUrl: './polyline-form.component.html',
})
export class PolylineFormComponent {
  public polylineGroup: FormGroup<PlopdownShapePolyline> | null = null;
  @Input() public set shapeGroup(val: FormGroup<PlopdownShapeElements> | null) {
    if (val?.controls.element.value === 'polyline') {
      this.polylineGroup = val as FormGroup<PlopdownShapePolyline>;
      return;
    }
    this.polylineGroup = null;
  }
}
