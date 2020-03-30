import { Track } from '@plopdown/tracks';
import { VideoElementRef } from 'libs/video-elem-refs/src';

export interface PlopdownFile {
  headers: {
    type: 'plopdown_v1';
    id: Track['id'];
    title: Track['title'];
    for: Track['for'];
    created: Track['created'];
    updated?: Track['updated'];
    url?: Track['url'];
    license?: Track['license'];
    authors?: Track['authors'];
    origin?: VideoElementRef['frameOrigin'];
    path?: VideoElementRef['framePath'];
    search?: VideoElementRef['frameSearch'];
    xpath?: VideoElementRef['xpath'];
  };
  cues: Cue[];
}

export interface Cue {
  startTime: number;
  endTime: number;
  id?: string;
  data: PlopDown | PlopInfo;
}

export interface PlopIcon {
  top: number;
  left: number;
  size: number;
  rotate: number;
  emoji: string;
}

export interface PlopDown {
  type: 'PLOP';
  width: number;
  desc: string;
  icons: PlopIcon[];
  top: number;
  left: number;
}

export interface PlopInfo {
  type: 'INFO';
  title: string;
  authors: string[];
}
