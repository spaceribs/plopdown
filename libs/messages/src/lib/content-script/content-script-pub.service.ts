import { LoggerService } from '@plopdown/logger';
import { ContentScriptCommand } from './content-script.model';
import { Injectable } from '@angular/core';
import { PortPublisher } from '../publisher.abstract';
import { Source } from '../messages.model';
import { MessagesModule } from '../messages.module';
import { MessagesService } from '../messages.service';
import { UnsavedVideoRef, VideoRef } from '@plopdown/video-refs';

@Injectable({
  providedIn: MessagesModule,
})
export class ContentScriptPubService extends PortPublisher<ContentScriptCommand> {
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.ContentScript, messages, logger);
  }

  public ready() {
    this.command$.next({ command: 'CS_READY', args: null });
  }

  public plopdownsAttached(devRefs: UnsavedVideoRef[]) {
    this.command$.next({
      command: 'CS_DEV_REFS',
      args: [devRefs],
    });
  }

  public getTracks() {
    this.command$.next({ command: 'CS_TRACKS_REQUESTED', args: null });
  }

  public getVideoRefs() {
    this.command$.next({ command: 'CS_VIDEO_REFS_REQUESTED', args: null });
  }

  public createTrack(videoRef: VideoRef) {
    this.command$.next({ command: 'CS_CREATE_TRACK', args: [videoRef] });
  }
}
