import { Observable } from 'rxjs';
import { Input, HostBinding } from '@angular/core';
import { PlopdownCue } from './plopdown-cue.model';

export abstract class PlopdownBaseComponent<T extends PlopdownCue['data']> {
  @Input() public startTime: PlopdownCue['startTime'];
  @Input() public endTime: PlopdownCue['endTime'];
  @Input() public id?: PlopdownCue['id'];
  @Input() public data: T;

  @HostBinding('attr.aria-atomic') public ariaAtomic = true;

  public editModeEnabled$: Observable<boolean>;
}
