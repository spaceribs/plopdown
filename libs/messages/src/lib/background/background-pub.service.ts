import { TabsService } from '@plopdown/browser-ref';
import { VideoElementRef } from '@plopdown/video-refs';
import { Injectable } from '@angular/core';
import { BackgroundCommand } from './background.model';
import { MessagesService } from '../messages.service';
import { LoggerService } from '@plopdown/logger';
import { Source } from '../messages.model';
import { PortPublisher } from '../publisher.abstract';
import { MessagesModule } from '../messages.module';

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

  public contentFound(videoRefs: VideoElementRef[], iframes: string[]) {
    this.command$.next({
      command: 'BG_CONTENT_FOUND',
      args: [videoRefs, iframes]
    });
  }
}
