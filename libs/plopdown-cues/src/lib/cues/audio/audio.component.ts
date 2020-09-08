import { EditSkipService } from './audio-edits/edit-skip.service';
import { AudioEditsService } from './audio-edits/audio-edits.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { LoggerService } from '@plopdown/logger';
import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  OnChanges,
  ErrorHandler,
} from '@angular/core';
import { PlopdownAudio } from './audio.model';
import { PlopdownBaseComponent } from '../../models/plopdown-base.component';
import {
  Observable,
  Subscription,
  fromEvent,
  merge,
  of,
  ReplaySubject,
  Subject,
  combineLatest,
} from 'rxjs';
import { mdiVolumeHigh, mdiVolumeOff, mdiAlert } from '@mdi/js';
import {
  map,
  distinctUntilChanged,
  filter,
  mapTo,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { TrackService } from '@plopdown/tracks';

@Component({
  selector: 'plopdown-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [AudioEditsService, EditSkipService],
})
export class AudioComponent extends PlopdownBaseComponent<PlopdownAudio>
  implements AfterViewInit, OnDestroy, OnChanges {
  public color = '#ffc09f';
  public audioMuted = false;
  public mdiVolumeHigh = mdiVolumeHigh;
  public mdiVolumeOff = mdiVolumeOff;
  public mdiAlert = mdiAlert;

  public progressStyle$: Observable<object>;
  public timeUpdate$: Observable<[number, number]>;
  public audioUrl$: Observable<SafeUrl | undefined>;
  public skipOffset$: Observable<number>;

  private videoNotPlaying$: Observable<null>;
  private videoPlaying$: Observable<null>;
  private syncOffset$: Observable<number>;
  private audioElem$: Subject<ElementRef<HTMLAudioElement>> = new ReplaySubject(
    1
  );
  private toggleMute$: Subject<void> = new Subject();
  private playAudio$: Subject<void> = new Subject();
  private pauseAudio$: Subject<void> = new Subject();
  private audioTimeUpdate$: Observable<Event>;

  private subs: Subscription = new Subscription();

  @ViewChild('audioElem')
  set audioElem(elem: ElementRef<HTMLAudioElement>) {
    if (elem != null) {
      this.audioElem$.next(elem);
    }
  }

  @HostBinding('style.top.%') public top: number;
  @HostBinding('style.left.%') public left: number;

  constructor(
    private logger: LoggerService,
    private sanitizer: DomSanitizer,
    private audioEdits: AudioEditsService,
    private editSkip: EditSkipService,
    private errorHandler: ErrorHandler,
    private trackService: TrackService
  ) {
    super();
    this.skipOffset$ = this.editSkip.getOffset().pipe(shareReplay(1));
  }

  ngOnChanges(): void {
    this.bindData();
  }

  ngAfterViewInit(): void {
    this.bindData();

    this.videoElem.pause();

    this.videoNotPlaying$ = merge(
      fromEvent(this.videoElem, 'suspend'),
      fromEvent(this.videoElem, 'stop'),
      fromEvent(this.videoElem, 'ended'),
      fromEvent(this.videoElem, 'stalled'),
      fromEvent(this.videoElem, 'pause')
    ).pipe(mapTo(null));

    const isPlaying$ = of(this.videoElem.paused).pipe(
      filter((paused) => !paused)
    );

    this.videoPlaying$ = merge(
      isPlaying$,
      fromEvent(this.videoElem, 'playing')
    ).pipe(mapTo(null));

    this.audioTimeUpdate$ = this.audioElem$.pipe(
      switchMap((elem) => {
        return fromEvent(elem.nativeElement, 'timeupdate');
      }),
      shareReplay(1)
    );

    this.progressStyle$ = this.audioTimeUpdate$.pipe(
      map((event) => {
        const currentTime = (event.target as HTMLAudioElement).currentTime;
        const duration = (event.target as HTMLAudioElement).duration;
        const radius = 45;
        const circumference = radius * 2 * Math.PI;
        const completed = currentTime / duration;

        return {
          'stroke-dasharray': `${circumference * completed}% ${circumference}%`,
        };
      })
    );

    const audioElemSub = this.audioElem$.subscribe({
      error: (err) => this.errorHandler.handleError(err),
      next: (elem) => {
        this.audioEdits.setAudioElem(elem.nativeElement);
      },
    });
    this.subs.add(audioElemSub);

    this.timeUpdate$ = merge(
      this.audioTimeUpdate$,
      fromEvent(this.videoElem, 'timeupdate')
    ).pipe(
      switchMap(() => {
        return combineLatest([this.audioElem$, this.skipOffset$]);
      }),
      map(([elem, skipOffset]) => {
        return [
          elem.nativeElement.currentTime - skipOffset,
          this.videoElem.currentTime,
        ];
      })
    );

    this.syncOffset$ = this.timeUpdate$.pipe(
      map(([audioTime, videoTime]) => {
        const offsetTime = this.startTime + audioTime;
        return Math.round((videoTime - offsetTime) * 1000);
      }),
      distinctUntilChanged(),
      filter((offset) => offset > 150 || offset < -150)
    );

    const syncSub = combineLatest([
      this.syncOffset$,
      this.audioElem$,
    ]).subscribe({
      next: ([offset, elem]) => {
        const currentMS = elem.nativeElement.currentTime * 1000;
        elem.nativeElement.currentTime = (currentMS + offset) / 1000;
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(syncSub);

    const stopSub = merge(this.videoNotPlaying$, this.pauseAudio$)
      .pipe(
        switchMap(() => {
          return this.audioElem$;
        })
      )
      .subscribe({
        next: (elem) => {
          elem.nativeElement.pause();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(stopSub);

    const playSub = merge(this.videoPlaying$, this.playAudio$)
      .pipe(
        switchMap(() => {
          return this.audioElem$;
        })
      )
      .subscribe({
        next: (elem) => {
          elem.nativeElement.play();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(playSub);

    const toggleMuteSub = this.toggleMute$
      .pipe(
        switchMap(() => {
          return this.audioElem$;
        })
      )
      .subscribe({
        error: (err) => this.errorHandler.handleError(err),
        next: (elem) => {
          elem.nativeElement.muted = !elem.nativeElement.muted;
          this.audioMuted = elem.nativeElement.muted;
        },
      });
    this.subs.add(toggleMuteSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleMute(event: Event) {
    event.preventDefault();
    this.toggleMute$.next();
  }

  audioLoaded() {
    this.videoElem.play();
  }

  playAudio() {
    this.playAudio$.next();
  }

  pauseAudio() {
    this.pauseAudio$.next();
  }

  textPreview(data = this.data): string {
    return `Audio - ${data?.title}`;
  }

  private bindData() {
    if (this.data != null) {
      this.top = this.data.top;
      this.left = this.data.left;

      if (this.data.edits && this.data.edits.length > 0) {
        this.audioEdits.setEdits(this.data.edits);
      } else {
        this.audioEdits.setEdits([]);
      }

      this.audioUrl$ = combineLatest([
        this.trackService.getTrackFiles(),
        of(this.data.url),
      ]).pipe(
        map(([files, name]) => {
          const blobUrl = files.get(name);
          if (blobUrl != null) {
            return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
          }
        })
      );
    }
  }
}
