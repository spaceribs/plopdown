import { VideoRef, UnsavedVideoRef } from '@plopdown/video-refs';
import { Command } from '../messages.model';

export type ContentScriptReady = Command<'CS_READY'>;
export type ContentScriptTracksRequested = Command<'CS_TRACKS_REQUESTED'>;
export type ContentScriptVideoRefsRequested =
  Command<'CS_VIDEO_REFS_REQUESTED'>;
export type ContentScriptCreateTrack = Command<'CS_CREATE_TRACK', [VideoRef]>;
export type ContentScriptDevRefs = Command<'CS_DEV_REFS', [UnsavedVideoRef[]]>;

export type ContentScriptCommand =
  | ContentScriptReady
  | ContentScriptDevRefs
  | ContentScriptTracksRequested
  | ContentScriptVideoRefsRequested
  | ContentScriptCreateTrack;
