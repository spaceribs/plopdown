import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlopdownShapeRect } from '@plopdown/plopdown-cues';

export const RectFormGroupBuilder = () => {
  return new FormGroup({
    element: new FormControl('rect', [Validators.required]),
    x: new FormControl(0, [Validators.required]),
    y: new FormControl(0, [Validators.required]),
    width: new FormControl(0, [Validators.required]),
    height: new FormControl(0, [Validators.required]),
    rx: new FormControl(0),
    ry: new FormControl(0),
  });
};
