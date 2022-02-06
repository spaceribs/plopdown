import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'plopdown-polygon-form',
  templateUrl: './polygon-form.component.html',
})
export class PolygonFormComponent {
  public polygonGroup: FormGroup | null = null;
  @Input() public set shapeGroup(val: FormGroup | null) {
    if (val?.controls.element.value === 'polygon') {
      this.polygonGroup = val as FormGroup;
      return;
    }
    this.polygonGroup = null;
  }
}
