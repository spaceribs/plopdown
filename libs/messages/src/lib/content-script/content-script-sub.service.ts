import { LoggerService } from '@plopdown/logger';
import {
  ContentScriptCommand,
  ContentScriptReady,
  ContentScriptVideoRefsRequested,
  ContentScriptTracksRequested,
  ContentScriptAddVideoRef,
} from './content-script.model';
import { Injectable } from '@angular/core';
import { PortSubscriber } from '../subscriber.abstract';
import { MessagesModule } from '../messages.module';
import { Source } from '../messages.model';
import { MessagesService } from '../messages.service';

@Injectable({
  providedIn: MessagesModule,
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

  public onTracksRequested() {
    return this.filterCommand<ContentScriptTracksRequested>(
      'CS_TRACKS_REQUESTED'
    );
  }

  public onVideoRefsRequested() {
    return this.filterCommand<ContentScriptVideoRefsRequested>(
      'CS_VIDEO_REFS_REQUESTED'
    );
  }

  public onAddVideoRef() {
    return this.filterCommand<ContentScriptAddVideoRef>('CS_ADD_VIDEO_REF');
  }
}
