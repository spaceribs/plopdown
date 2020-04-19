import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';
import { PlopdownPlopSchema } from '@plopdown/plopdown-file';

export interface PlopdownPlop extends PlopdownPlopSchema, PlopdownBaseTemplate {
  type: PlopdownTemplateType.Plop;
}
