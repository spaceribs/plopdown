import { LoggerService } from '@plopdown/logger';
import {
  ContentScriptCommand,
  ContentScriptReady,
} from './content-script.model';
import { Injectable } from '@angular/core';
import { PortSubscriber } from '../subscriber.abstract';
import { WindowRefModule } from '../../window-ref.module';
import { WebMessagesService } from '../web-messages.service';
import { Source } from '../web-messages.model';

@Injectable({
  providedIn: WindowRefModule,
})
export class ContentScriptWebSubService extends PortSubscriber<
  ContentScriptCommand
> {
  constructor(messages: WebMessagesService, logger: LoggerService) {
    super(Source.ContentScript, messages, logger);
  }

  public onReady() {
    return this.filterCommand<ContentScriptReady>('CS_READY');
  }
}
