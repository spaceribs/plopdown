import type { SavedTrack } from '@plopdown/tracks';

export interface TrackRef {
  _id: SavedTrack['_id'];
  title: SavedTrack['title'];
}

export interface VideoRef {
  xpath: string;
  title: string;
  duration: number;
  frameTitle: string | null;
  frameOrigin: string;
  framePath: string | null;
  frameSearch: string | null;
  track?: TrackRef;
}

export interface SavedVideoRef extends VideoRef {
  _id: string;
  _rev: string;
  track?: SavedTrack;
}

export interface VideoRefServiceStatus {
  loading: number;
  adding: number;
  removing: number;
  updating: number;
}
