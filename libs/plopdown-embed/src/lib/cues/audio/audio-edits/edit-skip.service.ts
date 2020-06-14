import { AudioEditsService } from './audio-edits.service';
import { map, startWith } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { AudioEdit, SkipAudio, AudioEditType } from './audio-edits.model';

@Injectable()
export class EditSkipService {
  private skipEdits$: Observable<SkipAudio[]>;
  private skipOffset$: Observable<number>;

  constructor(audioEdits: AudioEditsService) {
    const editTime$ = audioEdits.getEditTime();
    const edits$ = audioEdits.getEdits();

    this.skipEdits$ = edits$.pipe(
      map((edits) => {
        return edits.filter(this.isSkipEdit);
      })
    );

    this.skipOffset$ = combineLatest([editTime$, this.skipEdits$]).pipe(
      map(([currentTime, skips]) => {
        const activatedSkips = skips.filter((skip) => {
          return currentTime > skip.startTime;
        });

        return activatedSkips.reduce((memo, activeSkip) => {
          const diff = activeSkip.endTime - activeSkip.startTime;
          return diff + memo;
        }, 0);
      })
    );
  }

  public getOffset() {
    return this.skipOffset$;
  }

  private isSkipEdit(edit: AudioEdit): edit is SkipAudio {
    return edit.type === AudioEditType.Skip;
  }
}
