import { Command } from '../web-messages.model';

export type ContentScriptReady = Command<'CS_READY'>;

export type ContentScriptCommand = ContentScriptReady;
