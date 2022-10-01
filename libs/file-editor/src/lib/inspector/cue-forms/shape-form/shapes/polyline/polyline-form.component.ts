import { Component, Input } from '@angular/core';
import {
  PlopdownShapeElements,
  PlopdownShapePolyline,
} from '@plopdown/plopdown-cues';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'plopdown-polyline-form',
  templateUrl: './polyline-form.component.html',
})
export class PolylineFormComponent {
  public polylineGroup: FormGroup | null = null;
  @Input() public set shapeGroup(val: FormGroup | null) {
    if (val?.controls.element.value === 'polyline') {
      this.polylineGroup = val as FormGroup;
      return;
    }
    this.polylineGroup = null;
  }
}
