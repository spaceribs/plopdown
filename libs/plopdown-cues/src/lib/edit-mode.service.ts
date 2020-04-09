import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { PlopdownCuesModule } from './plopdown-cues.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: PlopdownCuesModule
})
export class EditModeService {
  private editModeEnabled$: Subject<boolean> = new BehaviorSubject(false);

  constructor() {}

  public setEditMode(editing: boolean) {
    this.editModeEnabled$.next(editing);
  }

  public getEditModeEnabled(): Observable<boolean> {
    return this.editModeEnabled$.asObservable();
  }
}
