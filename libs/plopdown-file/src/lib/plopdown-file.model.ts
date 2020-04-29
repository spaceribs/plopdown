import type { Track } from '@plopdown/tracks';
import type { VideoElementRef } from '@plopdown/video-elem-refs';

export interface PlopdownFile {
  headers: {
    type: 'plopdown_v1';
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
  cues: Track['cues'];
}
