import { Track } from '@plopdown/tracks';

export interface VideoRef {
  track?: Track['id'];
  ref: VideoElementRef;
}

export interface VideoElementRef {
  xpath: string;
  title: string;
  frameTitle: string;
  frameOrigin: string;
  framePath: string;
  frameSearch: string;
}
