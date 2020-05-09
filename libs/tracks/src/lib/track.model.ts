import PouchDB from 'pouchdb';
import { Cue } from '@plopdown/plopdown-cues';

export interface Track {
  title: string;
  for: string;
  language?: string;
  authors?: string[];
  license?: string;
  url?: string;
  thumbnail?: string;
  created: string;
  updated?: string;
  cues: Cue[];
}

export interface SavedTrack extends Track {
  _id: PouchDB.Core.DocumentId;
  _rev: PouchDB.Core.RevisionId;
  _attachments?: { [key: string]: PouchDB.Core.FullAttachment };
}
