import type { Track } from '@plopdown/tracks';
import { VideoRef } from '@plopdown/video-refs';

/**
 * Unofficially, WebVTT supports simple key/value storage at the top
 * of the file. We use that to allow creators to hint which video the
 * plopdown should be overlayed to, as well as other authorship info.
 *
 * @title File Headers
 * @interface PlopdownFileHeaders
 */
export interface PlopdownFileHeaders
  extends PouchDB.Core.IdMeta,
    PouchDB.Core.RevisionIdMeta,
    Record<string, string | undefined> {
  /**
   * @title ID
   * @format readonly
   */
  _id: string;

  /**
   * @title Revision
   * @format readonly
   */
  _rev: string;

  /**
   * Schema version number
   *
   * @title Type
   * @type {'plopdown_v2'}
   * @constant
   */
  type: 'plopdown_v2';

  /**
   * @title Title
   */
  title: Track['title'];

  /**
   * The name of the video this track is intended for.
   *
   * @title Intended Video
   */
  for: Track['for'];

  /**
   * @title Created
   * @format readonly
   */
  created: Track['created'];

  /**
   * @title Last Updated
   * @format readonly
   */
  updated: Track['updated'];

  /**
   * The filename of the thumbnail file uploaded alongside the track.
   *
   * @title Thumbnail
   */
  thumbnail: Track['thumbnail'];

  /**
   * The external link where more information about this track is available.
   *
   * @title URL
   * @format uri
   */
  url: Track['url'];

  /**
   * The localization in "en-US" format.
   *
   * @title Language
   */
  language: Track['language'];

  /**
   * The abbreviated license type "CC0"
   *
   * @title License
   */
  license: Track['license'];

  /**
   * The list of authors or author who wrote this track
   *
   * @title Author(s)
   */
  authors: Track['authors'];

  /**
   * Hint of where the video file is hosted: "https://netflix.com"
   *
   * @title Frame Origin
   * @format uri
   */
  frameOrigin: VideoRef['frameOrigin'];

  /**
   * Hint of the path to the video: "/video/123"
   *
   * @title Frame Path
   */
  framePath: VideoRef['framePath'];

  /**
   * Hint of the search parameters to the video: "id=123"
   *
   * @title Frame Search
   */
  frameSearch: VideoRef['frameSearch'];

  /**
   * Hint of XPath to the video in the page: "/HTML[1]/BODY[1]//VIDEO[1]"
   *
   * @title XPath
   */
  xpath: VideoRef['xpath'];

  /**
   * Hint of the total duration of the matching video in seconds
   *
   * @title Video Duration
   * @pattern \d+
   */
  duration: VideoRef['duration'];

  /**
   * Hint of the title of the page hosting the video "Netflix - The Shining"
   *
   * @title Title
   */
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
