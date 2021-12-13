import type { Track } from '@plopdown/tracks';
import { VideoRef } from '@plopdown/video-refs';

/**
 * Unofficially, WebVTT supports simple key/value storage at the top
 * of the file. We use that to allow creators to hint which video the
 * plopdown should be overlayed to, as well as other authorship info.
 *
 * @interface PlopdownFileHeaders
 */
export interface PlopdownFileHeaders
  extends PouchDB.Core.IdMeta,
    PouchDB.Core.RevisionIdMeta,
    Record<string, string | undefined> {
  /**
   * Schema version number
   *
   * @type {'plopdown_v2'}
   * @memberof PlopdownFileHeaders
   */
  type: 'plopdown_v2';
  title: Track['title'];
  for: Track['for'];
  created: Track['created'];
  updated: Track['updated'];
  thumbnail: Track['thumbnail'];
  url: Track['url'];
  language: Track['language'];
  license: Track['license'];
  authors: Track['authors'];
  frameOrigin: VideoRef['frameOrigin'];
  framePath: VideoRef['framePath'];
  frameSearch: VideoRef['frameSearch'];
  xpath: VideoRef['xpath'];
  duration: VideoRef['duration'];
  frameTitle: VideoRef['frameTitle'];
}

/**
 * File containing an exported plopdown video reference and track.
 *
 * @export
 * @interface PlopdownFile
 */
export interface PlopdownFile extends Record<string, unknown> {
  headers: PlopdownFileHeaders;
  cues: Track['cues'];
  files?: string[];
}
