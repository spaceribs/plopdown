import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';

interface Icon {
  top: number;
  left: number;
  size: number;
  rotate: number;
  emoji: string;
}

export interface PlopdownPlop extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Plop;
  top: number;
  left: number;
  width: number;
  desc: string;
  icons: Icon[];
}
