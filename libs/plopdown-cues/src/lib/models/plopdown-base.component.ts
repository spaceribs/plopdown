import { Observable } from 'rxjs';
import { Input, HostBinding } from '@angular/core';
import { Cue } from './plopdown-cue.model';

export abstract class PlopdownBaseComponent<T extends Cue['data']> {
  @Input() public startTime: Cue['startTime'];
  @Input() public endTime: Cue['endTime'];
  @Input() public id?: Cue['id'];
  @Input() public data: T;

  @HostBinding('attr.aria-atomic') public ariaAtomic = true;

  public editModeEnabled$: Observable<boolean>;
}
