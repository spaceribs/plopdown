import { Track } from '@plopdown/tracks';
import { VideoElementRef } from 'libs/video-elem-refs/src';

export interface VideoRef {
  track?: Track['id'];
  ref: VideoElementRef;
}
