import { PlopdownAudio } from '../cues/audio/audio.model';
import { AudioComponent } from '../cues/audio/audio.component';
import { PlopComponent } from '../cues/plop/plop.component';
import { InfoComponent } from '../cues/info/info.component';
import { PlopdownPlop } from '../cues/plop/plop.model';
import { PlopdownInfo } from '../cues/info/info.model';

import { PlopdownTemplateType } from './plopdown-base.model';
import { PlopdownBaseComponent } from './plopdown-base.component';
import { Type } from '@angular/core';

export type PlopdownTemplate = PlopdownInfo | PlopdownPlop | PlopdownAudio;

export const PLOPDOWN_TEMPLATES: {
  [key in PlopdownTemplateType]: Type<PlopdownBaseComponent<PlopdownTemplate>>;
} = {
  [PlopdownTemplateType.Info]: InfoComponent,
  [PlopdownTemplateType.Plop]: PlopComponent,
  [PlopdownTemplateType.Audio]: AudioComponent
};
