import { Injectable } from '@angular/core';
import {
  Observable,
  EMPTY,
  Subject,
  ReplaySubject,
  fromEvent,
  merge,
  BehaviorSubject,
} from 'rxjs';
import { AudioEdit } from './audio-edits.model';
import { switchMap, map, startWith, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AudioEditsService {
  private audioElem$: Subject<HTMLAudioElement> = new ReplaySubject(1);
  private edits$: Subject<AudioEdit[]> = new BehaviorSubject([]);

  public setAudioElem(audioElem: HTMLAudioElement) {
    this.audioElem$.next(audioElem);
  }

  public setEdits(audioEdits: AudioEdit[]) {
    this.edits$.next(audioEdits);
  }

  public getEdits() {
    return this.edits$.asObservable();
  }

  constructor() {}

  public getEditTime() {
    const audioMetaTrack$ = this.audioElem$.pipe(
      switchMap((audio) => {
        return new Observable<TextTrack>((observer) => {
          const audioMetadata = audio.addTextTrack('metadata');
          audioMetadata.mode = 'showing';

          observer.next(audioMetadata);

          return () => {
            audioMetadata.mode = 'disabled';
          };
        });
      })
    );

    return audioMetaTrack$.pipe(
      withLatestFrom(this.edits$),
      switchMap(([track, edits]) => {
        if (edits == null) {
          return EMPTY;
        }

        edits.forEach((edit) => {
          const cue = new VTTCue(
            edit['startTime'],
            edit['endTime'] || edit['startTime'],
            JSON.stringify(edit)
          );
          track.addCue(cue);
        });

        return merge(fromEvent<TextTrackCueList>(track, 'cuechange')).pipe(
          startWith(track.activeCues),
          withLatestFrom(this.audioElem$),
          map(([_, audioElem]) => {
            return audioElem.currentTime;
          })
        );
      })
    );
  }
}
