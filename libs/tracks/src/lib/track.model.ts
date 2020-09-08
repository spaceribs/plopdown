import { Cue } from '@plopdown/plopdown-cues';

export interface Track
  extends PouchDB.Core.IdMeta,
    Partial<PouchDB.Core.GetMeta> {
  /**
   * The primary ID used to store a track.
   * Usually an auto-generated UUID.
   *
   * @type {Track['_id']}
   * @memberof PlopdownFileHeaders
   */
  _id: PouchDB.Core.DocumentId;

  /**
   * The revision number of the track.
   * Usually auto generated by the storage service.
   *
   * @type {Track['_id']}
   * @memberof PlopdownFileHeaders
   */
  _rev?: PouchDB.Core.RevisionId;

  /**
   * The files associated with the track.
   * These are usually audio or video files which
   * can be combined with the original video.
   *
   * @type {Track['_id']}
   * @memberof PlopdownFileHeaders
   */
  _attachments?: { [key: string]: PouchDB.Core.FullAttachment };

  /**
   * Name of the plopdown
   *
   * @type {Track['title']}
   * @memberof PlopdownFileHeaders
   */
  title: string;

  /**
   * Name of the video this track was intended for.
   *
   * @type {Track['for']}
   * @memberof PlopdownFileHeaders
   */
  for: string;

  /**
   * Language of the track in "en-US" format
   * See: https://gist.github.com/ndbroadbent/588fefab8e0f1b459fcec8181b41b39c
   *
   * @type {Track['language']}
   * @memberof PlopdownFileHeaders
   */
  language?: string;

  /**
   * Author names in whatever form makes sense
   *
   * @type {string[]}
   * @memberof Track
   */
  authors?: string;

  /**
   * Capitalized license associated with this file
   *
   * @type {Track['license']}
   * @memberof PlopdownFileHeaders
   */
  license?: string;

  /**
   * URL of this track's homepage.
   *
   * @type {Track['url']}
   * @memberof PlopdownFileHeaders
   */
  url?: string;

  /**
   * The thumbnail image of the track, usually packaged alongside
   * the track or fetched remotely.
   *
   * @type {Track['thumbnail']}
   * @memberof PlopdownFileHeaders
   */
  thumbnail?: string;

  /**
   * The date in which this track was created.
   *
   * @type {Track['created']}
   * @memberof PlopdownFileHeaders
   */
  created: string;

  /**
   * The date in which this track was last updated.
   *
   * @type {Track['created']}
   * @memberof PlopdownFileHeaders
   */
  updated?: string;

  /**
   * The cues associated with this track.
   *
   * @type {Cue[]}
   * @memberof Track
   */
  cues: Cue[];
}
