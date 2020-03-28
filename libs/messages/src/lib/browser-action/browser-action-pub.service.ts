import { LoggerService } from '@plopdown/logger';
import { MessagesService } from '../messages.service';
import { Injectable } from '@angular/core';
import { Source } from '../messages.model';
import { BrowserActionCommand } from './browser-action.model';
import { PortPublisher } from '../publisher.abstract';
import { MessagesModule } from '../messages.module';

@Injectable({
  providedIn: MessagesModule
})
export class BrowserActionPubService extends PortPublisher<
  BrowserActionCommand
> {
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.BrowserAction, messages, logger);
  }

  public opened() {
    this.command$.next({ command: 'BA_OPENED', args: null });
  }

  public refreshed() {
    this.command$.next({ command: 'BA_REFRESHED', args: null });
  }
}
