import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { PlopdownShapeEllipse } from '@plopdown/plopdown-cues';

export const EllipseFormGroupBuilder = () => {
  return new FormGroup<PlopdownShapeEllipse>({
    element: new FormControl('ellipse', [Validators.required]),
    cx: new FormControl(0, [Validators.required]),
    cy: new FormControl(0, [Validators.required]),
    rx: new FormControl(0, [Validators.required]),
    ry: new FormControl(0, [Validators.required]),
  })
};
