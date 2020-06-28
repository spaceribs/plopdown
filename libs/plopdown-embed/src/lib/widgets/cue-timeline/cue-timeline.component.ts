import { number } from '@storybook/addon-knobs';
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
} from '@angular/core';
import { SavedTrack } from '@plopdown/tracks';
import {
  trigger,
  transition,
  sequence,
  useAnimation,
} from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import { map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { Cue } from '../../models/plopdown-cue.model';
import { PLOPDOWN_TEMPLATES } from '../../models/plopdown-templates.model';

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
  private track$: Subject<SavedTrack> = new ReplaySubject(1);
  public cues$: Observable<Partial<Cue>[]>;

  private videoElem$: Subject<HTMLVideoElement> = new ReplaySubject(1);
  private timeUpdate$: Observable<HTMLVideoElement>;

  @Input() public set videoElem(elem: HTMLVideoElement) {
    this.videoElem$.next(elem);
  }

  @Input() public set track(track: SavedTrack) {
    this.track$.next(track);
  }
  @Input() public activeCues: Cue[];
  @Output() public goTo: EventEmitter<number> = new EventEmitter();
  @HostBinding('@infoFade') animate;
  @HostListener('click', ['$event']) preventBubbling(event: Event) {
    event.stopPropagation();
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.cues$ = this.track$.pipe(
      withLatestFrom(this.videoElem$),
      map(([track, videoElem]) => this.cues(track, videoElem)),
      shareReplay(1)
    );

    this.timeUpdate$ = this.videoElem$.pipe(
      switchMap((elem) => {
        return fromEvent(elem, 'timeupdate');
      }),
      map((event) => {
        return event.target as HTMLVideoElement;
      })
    );

    this.currentLeft$ = this.timeUpdate$.pipe(
      map((elem) => {
        return `${(elem.currentTime / elem.duration) * 100}%`;
      }),
      shareReplay(1)
    );
  }

  public goToCue(event: Event, startTime: number) {
    event.preventDefault();
    this.goTo.emit(startTime);
  }

  private cues(track: SavedTrack, videoElem: HTMLVideoElement): Partial<Cue>[] {
    const duration = videoElem.duration;

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
    return (
      this.activeCues.find((activeCue) => {
        return activeCue.id === cue.id;
      }) != null
    );
  }
}
