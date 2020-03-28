import {
  ContentScriptCommand,
  ContentScriptReady,
  ContentScriptVideosFound
} from './content-script.model';
import { Injectable } from '@angular/core';
import { PortSubscriber } from '../subscriber.abstract';
import { MessagesModule } from '../messages.module';
import { Source } from '../messages.model';
import { MessagesService } from '../messages.service';

@Injectable({
  providedIn: MessagesModule
})
export class ContentScriptSubService extends PortSubscriber<
  ContentScriptCommand
> {
  constructor(messages: MessagesService) {
    super(Source.ContentScript, messages);
  }

  public onReady() {
    return this.filterCommand<ContentScriptReady>('CS_READY');
  }

  public onVideosFound() {
    return this.filterCommand<ContentScriptVideosFound>('CS_VIDEOS_FOUND');
  }
}
