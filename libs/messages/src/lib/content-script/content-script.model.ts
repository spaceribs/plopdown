import { VideoRef, UnsavedVideoRef } from '@plopdown/video-refs';
import { Command } from '../messages.model';

export type ContentScriptReady = Command<'CS_READY'>;
export type ContentScriptTracksRequested = Command<'CS_TRACKS_REQUESTED'>;
export type ContentScriptVideoRefsRequested =
  Command<'CS_VIDEO_REFS_REQUESTED'>;
export type ContentScriptAddVideoRef = Command<'CS_ADD_VIDEO_REF', [VideoRef]>;
export type ContentScriptDevRefs = Command<'CS_DEV_REFS', [UnsavedVideoRef[]]>;

export type ContentScriptCommand =
  | ContentScriptReady
  | ContentScriptDevRefs
  | ContentScriptTracksRequested
  | ContentScriptVideoRefsRequested
  | ContentScriptAddVideoRef;
