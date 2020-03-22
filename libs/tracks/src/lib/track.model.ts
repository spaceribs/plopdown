import { Cue } from './cue.model';

export interface Track {
  id: string;
  title: string;
  for: string;
  authors?: string[];
  license?: string;
  url?: string;
  created: string;
  updated?: string;
  cues: Cue[];
}
