import { Cue } from '@plopdown/plopdown-cues';

export interface Track {
  id: string;
  title: string;
  for: string;
  language?: string;
  authors?: string[];
  license?: string;
  url?: string;
  created: string;
  updated?: string;
  cues: Cue[];
}
