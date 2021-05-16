import { Observable, Subscription } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import { RuntimeService } from '@plopdown/browser-ref';
import { Component, OnDestroy } from '@angular/core';
import { VideoRefsService, VideoRef } from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import { tap } from 'rxjs/operators';
import { mdiTrashCan } from '@mdi/js';

@Component({
  selector: 'plopdown-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss'],
})
export class VideoManagerComponent implements OnDestroy {
  public videoRefs$: Observable<VideoRef[]>;
  public loadingVideoRefs$: Observable<boolean>;

  private subs: Subscription = new Subscription();

  public mdiTrashCan = mdiTrashCan;

  constructor(
    private runtime: RuntimeService,
    private window: WindowRefService,
    private logger: LoggerService,
    private videoRefsService: VideoRefsService
  ) {
    this.loadingVideoRefs$ = this.videoRefsService.getLoading();
    this.videoRefs$ = videoRefsService.getVideoRefs().pipe(
      tap((refs) => {
        logger.debug('video references', refs);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
    this.window.close();
  }

  public onRemoveVideo(videoRef: VideoRef) {
    const removeVideoRefSub = this.videoRefsService
      .removeVideoRef(videoRef)
      .subscribe({
        next: (res) => {
          this.logger.debug('Removed Video Ref', res);
        },
        error: (err) => {
          this.logger.error('Error removing Video Ref', err);
        },
      });
    this.subs.add(removeVideoRefSub);
  }

  public getVideoTitle(videoRef: VideoRef) {
    if (videoRef.title) {
      return `${videoRef.title}`;
    } else {
      return `${videoRef.frameTitle}`;
    }
  }

  public getVideoLink(videoRef: VideoRef): string {
    if (videoRef.frameOrigin) {
      const url = new URL(videoRef.frameOrigin);

      if (videoRef.framePath) {
        url.pathname = videoRef.framePath;
      }

      if (videoRef.frameSearch) {
        url.search = videoRef.frameSearch;
      }

      return url.toString();
    }
    return '#';
  }
}
