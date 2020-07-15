export enum Source {
  Website = 'WEBSITE',
  ContentScript = 'CONTENT_SCRIPT',
}

export interface Command<T = string, A = null | any[]> {
  source?: Source;
  command: T;
  args: A;
}
