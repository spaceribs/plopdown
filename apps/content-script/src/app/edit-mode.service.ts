import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  private editModeEnabled$: Subject<boolean> = new BehaviorSubject(true);

  constructor() {}

  public setEditMode(editing: boolean) {
    this.editModeEnabled$.next(editing);
  }

  public getEditModeEnabled(): Observable<boolean> {
    return this.editModeEnabled$.asObservable();
  }
}
