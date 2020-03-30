import { Command } from '../messages.model';
import { VideoElementRef } from '@plopdown/video-refs';

export type BackgroundCheckAlive = Command<'BG_CHECK_ALIVE'>;
export type BackgroundFindVideos = Command<'BG_FIND_VIDEOS'>;
export type BackgroundVideoRefsFound = Command<
  'BG_CONTENT_FOUND',
  [VideoElementRef[], string[]]
>;
export type BackgroundCommand =
  | BackgroundCheckAlive
  | BackgroundVideoRefsFound
  | BackgroundFindVideos;
