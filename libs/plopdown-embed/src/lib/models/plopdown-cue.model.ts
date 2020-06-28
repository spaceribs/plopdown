import { PlopdownTemplate } from './plopdown-templates.model';

export interface Cue {
  startTime: number;
  endTime: number;
  id: string;
  data: PlopdownTemplate;
  style?: object;
}
