import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { PlopdownShapePolygon } from '@plopdown/plopdown-cues';

export const PolygonFormGroupBuilder = () => {
  return new FormGroup<PlopdownShapePolygon>({
    element: new FormControl('polygon', [Validators.required]),
    points: new FormControl('200,10 250,190 160,210', [Validators.required]),
  })
};
