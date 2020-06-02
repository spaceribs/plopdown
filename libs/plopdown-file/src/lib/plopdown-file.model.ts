import type { Track } from '@plopdown/tracks';
import { VideoRef } from '@plopdown/video-refs';

/**
 * Unofficially, WebVTT supports simple key/value storage at the top
 * of the file. We use that to allow creators to hint which video the
 * plopdown should be overlayed to, as well as other authorship info.
 *
 * @interface PlopdownFileHeaders
 */
interface PlopdownFileHeaders {
  /**
   * Schema version number
   *
   * @type {'plopdown_v1'}
   * @memberof PlopdownFileHeaders
   */
  type: 'plopdown_v1';
  title: Track['title'];
  for: Track['for'];
  created: Track['created'];
  updated?: Track['updated'];
  thumbnail?: Track['thumbnail'];
  url?: Track['url'];
  language?: Track['language'];
  license?: Track['license'];
  authors?: Track['authors'];
  origin?: VideoRef['frameOrigin'];
  path?: VideoRef['framePath'];
  search?: VideoRef['frameSearch'];
  xpath?: VideoRef['xpath'];
}

/**
 * File containing an exported plopdown video reference and track.
 *
 * @export
 * @interface PlopdownFile
 */
export interface PlopdownFile {
  headers: PlopdownFileHeaders;
  cues: Track['cues'];
  files?: string[];
}
