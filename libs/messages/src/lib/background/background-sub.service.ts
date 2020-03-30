import { LoggerService } from '@plopdown/logger';
import { MessagesService } from '../messages.service';
import { Injectable } from '@angular/core';
import {
  BackgroundCommand,
  BackgroundFindVideos,
  BackgroundVideoRefsFound,
  BackgroundCheckAlive
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
    console.log('getContentFound');
    return super.filterCommand<BackgroundVideoRefsFound>('BG_CONTENT_FOUND');
  }
}
