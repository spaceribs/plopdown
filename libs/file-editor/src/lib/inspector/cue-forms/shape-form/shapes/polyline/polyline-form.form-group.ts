import { FormControl, FormGroup, Validators } from '@angular/forms';

export const PolylineFormGroupBuilder = () => {
  return new FormGroup({
    element: new FormControl('polyline', [Validators.required]),
    points: new FormControl('200,10 250,190 160,210', [Validators.required]),
  });
};
