import {
  Title,
  ExternalLink,
  Author,
} from './../../models/plopdown-primitives.model';
import {
  PlopdownBaseTemplate,
  PlopdownTemplateType,
} from '../../models/plopdown-base.model';

export interface PlopdownInfo extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Info;
  title: Title;
  url?: ExternalLink;
  authors: Author[];
}
