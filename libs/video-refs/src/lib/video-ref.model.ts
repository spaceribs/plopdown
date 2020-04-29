import type { Track, SavedTrack } from '@plopdown/tracks';
import type { VideoElementRef } from '@plopdown/video-elem-refs';

export interface VideoRef {
  track?: SavedTrack['_id'];
  ref: VideoElementRef;
}
