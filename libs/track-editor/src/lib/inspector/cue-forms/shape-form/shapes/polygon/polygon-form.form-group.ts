import { FormControl, FormGroup, Validators } from '@angular/forms';

export const PolygonFormGroupBuilder = () => {
  return new FormGroup({
    element: new FormControl('polygon', [Validators.required]),
    points: new FormControl('200,10 250,190 160,210', [Validators.required]),
  });
};
