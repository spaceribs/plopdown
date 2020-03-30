import { MessagesService } from './../messages.service';
import { LoggerService } from '@plopdown/logger';
import { Injectable } from '@angular/core';
import {
  BrowserActionCommand,
  BrowserActionQueryVideoRefs
} from './browser-action.model';
import { PortSubscriber } from '../subscriber.abstract';
import { MessagesModule } from '../messages.module';
import { Source } from '../messages.model';

@Injectable({
  providedIn: MessagesModule
})
export class BrowserActionSubService extends PortSubscriber<
  BrowserActionCommand
> {
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.BrowserAction, messages, logger);
  }

  public getQueryVideoRefs() {
    return super.filterCommand<BrowserActionQueryVideoRefs>(
      'BA_QUERY_VIDEOREFS'
    );
  }
}
