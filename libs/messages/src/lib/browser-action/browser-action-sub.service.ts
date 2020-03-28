import { MessagesService } from './../messages.service';
import { LoggerService } from '@plopdown/logger';
import { Injectable } from '@angular/core';
import {
  BrowserActionOpened,
  BrowserActionCommand,
  BrowserActionRefreshed
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
    super(Source.BrowserAction, messages);
  }

  public getOpened() {
    return super.filterCommand<BrowserActionOpened>('BA_OPENED');
  }

  public getRefreshed() {
    return super.filterCommand<BrowserActionRefreshed>('BA_REFRESHED');
  }
}
