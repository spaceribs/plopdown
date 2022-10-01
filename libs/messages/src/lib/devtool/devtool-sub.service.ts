import { LoggerService } from '@plopdown/logger';
import {
  DevtoolCommand,
  DevtoolGetDevRefs,
  DevtoolVideoPlay,
  DevtoolVideoPause,
  DevtoolVideoRewind,
  DevtoolVideoFastForward,
  DevtoolVideoGotoStart,
  DevtoolVideoGotoEnd,
} from './devtool.model';
import { Injectable } from '@angular/core';
import { PortSubscriber } from '../subscriber.abstract';
import { MessagesModule } from '../messages.module';
import { Source } from '../messages.model';
import { MessagesService } from '../messages.service';

@Injectable({
  providedIn: MessagesModule,
})
export class DevtoolSubService extends PortSubscriber<DevtoolCommand> {
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.Devtool, messages, logger);
  }

  public onGetDevRefs() {
    return this.filterCommand<DevtoolGetDevRefs>('DT_GET_DEV_REFS');
  }

  public onVideoPlay() {
    return this.filterCommand<DevtoolVideoPlay>('DT_VIDEO_PLAY');
  }

  public onVideoPause() {
    return this.filterCommand<DevtoolVideoPause>('DT_VIDEO_PAUSE');
  }

  public onVideoRewind() {
    return this.filterCommand<DevtoolVideoRewind>('DT_VIDEO_REWIND');
  }

  public onVideoFastForward() {
    return this.filterCommand<DevtoolVideoFastForward>('DT_VIDEO_FAST_FORWARD');
  }

  public onVideoGotoStart() {
    return this.filterCommand<DevtoolVideoGotoStart>('DT_VIDEO_GOTO_START');
  }

  public onVideoGotoEnd() {
    return this.filterCommand<DevtoolVideoGotoEnd>('DT_VIDEO_GOTO_END');
  }
}
