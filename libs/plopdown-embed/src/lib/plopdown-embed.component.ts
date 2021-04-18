import { WindowRefService } from '@plopdown/window-ref';
import { LoggerService } from '@plopdown/logger';
import { Track, TrackService } from '@plopdown/tracks';
import { bounceIn } from 'ng-animate';
import {
  Observable,
  Subject,
  combineLatest,
  BehaviorSubject,
  merge,
  fromEvent,
  Subscription,
  ReplaySubject,
  of,
} from 'rxjs';
import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ElementRef,
  Input,
  OnDestroy,
  ErrorHandler,
  OnInit,
} from '@angular/core';
import {
  map,
  switchMap,
  tap,
  shareReplay,
  startWith,
  mapTo,
  debounceTime,
  throttleTime,
  distinctUntilChanged,
  withLatestFrom,
} from 'rxjs/operators';
import {
  trigger,
  transition,
  useAnimation,
  sequence,
  style,
  animate,
  state,
} from '@angular/animations';
import { Cue } from '@plopdown/plopdown-cues';

@Component({
  selector: 'plopdown-embed',
  templateUrl: './plopdown-embed.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./plopdown-embed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          opacity: 0,
        })
      ),
      transition('in => out', [animate('2s')]),
      transition('out => in', [animate('0.2s')]),
    ]),
    trigger('videoOutline', [
      transition(
        'void => *',
        sequence([
          style({
            'box-shadow': 'inset 0 0 0 3px lightgreen',
            'background-color': 'rgb(144, 238, 144, 0.2)',
          }),
          useAnimation(bounceIn, {
            params: { timing: 0.4 },
          }),
          animate(
            '1s',
            style({
              'box-shadow': 'inset 0 0 0 3px transparent',
              'background-color': 'transparent',
            })
          ),
        ])
      ),
    ]),
  ],
  providers: [TrackService],
})
export class PlopdownEmbedComponent implements OnDestroy, OnInit {
  private manualReposition$: Subject<null> = new BehaviorSubject(null);

  public cues$: Observable<Cue[]>;
  public styles$: Observable<{
    wrapper: Record<string, unknown>;
    stage: Record<string, unknown>;
  }>;
  private subs: Subscription = new Subscription();

  private mouseMove$: Observable<Event>;
  public showControls$: Observable<boolean>;
  private goToTime$: Subject<number> = new Subject();
  public files$: Observable<Map<string, string>>;

  @Output() public remove: EventEmitter<void> = new EventEmitter();
  @Output() public trackChange: EventEmitter<Track | null> = new EventEmitter();
  @Output() public saveVideoRef: EventEmitter<Track> = new EventEmitter();

  public track$: Observable<Track | null>;
  @Input() public set track(track: Track | null) {
    this.trackService.setTrack(track);
  }

  private videoElem$: Subject<HTMLVideoElement> = new ReplaySubject(1);
  @Input() public set videoElem(videoElem: HTMLVideoElement) {
    this.videoElem$.next(videoElem);
  }

  @Input() public tracks: Track[] = [] as Track[];

  public trackAndVideoElem$: Observable<[Track | null, HTMLVideoElement]>;

  constructor(
    cd: ChangeDetectorRef,
    private logger: LoggerService,
    private errorHandler: ErrorHandler,
    private trackService: TrackService,
    windowRef: WindowRefService,
    elemRef: ElementRef
  ) {
    this.track$ = trackService.getTrack();
    this.files$ = trackService.getTrackFiles();

    this.mouseMove$ = merge(
      fromEvent(elemRef.nativeElement, 'mousemove'),
      this.videoElem$.pipe(
        switchMap((videoElem) => {
          return fromEvent(videoElem, 'mousemove');
        })
      )
    );

    const metadataTrack$ = combineLatest([this.videoElem$, this.track$]).pipe(
      switchMap(([elem, track]) => {
        if (track == null) {
          return of(null);
        }
        return new Observable<TextTrack>((observer) => {
          const metadataTrack: TextTrack = elem.addTextTrack(
            'metadata',
            track['_id'] || 'temporary',
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
      switchMap((track) => {
        if (track == null) {
          return of(null);
        }

        return fromEvent(track, 'cuechange').pipe(
          startWith(track),
          map(() => {
            return track.activeCues;
          })
        );
      }),
      map((cueList) => {
        if (cueList == null) {
          return [];
        }
        return this.cueListToArray(cueList);
      }),
      tap((_) => {
        setTimeout(() => {
          cd.detectChanges();
        }, 0);
      }),
      shareReplay(1)
    );

    const positionOverlay$ = this.videoElem$.pipe(
      switchMap((elem) => {
        return merge(
          this.manualReposition$.asObservable(),
          fromEvent(elem, 'play'),
          fromEvent(elem, 'load'),
          fromEvent(elem, 'resize'),
          fromEvent(elem, 'mousemove'),
          windowRef.getDocumentMutation()
        ).pipe(map(() => elem));
      }),
      shareReplay(1)
    );

    const aspectRatio$ = positionOverlay$.pipe(
      map((elem) => {
        return elem.videoWidth / elem.videoHeight;
      })
    );

    const letterboxedWidth$ = combineLatest([
      positionOverlay$,
      aspectRatio$,
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
      aspectRatio$,
    ]).pipe(
      map(([elem, aspectRatio]) => {
        if (elem.offsetWidth <= elem.offsetHeight * aspectRatio) {
          return elem.offsetWidth / aspectRatio;
        }
        return elem.offsetHeight;
      })
    );

    const fontSize$ = positionOverlay$.pipe(
      map((elem) => {
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
          'font-size.px': fontSize,
        };
      })
    );

    const stageStyle$ = combineLatest([
      letterboxedWidth$,
      letterboxedHeight$,
    ]).pipe(
      map(([width, height]) => {
        return {
          'width.px': width,
          'height.px': height,
        };
      })
    );

    this.styles$ = combineLatest([overlayStyle$, stageStyle$]).pipe(
      map(([wrapper, stage]) => {
        return { wrapper, stage };
      }),
      tap(() =>
        setTimeout(() => {
          cd.detectChanges();
        }, 10)
      )
    );

    this.showControls$ = this.mouseMove$.pipe(
      throttleTime(1000),
      switchMap(() => {
        return this.mouseMove$.pipe(
          debounceTime(2000),
          mapTo(false),
          startWith(true)
        );
      }),
      distinctUntilChanged(),
      tap(() => {
        setTimeout(() => {
          cd.detectChanges();
        }, 10);
      }),
      shareReplay(1)
    );

    this.trackAndVideoElem$ = combineLatest([this.track$, this.videoElem$]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const goToTimeSub = this.goToTime$
      .pipe(withLatestFrom(this.videoElem$))
      .subscribe({
        next: ([time, videoElem]) => {
          videoElem.currentTime = time;
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(goToTimeSub);
  }

  public removeStage() {
    this.remove.emit();
  }

  private bindCues(metadataTrack: TextTrack, storedTrack: Track) {
    storedTrack.cues.forEach((cue) => {
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
        data = JSON.parse((raw_cue as any).text);
      } catch (err) {
        this.logger.error('Could not parse Cue JSON', err);
      }

      if (data == null) {
        continue;
      }

      cues.push({
        startTime: raw_cue.startTime,
        endTime: raw_cue.endTime,
        id,
        data,
      });
    }

    return cues;
  }

  public goToTime(time: number) {
    this.goToTime$.next(time);
  }

  public getVideoElem$() {
    return this.videoElem$.asObservable();
  }
}
