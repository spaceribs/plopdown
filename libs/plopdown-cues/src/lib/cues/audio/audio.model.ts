import {
  Percentage,
  URIReference,
  Title,
  Seconds,
} from '../../models/plopdown-primitives.model';
import {
  PlopdownBaseTemplate,
  PlopdownTemplateType,
} from '../../models/plopdown-base.model';

export interface PlopdownAudio extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Audio;
  top: Percentage;
  left: Percentage;
  title: Title;
  url: URIReference;
  offset_time?: Seconds;
}
