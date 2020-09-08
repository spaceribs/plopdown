import {
  Percentage,
  URIReference,
  Title,
} from '../../models/plopdown-primitives.model';
import {
  PlopdownBaseTemplate,
  PlopdownTemplateType,
} from '../../models/plopdown-base.model';
import { AudioEdit } from './audio-edits/audio-edits.model';

export interface PlopdownAudio extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Audio;
  top: Percentage;
  left: Percentage;
  title: Title;
  url: URIReference;
  edits?: AudioEdit[];
}
