import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';
import { PlopdownInfoSchema } from './info.schema';

export interface PlopdownInfo extends PlopdownInfoSchema, PlopdownBaseTemplate {
  type: PlopdownTemplateType.Info;
}
