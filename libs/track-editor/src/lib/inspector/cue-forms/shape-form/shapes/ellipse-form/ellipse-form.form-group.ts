import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlopdownShapeEllipse } from '@plopdown/plopdown-cues';

export const EllipseFormGroupBuilder = () => {
  return new FormGroup({
    element: new FormControl('ellipse', [Validators.required]),
    cx: new FormControl(0, [Validators.required]),
    cy: new FormControl(0, [Validators.required]),
    rx: new FormControl(0, [Validators.required]),
    ry: new FormControl(0, [Validators.required]),
  });
};
