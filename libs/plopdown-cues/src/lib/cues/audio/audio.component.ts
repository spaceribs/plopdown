import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { LoggerService } from '@plopdown/logger';
import { VIDEO_ELEM_TOKEN, TRACK_FILES_TOKEN } from '@plopdown/tokens';
import {
  Component,
  Inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  HostBinding
} from '@angular/core';
import { PlopdownAudio } from './audio.model';
import { PlopdownBaseComponent } from '../../models/plopdown-base.component';
import { Observable, Subscription, fromEvent, merge, of, EMPTY } from 'rxjs';
import { mdiVolumeHigh, mdiVolumeOff, mdiAlert } from '@mdi/js';
import {
  map,
  distinctUntilChanged,
  filter,
  mapTo,
  shareReplay,
  switchMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'plopdown-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent extends PlopdownBaseComponent<PlopdownAudio>
  implements AfterViewInit, OnDestroy {
  public audioUrl: SafeUrl;
  public audioMuted = false;
  public mdiVolumeHigh = mdiVolumeHigh;
  public mdiVolumeOff = mdiVolumeOff;
  public mdiAlert = mdiAlert;
  public progressStyle$: Observable<object>;

  private videoNotPlaying$: Observable<void>;
  private videoPlaying$: Observable<void>;
  private timeUpdate$: Observable<[number, number]>;
  private syncOffset$: Observable<number>;

  private audioPlaying$: Observable<void>;
  private audioTimeUpdate$: Observable<Event>;
  private audioStopped$: Observable<void>;
  private audioStalled$: Observable<void>;

  private subs: Subscription = new Subscription();

  @ViewChild('audioElem') audioElem: ElementRef<HTMLAudioElement>;
  @HostBinding('style.top.%') top: number;
  @HostBinding('style.left.%') left: number;

  constructor(
    private logger: LoggerService,
    private sanitizer: DomSanitizer,
    @Inject(VIDEO_ELEM_TOKEN) private videoElem: HTMLVideoElement,
    @Inject(TRACK_FILES_TOKEN) private trackFiles: Map<string, string>
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.top = this.data.top;
    this.left = this.data.left;

    this.videoElem.pause();

    this.videoNotPlaying$ = merge(
      fromEvent(this.videoElem, 'suspend'),
      fromEvent(this.videoElem, 'stop'),
      fromEvent(this.videoElem, 'ended'),
      fromEvent(this.videoElem, 'stalled'),
      fromEvent(this.videoElem, 'pause')
    ).pipe(mapTo(null));

    const isPlaying = of(this.videoElem.paused).pipe(filter(paused => !paused));

    this.videoPlaying$ = merge(
      isPlaying,
      fromEvent(this.videoElem, 'playing')
    ).pipe(mapTo(null));

    this.audioTimeUpdate$ = fromEvent(
      this.audioElem.nativeElement,
      'timeupdate'
    ).pipe(shareReplay(1));

    this.progressStyle$ = this.audioTimeUpdate$.pipe(
      map(event => {
        const currentTime = (event.target as HTMLAudioElement).currentTime;
        const duration = (event.target as HTMLAudioElement).duration;
        const radius = 45;
        const circumference = radius * 2 * Math.PI;
        const completed = currentTime / duration;

        return {
          'stroke-dasharray': `${circumference * completed}% ${circumference}%`
        };
      })
    );

    this.timeUpdate$ = merge(
      fromEvent(this.audioElem.nativeElement, 'timeupdate'),
      fromEvent(this.videoElem, 'timeupdate')
    ).pipe(
      map(_ => {
        return [
          this.audioElem.nativeElement.currentTime,
          this.videoElem.currentTime
        ];
      })
    );

    this.syncOffset$ = this.timeUpdate$.pipe(
      map(([audioTime, videoTime]) => {
        const offsetTime = this.startTime + audioTime;
        return Math.round((videoTime - offsetTime) * 1000);
      }),
      distinctUntilChanged(),
      filter(offset => offset > 150 || offset < -150)
    );

    const syncSub = this.syncOffset$.subscribe(offset => {
      const currentMS = this.audioElem.nativeElement.currentTime * 1000;
      this.audioElem.nativeElement.currentTime = (currentMS + offset) / 1000;
    });
    this.subs.add(syncSub);

    const stopSub = this.videoNotPlaying$.subscribe(() => {
      this.pauseAudio();
    });
    this.subs.add(stopSub);

    const playSub = this.videoPlaying$.subscribe(() => {
      this.playAudio();
    });
    this.subs.add(playSub);

    this.audioUrl = this.getFile(this.data.url);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleMute(event: Event) {
    event.preventDefault();
    const muted = !this.audioMuted;
    this.audioElem.nativeElement.muted = muted;
    this.audioMuted = muted;
  }

  audioLoaded() {
    this.videoElem.play();
  }

  playAudio() {
    this.audioElem.nativeElement.play();
  }

  pauseAudio() {
    this.audioElem.nativeElement.pause();
  }

  getFile(filename): SafeUrl {
    const result = this.trackFiles.get(filename);
    if (result == null) {
      this.logger.error('Could not find filename', filename);
    }
    return this.sanitizer.bypassSecurityTrustUrl(result);
  }
}
