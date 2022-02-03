import { Component, Input } from '@angular/core';
import {
  PlopdownShapeElements,
  PlopdownShapePolygon,
} from '@plopdown/plopdown-cues';
import { FormGroup } from '@ng-stack/forms';

@Component({
  selector: 'plopdown-polygon-form',
  templateUrl: './polygon-form.component.html',
})
export class PolygonFormComponent {
  public polygonGroup: FormGroup<PlopdownShapePolygon> | null = null;
  @Input() public set shapeGroup(val: FormGroup<PlopdownShapeElements> | null) {
    if (val?.controls.element.value === 'polygon') {
      this.polygonGroup = val as FormGroup<PlopdownShapePolygon>;
      return;
    }
    this.polygonGroup = null;
  }
}
