import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';
import { AudioEdit } from './audio-edits/audio-edits.model';
import { InjectionToken } from '@angular/core';

export interface PlopdownAudio extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Audio;
  top: number;
  left: number;
  title: string;
  url: string;
  edits?: AudioEdit[];
}
