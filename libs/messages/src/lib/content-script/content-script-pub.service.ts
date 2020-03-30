import { VideoElementRef } from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import { ContentScriptCommand } from './content-script.model';
import { Injectable } from '@angular/core';
import { PortPublisher } from '../publisher.abstract';
import { Source } from '../messages.model';
import { MessagesModule } from '../messages.module';
import { MessagesService } from '../messages.service';

@Injectable({
  providedIn: MessagesModule
})
export class ContentScriptPubService extends PortPublisher<
  ContentScriptCommand
> {
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.ContentScript, messages, logger);
  }

  public ready() {
    this.command$.next({ command: 'CS_READY', args: null });
  }

  public videosFound(videoRefs: VideoElementRef[]) {
    this.command$.next({ command: 'CS_VIDEOS_FOUND', args: videoRefs });
  }

  public iframesFound(iframeUrls: string[]) {
    this.command$.next({ command: 'CS_IFRAMES_FOUND', args: iframeUrls });
  }
}
