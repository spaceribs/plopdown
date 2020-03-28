import { Track } from '@plopdown/tracks';
import { VideoElementRef } from './video-element-ref.model';

export interface VideoRef {
  track?: Track['id'];
  ref: VideoElementRef;
}
