import { LoggerService } from '@plopdown/logger';
import {
  ContentScriptCommand,
  ContentScriptReady,
  ContentScriptVideosFound,
  ContentScriptIFramesFound,
  ContentScriptTrackRequested
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
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.ContentScript, messages, logger);
  }

  public onReady() {
    return this.filterCommand<ContentScriptReady>('CS_READY');
  }

  public onVideosFound() {
    return this.filterCommand<ContentScriptVideosFound>('CS_VIDEOS_FOUND');
  }

  public onIFramesFound() {
    return this.filterCommand<ContentScriptIFramesFound>('CS_IFRAMES_FOUND');
  }

  public onTrackRequested() {
    return this.filterCommand<ContentScriptTrackRequested>(
      'CS_TRACK_REQUESTED'
    );
  }
}
