import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'plopdown-ellipse-form',
  templateUrl: './ellipse-form.component.html',
})
export class EllipseFormComponent {
  public ellipseGroup: FormGroup | null = null;
  @Input() public set shapeGroup(val: FormGroup | null) {
    if (val?.controls.element.value === 'ellipse') {
      this.ellipseGroup = val as FormGroup;
      return;
    }
    this.ellipseGroup = null;
  }
}
