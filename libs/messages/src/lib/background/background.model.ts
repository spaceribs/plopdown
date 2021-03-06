import { VideoRef } from '@plopdown/video-refs';
import { Track } from '@plopdown/tracks';
import { Command } from '../messages.model';

export interface BackgroundStatus {
  active_allowed: boolean;
  active_origin: string | null;
}

export type BackgroundCheckAlive = Command<'BG_CHECK_ALIVE'>;
export type BackgroundPublishStatus = Command<'BG_STATUS', [BackgroundStatus]>;
export type BackgroundTracksFound = Command<'BG_TRACKS_FOUND', [Track[]]>;
export type BackgroundVideoRefsFound = Command<
  'BG_VIDEO_REFS_FOUND',
  [VideoRef[]]
>;
export type BackgroundVideoRefAdded = Command<'BG_VIDEO_REF_ADDED', [VideoRef]>;

export type BackgroundCommand =
  | BackgroundCheckAlive
  | BackgroundTracksFound
  | BackgroundPublishStatus
  | BackgroundVideoRefsFound
  | BackgroundVideoRefAdded;
