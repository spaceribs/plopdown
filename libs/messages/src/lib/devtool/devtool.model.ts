import { Command } from '../messages.model';

export type DevtoolGetDevRefs = Command<'DT_GET_DEV_REFS'>;

export type DevtoolVideoPlay = Command<'DT_VIDEO_PLAY'>;
export type DevtoolVideoPause = Command<'DT_VIDEO_PAUSE'>;
export type DevtoolVideoRewind = Command<'DT_VIDEO_REWIND', [number]>;
export type DevtoolVideoFastForward = Command<
  'DT_VIDEO_FAST_FORWARD',
  [number]
>;
export type DevtoolVideoGotoStart = Command<'DT_VIDEO_GOTO_START'>;
export type DevtoolVideoGotoEnd = Command<'DT_VIDEO_GOTO_END'>;

export type DevtoolCommand =
  | DevtoolGetDevRefs
  | DevtoolVideoPlay
  | DevtoolVideoPause
  | DevtoolVideoRewind
  | DevtoolVideoFastForward
  | DevtoolVideoGotoStart
  | DevtoolVideoGotoEnd;
