import { Command } from '../messages.model';

export type BrowserActionOpened = Command<'BA_OPENED'>;
export type BrowserActionRefreshed = Command<'BA_REFRESHED'>;
export type BrowserActionCommand = BrowserActionOpened | BrowserActionRefreshed;
