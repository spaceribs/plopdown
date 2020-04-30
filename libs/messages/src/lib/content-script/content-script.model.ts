import { SavedTrack } from '@plopdown/tracks';
import { Command } from '../messages.model';
import { VideoRef } from '@plopdown/video-refs';

export type ContentScriptReady = Command<'CS_READY'>;
export type ContentScriptVideosFound = Command<'CS_VIDEOS_FOUND', VideoRef[]>;
export type ContentScriptIFramesFound = Command<'CS_IFRAMES_FOUND', string[]>;
export type ContentScriptTrackRequested = Command<
  'CS_TRACK_REQUESTED',
  [SavedTrack['_id']]
>;

export type ContentScriptCommand =
  | ContentScriptReady
  | ContentScriptVideosFound
  | ContentScriptIFramesFound
  | ContentScriptTrackRequested;
