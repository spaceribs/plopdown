export interface Cue {
  startTime: number;
  endTime: number;
  id?: string;
  data: PlopDown | PlopInfo;
}

export interface PlopIcon {
  top: number;
  left: number;
  size: number;
  rotate: number;
  emoji: string;
}

export interface PlopDown {
  type: 'PLOP';
  width: number;
  desc: string;
  icons: PlopIcon[];
  top: number;
  left: number;
}

export interface PlopInfo {
  type: 'INFO';
  title: string;
  authors: string[];
}
