import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { PlopdownInfo, PlopdownTemplateType } from '@plopdown/plopdown-cues';

export const InfoFormGroup = new FormGroup<Required<PlopdownInfo>>({
  type: new FormControl(PlopdownTemplateType.Info),
  title: new FormControl('', [Validators.required]),
  url: new FormControl(),
  authors: new FormArray([], [Validators.required]),
});
