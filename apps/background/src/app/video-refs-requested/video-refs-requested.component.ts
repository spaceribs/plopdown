import { LoggerService } from '@plopdown/logger';
import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import {
  BackgroundPubService,
  ContentScriptSubService,
} from '@plopdown/messages';
import { VideoRefsService, VideoRef } from '@plopdown/video-refs';
import { Subscription, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'plopdown-video-refs-requested',
  template: 'video-refs-requested',
})
export class VideoRefsRequestedComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  private onVideoRefsRequested$: Observable<VideoRef[]>;
  public onAddVideoRef$: Observable<VideoRef>;

  constructor(
    private errorHandler: ErrorHandler,
    private bgPub: BackgroundPubService,
    private logger: LoggerService,
    videoRefsService: VideoRefsService,
    csSub: ContentScriptSubService
  ) {
    this.onVideoRefsRequested$ = csSub.onVideoRefsRequested().pipe(
      switchMap(() => {
        return videoRefsService.getVideoRefs();
      })
    );

    this.onAddVideoRef$ = csSub.onAddVideoRef().pipe(
      map((command) => {
        return command.args[0];
      }),
      switchMap((videoRef) => {
        return videoRefsService.addVideoRef(videoRef);
      })
    );
  }

  ngOnInit(): void {
    const videoRefsRequestedSub = this.onVideoRefsRequested$.subscribe({
      next: (videoRefs) => {
        this.logger.info('Publishing References', videoRefs);
        this.bgPub.publishVideoRefs(videoRefs);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(videoRefsRequestedSub);

    const addVideoRefSub = this.onAddVideoRef$.subscribe({
      next: (videoRef) => {
        this.logger.info('Added Video Reference', videoRef);
        this.bgPub.videoRefAdded(videoRef);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(addVideoRefSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
