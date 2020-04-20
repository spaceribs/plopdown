import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';

export interface PlopdownInfo extends PlopdownBaseTemplate {
  type: PlopdownTemplateType.Info;
  title: string;
  url?: string;
  authors: string[];
}
