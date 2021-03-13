import { Input, HostBinding, Injectable } from '@angular/core';
import { Cue } from './plopdown-cue.model';

@Injectable()
export abstract class PlopdownBaseComponent<T extends Cue['data']> {
  @Input() public startTime: Cue['startTime'] = 0;
  @Input() public endTime: Cue['endTime'] = 0;
  @Input() public id?: Cue['id'];
  @Input() public data?: T;
  @Input() public videoElem: HTMLVideoElement = document.createElement('video');
  @Input() public files: Map<string, string> | null = null;

  @HostBinding('attr.aria-atomic') public ariaAtomic = true;

  abstract color: string;

  abstract textPreview(data?: T): string;
}
