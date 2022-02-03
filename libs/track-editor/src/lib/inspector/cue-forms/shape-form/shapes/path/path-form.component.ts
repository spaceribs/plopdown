import { Component, Input } from '@angular/core';
import {
  PlopdownShapeElements,
  PlopdownShapePath,
} from '@plopdown/plopdown-cues';
import { FormGroup } from '@ng-stack/forms';

@Component({
  selector: 'plopdown-path-form',
  templateUrl: './path-form.component.html',
})
export class PathFormComponent {
  public pathGroup: FormGroup<PlopdownShapePath> | null = null;
  @Input() public set shapeGroup(val: FormGroup<PlopdownShapeElements> | null) {
    if (val?.controls.element.value === 'path') {
      this.pathGroup = val as FormGroup<PlopdownShapePath>;
      return;
    }
    this.pathGroup = null;
  }
}
