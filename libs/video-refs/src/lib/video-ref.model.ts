import type { Track } from '@plopdown/tracks';
import type { VideoElementRef } from '@plopdown/video-elem-refs';

export interface VideoRef {
  track?: Track['id'];
  ref: VideoElementRef;
}
