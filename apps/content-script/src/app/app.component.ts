import { Track, TracksService } from '@plopdown/tracks';
import {
  VideoRef,
  VideoRefsService,
  UnsavedVideoRef,
} from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ErrorHandler,
} from '@angular/core';
import { shareReplay, tap, switchMap, scan } from 'rxjs/operators';
import { Observable, Subscription, Subject } from 'rxjs';
import { VideoScanService } from '@plopdown/window-ref';
import {
  BackgroundSubService,
  ContentScriptPubService,
} from '@plopdown/messages';

@Component({
  selector: 'plopdown-cs',
  template: `
    <plopdown-video-attachments
      #videoAttachments
      [videoElems]="videoElems$ | async"
      (attached)="attached($event)"
    ></plopdown-video-attachments>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  public videoElems$: Observable<HTMLVideoElement[]>;
  private subs: Subscription = new Subscription();
  private newAttachment$: Subject<UnsavedVideoRef> = new Subject();
  private attachments$: Observable<UnsavedVideoRef[]>;
  public tracks$: Observable<Track[]>;
  public videoRefs$: Observable<VideoRef[]>;

  constructor(
    private logger: LoggerService,
    private videoScanner: VideoScanService,
    private tracksService: TracksService,
    private csPub: ContentScriptPubService,
    private bgSub: BackgroundSubService,
    private videoRefsService: VideoRefsService,
    private errorHandler: ErrorHandler,
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

    this.attachments$ = this.newAttachment$.pipe(
      scan((acc, videoRef) => {
        const existing =
          acc.find((elem) => {
            return elem.xpath === videoRef.xpath;
          }) != null;

        if (existing === false) {
          acc.push(videoRef);
        }

        return acc;
      }, [] as UnsavedVideoRef[]),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    this.videoScanner.refresh();

    const attachmentsSub = this.attachments$.subscribe(
      (attachments) => {
        this.logger.debug('Attachments Made', attachments);
      },
      (err) => {
        this.errorHandler.handleError(err);
      }
    );
    this.subs.add(attachmentsSub);

    const devRefsSub = this.bgSub
      .getDevRefs()
      .pipe(switchMap(() => this.attachments$))
      .subscribe(
        (videoRefs) => {
          this.csPub.plopdownsAttached(videoRefs);
        },
        (err) => {
          this.errorHandler.handleError(err);
        }
      );
    this.subs.add(devRefsSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.logger.debug('Content Script Initialized');
  }

  public attached(videoRef: UnsavedVideoRef): void {
    this.newAttachment$.next(videoRef);
  }
}
