import { LoggerService } from '@plopdown/logger';
import { WebsiteCommand, WebsiteReady } from './website.model';
import { Injectable } from '@angular/core';
import { PortSubscriber } from '../subscriber.abstract';
import { WindowRefModule } from '../../window-ref.module';
import { WebMessagesService } from '../web-messages.service';
import { Source } from '../web-messages.model';

@Injectable({
  providedIn: WindowRefModule,
})
export class WebsiteWebSubService extends PortSubscriber<WebsiteCommand> {
  constructor(messages: WebMessagesService, logger: LoggerService) {
    super(Source.Website, messages, logger);
  }

  public onReady() {
    return this.filterCommand<WebsiteReady>('WEB_READY');
  }
}
