import { PlopdownTemplateType } from '@plopdown/plopdown-cues';

export interface CuePreview {
  style: {
    left: string;
    right: string;
    background: string;
  };
  type: PlopdownTemplateType;
  id: string;
  startTime: number;
  text: string;
}
