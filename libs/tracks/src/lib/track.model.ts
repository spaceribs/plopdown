import PouchDB from 'pouchdb';
import { Cue } from '@plopdown/plopdown-cues';

export interface Track {
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

export interface SavedTrack extends Track {
  _id: PouchDB.Core.DocumentId;
  _rev: PouchDB.Core.RevisionId;
  _attachments?: { [key: string]: PouchDB.Core.FullAttachment };
}
