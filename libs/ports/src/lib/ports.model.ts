import { VideoElementRef } from '@plopdown/video-refs';
export enum PortNames {
  BrowserAction = 'BROWSER_ACTION',
  ContentScript = 'CONTENT_SCRIPT'
}

export interface Command<T, A> {
  command: T;
  args: A;
}

export type BrowserActionOpened = Command<'BA_OPENED', null>;
export type BrowserActionRefresh = Command<'BA_REFRESH', null>;
export type BrowserActionCommand = BrowserActionOpened | BrowserActionRefresh;

export type ContentScriptReady = Command<'CS_READY', null>;
export type ContentScriptVideosFound = Command<
  'CS_VIDEOS_FOUND',
  VideoElementRef[]
>;
export type ContentScriptCommand =
  | ContentScriptReady
  | ContentScriptVideosFound;

export type BackgroundVideoRefsFound = Command<
  'BG_VIDEOS_FOUND',
  VideoElementRef[]
>;
export type BackgroundFindVideos = Command<'BG_FIND_VIDEOS', null>;
export type BackgroundCommand = BackgroundVideoRefsFound | BackgroundFindVideos;
