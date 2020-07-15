import { Command } from '../web-messages.model';

export type WebsiteReady = Command<'WEB_READY'>;

export type WebsiteCommand = WebsiteReady;
