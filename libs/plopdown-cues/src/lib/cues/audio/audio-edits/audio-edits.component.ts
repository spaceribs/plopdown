import { Component, Input, AfterViewInit } from '@angular/core';
import { Observable, EMPTY, ReplaySubject, Subject, fromEvent } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AudioEdit, AudioEditCue } from './audio-edits.model';

@Component({
  selector: 'plopdown-audio-edits',
  template: ``,
  styleUrls: ['./audio-edits.component.scss']
})
export class AudioEditsComponent implements AfterViewInit {
  @Input() edits: AudioEdit[];

  private audioElem$: Subject<HTMLAudioElement> = new ReplaySubject(1);
  @Input() set audioElem(elem: HTMLAudioElement) {
    this.audioElem$.next(elem);
  }

  private audioMetaTrack$: Observable<TextTrack>;
  private metaCueChange$: Observable<TextTrackCueList>;
  private metaCuesActive$: Observable<AudioEditCue[]>;

  constructor() {}

  ngAfterViewInit(): void {
    this.audioMetaTrack$ = this.audioElem$.pipe(
      switchMap(audioElem => {
        return new Observable<TextTrack>(observer => {
          const audioMetadata = audioElem.addTextTrack('metadata');
          audioMetadata.mode = 'showing';

          observer.next(audioMetadata);

          return () => {
            audioMetadata.mode = 'disabled';
          };
        });
      })
    );

    this.metaCueChange$ = this.audioMetaTrack$.pipe(
      switchMap(track => {
        if (this.edits == null) {
          return EMPTY;
        }

        this.edits.forEach(edit => {
          const cue = new VTTCue(
            edit['startTime'],
            edit['endTime'] || edit['startTime'],
            JSON.stringify(edit)
          );
          track.addCue(cue);
        });

        return fromEvent<TextTrackCueList>(track, 'cuechange').pipe(
          map(() => {
            return track.activeCues;
          })
        );
      })
    );

    this.metaCuesActive$ = this.metaCueChange$.pipe(
      map(cueList => {
        const activeCues: AudioEditCue[] = [];

        for (let index = 0; index < cueList.length; index++) {
          const rawCue = cueList[index];

          const cue: AudioEditCue = {
            startTime: rawCue.startTime,
            endTime: rawCue.endTime,
            data: JSON.parse(rawCue.text)
          };

          activeCues.push(cue);
        }

        return activeCues;
      })
    );

    this.metaCuesActive$.subscribe({
      next: activeCues => {
        console.log(activeCues);
      }
    });
  }
}
