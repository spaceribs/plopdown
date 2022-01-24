import { FormArray, FormControl, FormGroup, Validators } from '@ng-stack/forms';
import { PlopdownShape, PlopdownTemplateType } from '@plopdown/plopdown-cues';

export const InfoFormGroup = new FormGroup<Required<PlopdownShape>>({
  type: new FormControl(PlopdownTemplateType.Shape),
  title: new FormGroup({
    text: new FormControl('', [Validators.required]),
    show: new FormControl(true, [Validators.required]),
  }),
  top: new FormControl(20, [Validators.required]),
  left: new FormControl(20, [Validators.required]),
  width: new FormControl(20, [Validators.required]),
  height: new FormControl(20, [Validators.required]),
  viewBox: new FormControl('0 0 20 20', [
    Validators.required,
    Validators.pattern(/^([0-9]+\s){3}[0-9]+$/),
  ]),
  elements: new FormArray([]),
  blend: new FormControl('normal'),
});
