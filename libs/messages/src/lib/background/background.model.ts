import { SavedTrack } from '@plopdown/tracks';
import { Command } from '../messages.model';
import { VideoRef, SavedVideoRef } from '@plopdown/video-refs';

export type BackgroundCheckAlive = Command<'BG_CHECK_ALIVE'>;
export type BackgroundFindVideos = Command<'BG_FIND_VIDEOS'>;
export type BackgroundContentFound = Command<
  'BG_CONTENT_FOUND',
  [VideoRef[], string[]]
>;
export type BackgroundTrackFound = Command<'BG_TRACK_FOUND', [SavedTrack]>;
export type BackgroundVideoRefFound = Command<
  'BG_VIDEO_REFS_FOUND',
  [SavedVideoRef[]]
>;

export type BackgroundCommand =
  | BackgroundCheckAlive
  | BackgroundContentFound
  | BackgroundFindVideos
  | BackgroundTrackFound
  | BackgroundVideoRefFound;
