export enum Source {
  Background = 'BACKGROUND',
  BrowserAction = 'BROWSER_ACTION',
  ContentScript = 'CONTENT_SCRIPT',
}

export interface Command<T = string, A = null | any[]>
  extends Record<string, unknown> {
  source?: Source;
  command: T;
  args: A;
}
