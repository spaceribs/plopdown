import { LoggerService } from '@plopdown/logger';
import { MessagesService } from '../messages.service';
import { Injectable } from '@angular/core';
import {
  BackgroundCommand,
  BackgroundGetDevRefs,
  BackgroundPublishStatus,
  BackgroundTracksFound,
  BackgroundVideoRefsFound,
  BackgroundVideoRefAdded,
  BackgroundDevRefsFound,
} from './background.model';
import { PortSubscriber } from '../subscriber.abstract';
import { MessagesModule } from '../messages.module';
import { Source } from '../messages.model';

@Injectable({
  providedIn: MessagesModule,
})
export class BackgroundSubService extends PortSubscriber<BackgroundCommand> {
  constructor(ports: MessagesService, logger: LoggerService) {
    super(Source.Background, ports, logger);
  }
  public getDevRefs() {
    return super.filterCommand<BackgroundGetDevRefs>('BG_GET_DEV_REFS');
  }
  public devRefsFound() {
    return super.filterCommand<BackgroundDevRefsFound>('BG_DEV_REFS_FOUND');
  }
  public getTracksFound() {
    return super.filterCommand<BackgroundTracksFound>('BG_TRACKS_FOUND');
  }
  public getVideoRefsFound() {
    return super.filterCommand<BackgroundVideoRefsFound>('BG_VIDEO_REFS_FOUND');
  }
  public getVideoRefAdded() {
    return super.filterCommand<BackgroundVideoRefAdded>('BG_VIDEO_REF_ADDED');
  }
  public getStatus() {
    return super.filterCommand<BackgroundPublishStatus>('BG_STATUS');
  }
}
