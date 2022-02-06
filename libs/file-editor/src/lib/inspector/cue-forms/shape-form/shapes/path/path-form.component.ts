import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'plopdown-path-form',
  templateUrl: './path-form.component.html',
})
export class PathFormComponent {
  public pathGroup: FormGroup | null = null;
  @Input() public set shapeGroup(val: FormGroup | null) {
    if (val?.controls.element.value === 'path') {
      this.pathGroup = val as FormGroup;
      return;
    }
    this.pathGroup = null;
  }
}
