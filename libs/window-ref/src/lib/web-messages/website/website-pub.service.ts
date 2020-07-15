import { LoggerService } from '@plopdown/logger';
import { WebsiteCommand } from './website.model';
import { Injectable } from '@angular/core';
import { PortPublisher } from '../publisher.abstract';
import { WindowRefModule } from '../../window-ref.module';
import { WebMessagesService } from '../web-messages.service';
import { Source } from '../web-messages.model';

@Injectable({
  providedIn: WindowRefModule,
})
export class WebsiteWebPubService extends PortPublisher<WebsiteCommand> {
  constructor(messages: WebMessagesService, logger: LoggerService) {
    super(Source.Website, messages, logger);
  }

  public ready() {
    this.command$.next({ command: 'WEB_READY', args: null });
  }
}
