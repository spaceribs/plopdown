import type { Track } from '@plopdown/tracks';

export interface TrackRef {
  _id: Track['_id'];
  title: Track['title'];
}

export interface UnsavedVideoRef {
  xpath: string;
  title: string;
  duration?: string;
  frameTitle?: string;
  frameOrigin?: string;
  framePath?: string;
  frameSearch?: string;
  track: TrackRef | null;
}

/**
 * A reference to the location and attributes of a video
 * in which a plopdown is associated.
 *
 * @export
 * @interface VideoRef
 */
export interface VideoRef
  extends UnsavedVideoRef,
    PouchDB.Core.IdMeta,
    PouchDB.Core.GetMeta {}

export interface VideoRefServiceStatus {
  loading: number;
  adding: number;
  removing: number;
  updating: number;
}
