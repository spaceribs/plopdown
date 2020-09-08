import { Track } from '@plopdown/tracks';
import { Input, HostBinding, Injectable } from '@angular/core';
import { Cue } from './plopdown-cue.model';

@Injectable()
export abstract class PlopdownBaseComponent<T extends Cue['data']> {
  @Input() public startTime: Cue['startTime'];
  @Input() public endTime: Cue['endTime'];
  @Input() public id?: Cue['id'];
  @Input() public data?: T;
  @Input() public videoElem: HTMLVideoElement;

  @HostBinding('attr.aria-atomic') public ariaAtomic = true;

  abstract color: string;

  abstract textPreview(data?: T): string;
}
