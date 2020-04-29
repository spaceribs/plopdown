import { Cue } from '@plopdown/plopdown-cues';

export interface Track {
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

export interface SavedTrack extends Track {
  _id: string;
  _rev: string;
}
