import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { PlopdownShapePath } from '@plopdown/plopdown-cues';

export const PathFormGroupBuilder = () => {
  return new FormGroup<PlopdownShapePath>({
    element: new FormControl('path', [Validators.required]),
    d: new FormControl('M150 0 L75 200 L225 200 Z', [Validators.required]),
  })
};
