import { Observable } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import { RuntimeService, PermissionsService } from '@plopdown/browser-ref';
import { Component } from '@angular/core';
import { VideoRefsService, VideoRef } from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import { tap } from 'rxjs/operators';
import type { VideoElementRef } from '@plopdown/video-elem-refs';

@Component({
  selector: 'plopdown-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss']
})
export class VideoManagerComponent {
  public videoRefs$: Observable<VideoRef[]>;

  constructor(
    private runtime: RuntimeService,
    private window: WindowRefService,
    private permissions: PermissionsService,
    logger: LoggerService,
    vrefs: VideoRefsService
  ) {
    this.videoRefs$ = vrefs.getVideoRefs().pipe(
      tap(refs => {
        logger.debug('video references', refs);
      })
    );
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
  }

  public onRemoveVideo(videoRef: VideoRef) {
    // return this.videoRefsService.removeVideoRef(videoRef);
  }

  public getVideoTitle(videoRef: VideoElementRef) {
    if (videoRef.title) {
      return `${videoRef.title}`;
    } else {
      return `${videoRef.frameTitle}`;
    }
  }

  requestPermissions(event: Event) {
    event.preventDefault();
    browser.permissions
      .request({
        origins: ['https://www.youtube.com/embed/7MNS2dPfm0g']
      })
      .then(allowed => {
        console.log(allowed);
      })
      .catch(err => console.log(err));
  }
}
