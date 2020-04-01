import { Command } from '../messages.model';
import type { VideoElementRef } from '@plopdown/video-elem-refs';

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
