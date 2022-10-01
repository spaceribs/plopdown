import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlopdownInfo, PlopdownTemplateType } from '@plopdown/plopdown-cues';

export const InfoFormGroup = new FormGroup({
  type: new FormControl(PlopdownTemplateType.Info),
  title: new FormControl('', [Validators.required]),
  url: new FormControl(),
  authors: new FormArray([], [Validators.required]),
});
