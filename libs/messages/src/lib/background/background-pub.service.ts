import { Track } from '@plopdown/tracks';
import { TabsService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { BackgroundCommand, BackgroundStatus } from './background.model';
import { MessagesService } from '../messages.service';
import { LoggerService } from '@plopdown/logger';
import { Source } from '../messages.model';
import { PortPublisher } from '../publisher.abstract';
import { MessagesModule } from '../messages.module';
import { VideoRef } from '@plopdown/video-refs';

@Injectable({
  providedIn: MessagesModule,
})
export class BackgroundPubService extends PortPublisher<BackgroundCommand> {
  constructor(
    messages: MessagesService,
    logger: LoggerService,
    tabs: TabsService
  ) {
    super(Source.Background, messages, logger, tabs);
  }

  public checkAlive() {
    this.command$.next({ command: 'BG_CHECK_ALIVE', args: null });
  }

  public publishStatus(status: BackgroundStatus) {
    this.command$.next({
      command: 'BG_STATUS',
      args: [status],
    });
  }

  public publishTracks(tracks: Track[]) {
    this.command$.next({
      command: 'BG_TRACKS_FOUND',
      args: [tracks],
    });
  }

  public publishVideoRefs(videoRefs: VideoRef[]) {
    this.command$.next({
      command: 'BG_VIDEO_REFS_FOUND',
      args: [videoRefs],
    });
  }

  public videoRefAdded(videoRef: VideoRef) {
    this.command$.next({
      command: 'BG_VIDEO_REF_ADDED',
      args: [videoRef],
    });
  }
}
