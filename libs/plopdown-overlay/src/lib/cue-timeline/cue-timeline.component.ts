import { Observable, Subject, ReplaySubject, fromEvent } from 'rxjs';
import {
  Component,
  Input,
  HostBinding,
  ComponentFactoryResolver,
  Injector,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit,
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
import { PLOPDOWN_TEMPLATES, Cue } from '@plopdown/plopdown-embed';
import { map, startWith, shareReplay } from 'rxjs/operators';

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
export class CueTimelineComponent implements OnInit {
  public currentLeft$: Observable<string>;
  private track$: Subject<SavedTrack> = new ReplaySubject(1);
  public cues$: Observable<object[]>;

  @Input() public videoElem: HTMLVideoElement;
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
      map((track) => this.cues(track)),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    this.currentLeft$ = fromEvent(this.videoElem, 'timeupdate').pipe(
      map((event) => {
        const elem = event.target as HTMLVideoElement;
        return `${(elem.currentTime / elem.duration) * 100}%`;
      }),
      startWith(
        `${(this.videoElem.currentTime / this.videoElem.duration) * 100}%`
      ),
      shareReplay(1)
    );
  }

  public goToCue(event: Event, startTime: number) {
    event.preventDefault();
    this.goTo.emit(startTime);
  }

  private cues(track: SavedTrack): object[] {
    const duration = this.videoElem.duration;

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

  cueActive(cue: Cue): boolean {
    return (
      this.activeCues.find((activeCue) => {
        return activeCue.id === cue.id;
      }) != null
    );
  }
}
