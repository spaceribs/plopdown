import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';

export interface PlopdownAudio extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Audio;
  title: string;
  url: string;
}
