export interface UnsavedRemote {
  url: string;
  title: string;
  sync: boolean;
  username: null | string;
  password: null | string;
  error: null | Error;
  last_replicated: null | Date;
}

/**
 * Represents a remote feed that supplies
 * tracks and video references.
 *
 * @export
 * @interface Remote
 */
export interface Remote
  extends UnsavedRemote,
    PouchDB.Core.IdMeta,
    PouchDB.Core.GetMeta {}
