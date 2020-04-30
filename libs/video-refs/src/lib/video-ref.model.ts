import type { SavedTrack } from '@plopdown/tracks';

export interface VideoRef {
  xpath: string;
  title: string;
  frameTitle: string;
  frameOrigin: string;
  framePath: string;
  frameSearch: string;
  trackId?: SavedTrack['_id'];
}

export interface SavedVideoRef extends VideoRef {
  _id: string;
  _rev: string;
  track: SavedTrack;
}
