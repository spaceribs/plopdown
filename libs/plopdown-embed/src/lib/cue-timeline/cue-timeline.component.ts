import { Observable, Subject, ReplaySubject, fromEvent } from 'rxjs';
import {
  Component,
  Input,
  HostBinding,
  ComponentFactoryResolver,
  Injector,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Track } from '@plopdown/tracks';
import {
  trigger,
  transition,
  sequence,
  useAnimation,
} from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import {
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CuePreview } from './cue-timeline.model';
import { Cue, PLOPDOWN_TEMPLATES } from '@plopdown/plopdown-cues';

@Component({
  selector: 'plopdown-cue-timeline',
  templateUrl: './cue-timeline.component.html',
  styleUrls: ['./cue-timeline.component.scss'],
  animations: [
    trigger('infoFade', [
      transition(
        'void => *',
        sequence([
          useAnimation(fadeIn, {
            params: { timing: 0.2 },
          }),
        ])
      ),
      transition(
        '* => void',
        sequence([
          useAnimation(fadeOut, {
            params: { timing: 0.2 },
          }),
        ])
      ),
    ]),
  ],
})
export class CueTimelineComponent {
  public currentLeft$: Observable<string>;
  private track$: Subject<Track | null> = new ReplaySubject(1);
  public cues$: Observable<CuePreview[]>;

  private videoElem$: Subject<HTMLVideoElement> = new ReplaySubject(1);
  private timeUpdate$: Observable<HTMLVideoElement>;

  @Input() public set videoElem(elem: HTMLVideoElement) {
    this.videoElem$.next(elem);
  }

  @Input() public set track(track: Track | null) {
    this.track$.next(track);
  }
  @Input() public activeCues: Cue[] | null = null;
  @Output() public goTo: EventEmitter<number> = new EventEmitter();
  @HostBinding('@infoFade') animate = true;
  @HostListener('click', ['$event']) preventBubbling(event: Event) {
    event.stopPropagation();
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    cd: ChangeDetectorRef
  ) {
    this.cues$ = this.track$.pipe(
      withLatestFrom(this.videoElem$),
      map(([track, videoElem]) => this.cues(track, videoElem)),
      shareReplay(1)
    );

    this.timeUpdate$ = this.videoElem$.pipe(
      switchMap((elem) => {
        return fromEvent(elem, 'timeupdate').pipe(
          map((event) => {
            return event.target as HTMLVideoElement;
          }),
          startWith(elem)
        );
      })
    );

    this.currentLeft$ = this.timeUpdate$.pipe(
      map((elem) => {
        return `${(elem.currentTime / elem.duration) * 100}%`;
      }),
      debounceTime(100),
      shareReplay(1),
      tap(() => {
        setTimeout(() => {
          cd.detectChanges();
        }, 10);
      })
    );
  }

  public goToCue(event: Event, startTime?: number) {
    event.preventDefault();
    if (startTime != null) {
      this.goTo.emit(startTime);
    }
  }

  private cues(track: Track | null, videoElem: HTMLVideoElement): CuePreview[] {
    const duration = videoElem.duration;

    if (track == null) {
      return [];
    }

    return track.cues.map((cue) => {
      const left = (cue.startTime / duration) * 100;
      const right = 100 - (cue.endTime / duration) * 100;

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        PLOPDOWN_TEMPLATES[cue.data.type]
      );

      const component = componentFactory.create(this.injector).instance;

      return {
        style: {
          left: `${left}%`,
          right: `${right}%`,
          background: component.color,
        },
        type: cue.data.type,
        id: cue.id,
        text: component.textPreview(cue.data),
        startTime: cue.startTime,
      };
    });
  }

  cueActive(cue: Partial<Cue>): boolean {
    if (this.activeCues == null) {
      return false;
    }
    return (
      this.activeCues.find((activeCue) => {
        return activeCue.id === cue.id;
      }) != null
    );
  }
}
