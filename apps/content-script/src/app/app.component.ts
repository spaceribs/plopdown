import { Track, TracksService } from '@plopdown/tracks';
import { VideoRef, VideoRefsService } from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { VideoScanService } from '@plopdown/window-ref';

@Component({
  selector: 'plopdown-cs',
  template: `
    <plopdown-video-attachments
      [videoElems]="videoElems$ | async"
    ></plopdown-video-attachments>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  public videoElems$: Observable<HTMLVideoElement[]>;
  private subs: Subscription = new Subscription();
  public tracks$: Observable<Track[]>;
  public videoRefs$: Observable<VideoRef[]>;

  constructor(
    private logger: LoggerService,
    private videoScanner: VideoScanService,
    private tracksService: TracksService,
    private videoRefsService: VideoRefsService,
    cd: ChangeDetectorRef
  ) {
    this.tracks$ = this.tracksService.getTracks();
    this.videoRefs$ = this.videoRefsService.getVideoRefs();
    this.videoElems$ = videoScanner.getVideoElems().pipe(
      tap(() => {
        setTimeout(() => cd.detectChanges(), 100);
      }),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    this.videoScanner.refresh();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.logger.debug('Content script ready');
  }
}
