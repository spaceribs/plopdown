import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'plopdown-rect-form',
  templateUrl: './rect-form.component.html',
})
export class RectFormComponent {
  public rectGroup: FormGroup | null = null;
  @Input() public set shapeGroup(val: FormGroup | null) {
    if (val?.controls.element.value === 'rect') {
      this.rectGroup = val as FormGroup;
      return;
    }
    this.rectGroup = null;
  }
}
