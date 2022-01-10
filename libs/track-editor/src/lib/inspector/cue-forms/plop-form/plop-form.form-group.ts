import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
import {
  PlopdownPlop,
  PlopdownTemplateType,
  PlopFootnote,
} from '@plopdown/plopdown-cues';

export const PlopFormGroup = new FormGroup<Required<PlopdownPlop>>({
  type: new FormControl(PlopdownTemplateType.Plop, {
    validators: [Validators.required],
  }),
  top: new FormControl(30, { validators: [Validators.required] }),
  left: new FormControl(30, { validators: [Validators.required] }),
  width: new FormControl(40, { validators: [Validators.required] }),
  desc: new FormControl('', { validators: [Validators.required] }),
  footnotes: new FormArray<PlopFootnote>([]),
  icons: new FormArray([]),
});
