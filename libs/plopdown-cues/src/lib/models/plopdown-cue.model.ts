import { PlopdownTemplate } from './plopdown-templates.model';

export interface PlopdownCue {
  startTime: number;
  endTime: number;
  id: string;
  data: PlopdownTemplate;
}
