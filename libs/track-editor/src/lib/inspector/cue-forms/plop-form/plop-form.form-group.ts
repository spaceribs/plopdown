import { FormArray, FormControl, FormGroup } from '@ng-stack/forms';
import {
  PlopdownPlop,
  PlopdownTemplateType,
  PlopFootnote,
} from '@plopdown/plopdown-cues';

export const PlopFormGroup = new FormGroup<Required<PlopdownPlop>>({
  type: new FormControl(PlopdownTemplateType.Plop),
  top: new FormControl(),
  left: new FormControl(),
  width: new FormControl(),
  desc: new FormControl(),
  footnotes: new FormArray<PlopFootnote>([]),
  icons: new FormArray([]),
});
