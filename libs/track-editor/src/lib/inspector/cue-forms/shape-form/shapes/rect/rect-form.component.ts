import { Component, Input } from '@angular/core';
import {
  PlopdownShapeElements,
  PlopdownShapeRect,
} from '@plopdown/plopdown-cues';
import { FormGroup } from '@ng-stack/forms';

@Component({
  selector: 'plopdown-rect-form',
  templateUrl: './rect-form.component.html',
})
export class RectFormComponent {
  public rectGroup: FormGroup<PlopdownShapeRect> | null = null;
  @Input() public set shapeGroup(val: FormGroup<PlopdownShapeElements> | null) {
    if (val?.controls.element.value === 'rect') {
      this.rectGroup = val as FormGroup<PlopdownShapeRect>;
      return;
    }
    this.rectGroup = null;
  }
}
