import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  ErrorHandler,
  ElementRef,
  OnInit,
} from '@angular/core';
import { PlopdownAudio } from './audio.model';
import { PlopdownBaseComponent } from '../../models/plopdown-base.component';
import { Observable, Subscription, Subject, fromEvent } from 'rxjs';
import { mdiVolumeHigh, mdiVolumeOff, mdiAlert } from '@mdi/js';
import {
  map,
  filter,
  switchMap,
  shareReplay,
  distinctUntilChanged,
} from 'rxjs/operators';
import { SyncMediaService } from '../../sync-media.service';

const ACCEPTABLE_DESYNC = 0.5;
@Component({
  selector: 'plopdown-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent
  extends PlopdownBaseComponent<PlopdownAudio>
  implements AfterViewInit, OnInit, OnDestroy {
  public color = '#ffc09f';
  public audioMuted = false;
  public mdiVolumeHigh = mdiVolumeHigh;
  public mdiVolumeOff = mdiVolumeOff;
  public mdiAlert = mdiAlert;

  public progressStyle$: Observable<Partial<CSSStyleDeclaration>> | null = null;
  public audioUrl: SafeUrl | undefined;

  @ViewChild('audioElem')
  private audioElem: ElementRef<HTMLAudioElement> | null = null;

  private toggleMute$: Subject<void> = new Subject();

  private subs: Subscription = new Subscription();

  constructor(
    private sanitizer: DomSanitizer,
    private errorHandler: ErrorHandler,
    private syncMedia: SyncMediaService
  ) {
    super();
  }

  ngOnInit() {
    if (this.data != null && this.files != null) {
      const path = this.files.get(this.data.url);

      if (path == null) {
        return;
      }

      this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(path);
    }
  }

  ngAfterViewInit(): void {
    if (this.audioElem) {
      this.progressStyle$ = fromEvent(
        this.audioElem.nativeElement,
        'timeupdate'
      ).pipe(
        map((event) => {
          const currentTime = (event.target as HTMLAudioElement).currentTime;
          const duration = (event.target as HTMLAudioElement).duration;
          const radius = 45;
          const circumference = radius * 2 * Math.PI;
          const completed = currentTime / duration;

          return {
            'stroke-dasharray': `${
              circumference * completed
            }% ${circumference}%`,
          };
        })
      );

      const mediaReady$ = this.syncMedia
        .allMediaReady(this.videoElem, this.audioElem.nativeElement)
        .pipe(shareReplay(1));

      const mediaPausedSub = fromEvent(this.videoElem, 'pause').subscribe(
        () => {
          this.audioElem?.nativeElement.pause();
        }
      );
      this.subs.add(mediaPausedSub);

      const mediaPlaySub = fromEvent(this.videoElem, 'play').subscribe(() => {
        this.audioElem?.nativeElement.play();
      });
      this.subs.add(mediaPlaySub);

      const mediaWaitSub = mediaReady$.subscribe((ready) => {
        if (ready) {
          this.videoElem.play();
          this.audioElem?.nativeElement.play();
        } else {
          this.videoElem.pause();
          this.audioElem?.nativeElement.pause();
        }
      });
      this.subs.add(mediaWaitSub);

      const mediaSyncSub = mediaReady$
        .pipe(
          filter((ready) => ready),
          switchMap(() => {
            if (this.audioElem == null) {
              throw new Error('Audio element was not found.');
            }

            return this.syncMedia.getTimeDifference(
              this.videoElem,
              this.audioElem.nativeElement,
              this.startTime - (this.data?.offset_time || 0)
            );
          }),
          filter(
            (offset) =>
              offset > ACCEPTABLE_DESYNC || offset < -ACCEPTABLE_DESYNC
          ),
          distinctUntilChanged()
        )
        .subscribe(
          (offset) => {
            if (this.audioElem == null) {
              throw new Error('Audio element was not found.');
            }

            this.audioElem.nativeElement.currentTime += offset;
          },
          (err) => {
            this.errorHandler.handleError(err);
          }
        );
      this.subs.add(mediaSyncSub);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  toggleMute(event: Event) {
    event.preventDefault();

    if (this.audioElem != null) {
      this.audioElem.nativeElement.muted = !this.audioElem.nativeElement.muted;
      this.audioMuted = this.audioElem.nativeElement.muted;
    }
  }

  textPreview(data = this.data): string {
    return `Audio - ${data?.title}`;
  }
}
