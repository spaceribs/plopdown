import { TRACK_TOKEN, VIDEO_ELEM_TOKEN } from '@plopdown/tokens';
import { LoggerService } from '@plopdown/logger';
import { Track, SavedTrack } from '@plopdown/tracks';
import { bounceIn } from 'ng-animate';
import {
  Observable,
  Subject,
  combineLatest,
  BehaviorSubject,
  merge,
  fromEvent,
  of
} from 'rxjs';
import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import {
  map,
  switchMap,
  tap,
  shareReplay,
  startWith,
  distinctUntilChanged
} from 'rxjs/operators';
import {
  trigger,
  transition,
  useAnimation,
  sequence,
  style,
  animate
} from '@angular/animations';
import { Cue } from '@plopdown/plopdown-cues';

@Component({
  selector: 'plopdown-video-overlay',
  templateUrl: './video-overlay.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./video-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('videoOutline', [
      transition(
        'void => *',
        sequence([
          style({
            'box-shadow': 'inset 0 0 0 3px lightgreen',
            'background-color': 'rgb(144, 238, 144, 0.2)'
          }),
          useAnimation(bounceIn, {
            params: { timing: 0.4 }
          }),
          animate(
            '1s',
            style({
              'box-shadow': 'inset 0 0 0 3px transparent',
              'background-color': 'transparent'
            })
          )
        ])
      )
    ])
  ]
})
export class VideoOverlayComponent {
  private manualReposition$: Subject<void> = new BehaviorSubject(null);

  public cues$: Observable<Cue[]>;
  public styles$: Observable<{ overlay: object; stage: object }>;
  public editMode$: Observable<boolean>;

  @Output() public remove: EventEmitter<void> = new EventEmitter();

  constructor(
    cd: ChangeDetectorRef,
    private logger: LoggerService,
    @Inject(VIDEO_ELEM_TOKEN) videoElem: HTMLVideoElement,
    @Inject(TRACK_TOKEN) plopTrack: SavedTrack
  ) {
    const metadataTrack$ = combineLatest([of(videoElem), of(plopTrack)]).pipe(
      switchMap(([elem, track]) => {
        return new Observable<TextTrack>(observer => {
          const metadataTrack: TextTrack = elem.addTextTrack(
            'metadata',
            track._id,
            track.language
          );
          try {
            this.bindCues(metadataTrack, track);
          } catch (err) {
            observer.error(err);
          }
          metadataTrack.mode = 'showing';
          observer.next(metadataTrack);

          return () => {
            metadataTrack.mode = 'disabled';
          };
        });
      }),
      shareReplay(1)
    );

    this.cues$ = metadataTrack$.pipe(
      switchMap(track => {
        return fromEvent(track, 'cuechange').pipe(
          startWith(track),
          map(() => {
            return track.activeCues;
          })
        );
      }),
      map(cueList => {
        return this.cueListToArray(cueList);
      }),
      shareReplay(1),
      tap(_ => {
        setTimeout(() => {
          cd.detectChanges();
        }, 0);
      })
    );

    const positionOverlay$ = of(videoElem).pipe(
      switchMap(elem => {
        return merge(
          this.manualReposition$.asObservable(),
          fromEvent(elem, 'play'),
          fromEvent(elem, 'load'),
          fromEvent(elem, 'resize'),
          fromEvent(elem, 'mousemove')
        ).pipe(map(() => elem));
      }),
      tap(console.log),
      shareReplay(1)
    );

    const aspectRatio$ = positionOverlay$.pipe(
      map(elem => {
        return elem.videoWidth / elem.videoHeight;
      })
    );

    const letterboxedWidth$ = combineLatest([
      positionOverlay$,
      aspectRatio$
    ]).pipe(
      map(([elem, aspectRatio]) => {
        if (elem.offsetWidth <= elem.offsetHeight * aspectRatio) {
          return elem.offsetWidth;
        }
        return elem.offsetHeight * aspectRatio;
      })
    );

    const letterboxedHeight$ = combineLatest([
      positionOverlay$,
      aspectRatio$
    ]).pipe(
      map(([elem, aspectRatio]) => {
        if (elem.offsetWidth <= elem.offsetHeight * aspectRatio) {
          return elem.offsetWidth / aspectRatio;
        }
        return elem.offsetHeight;
      })
    );

    const fontSize$ = positionOverlay$.pipe(
      map(elem => {
        return elem.offsetHeight / 44;
      })
    );

    const overlayStyle$ = combineLatest([positionOverlay$, fontSize$]).pipe(
      map(([elem, fontSize]) => {
        return {
          'width.px': elem.offsetWidth,
          'height.px': elem.offsetHeight,
          'left.px': elem.offsetLeft,
          'top.px': elem.offsetTop,
          'font-size.px': fontSize
        };
      })
    );

    const stageStyle$ = combineLatest([
      letterboxedWidth$,
      letterboxedHeight$
    ]).pipe(
      map(([width, height]) => {
        return {
          'width.px': width,
          'height.px': height
        };
      })
    );

    this.styles$ = combineLatest([overlayStyle$, stageStyle$]).pipe(
      map(([overlay, stage]) => {
        return { overlay, stage };
      }),
      tap(() =>
        setTimeout(() => {
          cd.detectChanges();
        }, 10)
      )
    );
  }

  public removeOverlay() {
    this.remove.emit();
  }

  private bindCues(metadataTrack: TextTrack, storedTrack: Track) {
    storedTrack.cues.forEach(cue => {
      const trackCue = new VTTCue(
        cue.startTime,
        cue.endTime,
        JSON.stringify(cue.data)
      );
      if (cue.id) {
        trackCue.id = cue.id;
      }
      metadataTrack.addCue(trackCue);
    });
  }

  private cueListToArray(cueList: TextTrackCueList): Cue[] {
    const cues: Cue[] = [];

    for (let index = 0; index < cueList.length; index++) {
      const raw_cue = cueList[index];

      let id = raw_cue.id;
      if (raw_cue.id.length < 1) {
        id = index.toString();
      }

      let data: null | Cue['data'] = null;
      try {
        data = JSON.parse(raw_cue.text);
      } catch (err) {
        this.logger.error('Could not parse Cue JSON', err);
      }

      cues.push({
        startTime: raw_cue.startTime,
        endTime: raw_cue.endTime,
        id,
        data
      });
    }

    return cues;
  }
}
