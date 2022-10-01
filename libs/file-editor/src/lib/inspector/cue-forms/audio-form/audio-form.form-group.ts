import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlopdownAudio, PlopdownTemplateType } from '@plopdown/plopdown-cues';

export const AudioFormGroup = new FormGroup({
  type: new FormControl(PlopdownTemplateType.Audio),
  title: new FormControl('', [Validators.required]),
  url: new FormControl('', [Validators.required]),
  top: new FormControl(20, [Validators.required]),
  left: new FormControl(20, [Validators.required]),
  offset_time: new FormControl(0),
});
