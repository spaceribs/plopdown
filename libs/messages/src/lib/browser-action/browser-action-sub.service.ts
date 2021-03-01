import { MessagesService } from './../messages.service';
import { LoggerService } from '@plopdown/logger';
import { Injectable } from '@angular/core';
import {
  BrowserActionCommand,
  BrowserActionQueryStatus,
} from './browser-action.model';
import { PortSubscriber } from '../subscriber.abstract';
import { MessagesModule } from '../messages.module';
import { Source } from '../messages.model';

@Injectable({
  providedIn: MessagesModule,
})
export class BrowserActionSubService extends PortSubscriber<
  BrowserActionCommand
> {
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.BrowserAction, messages, logger);
  }

  public getQueryStatus() {
    return super.filterCommand<BrowserActionQueryStatus>('BA_QUERY_STATUS');
  }
}
