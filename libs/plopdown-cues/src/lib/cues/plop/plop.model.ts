import {
  Percentage,
  Degree,
  Emoji,
  Title,
  ExternalLink,
  Description,
} from './../../models/plopdown-primitives.model';
import {
  PlopdownBaseTemplate,
  PlopdownTemplateType,
} from '../../models/plopdown-base.model';

interface Icon {
  top: Percentage;
  left: Percentage;
  size: Percentage;
  rotate: Degree;
  emoji: Emoji;
}

interface Footnote {
  title: Title;
  url: ExternalLink;
}

export interface PlopdownPlop extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Plop;
  top: Percentage;
  left: Percentage;
  width: Percentage;
  desc: Description;
  footnotes?: Footnote[];
  icons: Icon[];
}
