import { FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { PlopdownShapePolyline } from '@plopdown/plopdown-cues';

export const PolylineFormGroupBuilder = () => {
  return new FormGroup<PlopdownShapePolyline>({
    element: new FormControl('polyline', [Validators.required]),
    points: new FormControl('200,10 250,190 160,210', [Validators.required]),
  })
};
