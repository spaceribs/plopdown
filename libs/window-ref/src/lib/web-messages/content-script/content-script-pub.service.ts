import { LoggerService } from '@plopdown/logger';
import { ContentScriptCommand } from './content-script.model';
import { Injectable } from '@angular/core';
import { PortPublisher } from '../publisher.abstract';
import { WindowRefModule } from '../../window-ref.module';
import { WebMessagesService } from '../web-messages.service';
import { Source } from '../web-messages.model';

@Injectable({
  providedIn: WindowRefModule,
})
export class ContentScriptWebPubService extends PortPublisher<
  ContentScriptCommand
> {
  constructor(messages: WebMessagesService, logger: LoggerService) {
    super(Source.ContentScript, messages, logger);
  }

  public ready() {
    this.command$.next({ command: 'CS_READY', args: null });
  }
}
