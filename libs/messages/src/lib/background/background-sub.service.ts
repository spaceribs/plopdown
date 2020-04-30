import { LoggerService } from '@plopdown/logger';
import { MessagesService } from '../messages.service';
import { Injectable } from '@angular/core';
import {
  BackgroundCommand,
  BackgroundFindVideos,
  BackgroundContentFound,
  BackgroundCheckAlive,
  BackgroundTrackFound,
  BackgroundVideoRefFound
} from './background.model';
import { PortSubscriber } from '../subscriber.abstract';
import { MessagesModule } from '../messages.module';
import { Source } from '../messages.model';

@Injectable({
  providedIn: MessagesModule
})
export class BackgroundSubService extends PortSubscriber<BackgroundCommand> {
  constructor(ports: MessagesService, logger: LoggerService) {
    super(Source.Background, ports, logger);
  }
  public getCheckAlive() {
    return super.filterCommand<BackgroundCheckAlive>('BG_CHECK_ALIVE');
  }
  public getFindVideos() {
    return super.filterCommand<BackgroundFindVideos>('BG_FIND_VIDEOS');
  }
  public getContentFound() {
    return super.filterCommand<BackgroundContentFound>('BG_CONTENT_FOUND');
  }
  public getTrackFound() {
    return super.filterCommand<BackgroundTrackFound>('BG_TRACK_FOUND');
  }
  public getVideoRefsFound() {
    return super.filterCommand<BackgroundVideoRefFound>('BG_VIDEO_REFS_FOUND');
  }
}
