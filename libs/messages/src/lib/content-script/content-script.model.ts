import { Command } from '../messages.model';
import { VideoElementRef } from '@plopdown/video-refs';

export type ContentScriptReady = Command<'CS_READY'>;
export type ContentScriptVideosFound = Command<
  'CS_VIDEOS_FOUND',
  VideoElementRef[]
>;
export type ContentScriptCommand =
  | ContentScriptReady
  | ContentScriptVideosFound;

type FrameIdMap = Map<number, browser.runtime.Port>;
export type TabIdMap = Map<number, FrameIdMap>;
