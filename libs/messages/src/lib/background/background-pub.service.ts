import { SavedTrack } from '@plopdown/tracks';
import { TabsService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { BackgroundCommand } from './background.model';
import { MessagesService } from '../messages.service';
import { LoggerService } from '@plopdown/logger';
import { Source } from '../messages.model';
import { PortPublisher } from '../publisher.abstract';
import { MessagesModule } from '../messages.module';
import { VideoRef, SavedVideoRef } from '@plopdown/video-refs';

@Injectable({
  providedIn: MessagesModule
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

  public findVideos() {
    this.command$.next({ command: 'BG_FIND_VIDEOS', args: null });
  }

  public contentFound(videoRefs: VideoRef[], iframes: string[]) {
    this.command$.next({
      command: 'BG_CONTENT_FOUND',
      args: [videoRefs, iframes]
    });
  }

  public trackFound(track: SavedTrack) {
    this.command$.next({
      command: 'BG_TRACK_FOUND',
      args: [track]
    });
  }

  public videoRefsFound(videoRefs: SavedVideoRef[]) {
    this.command$.next({
      command: 'BG_VIDEO_REFS_FOUND',
      args: [videoRefs]
    });
  }
}
