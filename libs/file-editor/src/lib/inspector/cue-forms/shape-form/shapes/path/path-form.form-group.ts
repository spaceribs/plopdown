import { FormControl, FormGroup, Validators } from '@angular/forms';

export const PathFormGroupBuilder = () => {
  return new FormGroup({
    element: new FormControl('path', [Validators.required]),
    d: new FormControl('M150 0 L75 200 L225 200 Z', [Validators.required]),
  });
};
