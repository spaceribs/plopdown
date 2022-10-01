import { LoggerService } from '@plopdown/logger';
import { DevtoolCommand } from './devtool.model';
import { Injectable } from '@angular/core';
import { PortPublisher } from '../publisher.abstract';
import { Source } from '../messages.model';
import { MessagesModule } from '../messages.module';
import { MessagesService } from '../messages.service';

@Injectable({
  providedIn: MessagesModule,
})
export class DevtoolPubService extends PortPublisher<DevtoolCommand> {
  constructor(messages: MessagesService, logger: LoggerService) {
    super(Source.Devtool, messages, logger);
  }

  public getDevRefs() {
    this.command$.next({ command: 'DT_GET_DEV_REFS', args: null });
  }

  public playVideo() {
    this.command$.next({ command: 'DT_VIDEO_PLAY', args: null });
  }

  public pauseVideo() {
    this.command$.next({ command: 'DT_VIDEO_PAUSE', args: null });
  }

  public rewindVideo(seconds: number) {
    this.command$.next({ command: 'DT_VIDEO_REWIND', args: [seconds] });
  }

  public fastForwardVideo(seconds: number) {
    this.command$.next({ command: 'DT_VIDEO_FAST_FORWARD', args: [seconds] });
  }

  public gotoVideoStart() {
    this.command$.next({ command: 'DT_VIDEO_GOTO_START', args: null });
  }

  public gotoVideoEnd() {
    this.command$.next({ command: 'DT_VIDEO_GOTO_END', args: null });
  }
}
