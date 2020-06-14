export enum AudioEditType {
  Still = 'STILL',
  Skip = 'SKIP',
  Pause = 'PAUSE',
  Volume = 'VOLUME',
}

export interface SkipAudio {
  type: AudioEditType.Skip;
  startTime: number;
  endTime: number;
}

export interface StillAudio {
  type: AudioEditType.Still;
  startTime: number;
  duration: number;
}

export interface PauseAudio {
  type: AudioEditType.Pause;
  startTime: number;
  duration: number;
}

export interface AdjustVolumeAudio {
  type: AudioEditType.Volume;
  startTime: number;
  endTime: number;
  audio: number;
  video: number;
}

export type AudioEdit = SkipAudio | StillAudio | PauseAudio | AdjustVolumeAudio;

export interface AudioEditCue {
  startTime: number;
  endTime: number;
  data: AudioEdit;
}
