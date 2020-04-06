import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';
import { PlopdownPlopSchema } from './plop.schema';

export interface PlopdownPlop extends PlopdownPlopSchema, PlopdownBaseTemplate {
  type: PlopdownTemplateType.Plop;
}
