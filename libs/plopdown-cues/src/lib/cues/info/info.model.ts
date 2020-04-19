import {
  PlopdownBaseTemplate,
  PlopdownTemplateType
} from '../../models/plopdown-base.model';
import { PlopdownInfoSchema } from '@plopdown/plopdown-file';

export interface PlopdownInfo extends PlopdownInfoSchema, PlopdownBaseTemplate {
  type: PlopdownTemplateType.Info;
}
