import { Observable } from 'rxjs';
import { EditModeService } from './../edit-mode.service';
import { Input } from '@angular/core';
import { PlopdownCue } from './plopdown-cue.model';

export abstract class PlopdownBaseComponent<T extends PlopdownCue['data']> {
  @Input() public startTime: PlopdownCue['startTime'];
  @Input() public endTime: PlopdownCue['endTime'];
  @Input() public id?: PlopdownCue['id'];
  @Input() public data: T;

  public editModeEnabled$: Observable<boolean>;

  constructor(editMode: EditModeService) {
    this.editModeEnabled$ = editMode.getEditModeEnabled();
  }
}
