import { Observable } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import { RuntimeService } from '@plopdown/browser-ref';
import { Component } from '@angular/core';
import {
  VideoRefsService,
  VideoRef,
  SavedVideoRef
} from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import { tap } from 'rxjs/operators';

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
    logger: LoggerService,
    private vrefs: VideoRefsService
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

  public onRemoveVideo(videoRef: SavedVideoRef) {
    return this.vrefs.removeVideoRef(videoRef);
  }

  public getVideoTitle(videoRef: VideoRef) {
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
