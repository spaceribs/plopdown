import type { Track } from '@plopdown/tracks';
import { VideoRef } from '@plopdown/video-refs';

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
    origin?: VideoRef['frameOrigin'];
    path?: VideoRef['framePath'];
    search?: VideoRef['frameSearch'];
    xpath?: VideoRef['xpath'];
  };
  cues: Track['cues'];
}
