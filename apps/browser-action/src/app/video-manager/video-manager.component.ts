import { Observable, Subscription } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import { RuntimeService } from '@plopdown/browser-ref';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  VideoRefsService,
  VideoRef,
  SavedVideoRef,
} from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import { tap } from 'rxjs/operators';
import { mdiTrashCan } from '@mdi/js';

@Component({
  selector: 'plopdown-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss'],
})
export class VideoManagerComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
    this.window.close();
  }

  public onRemoveVideo(videoRef: SavedVideoRef | VideoRef) {
    const removeVideoRefSub = this.videoRefsService
      .removeVideoRef(videoRef as SavedVideoRef)
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

  requestPermissions(event: Event) {
    event.preventDefault();
    browser.permissions
      .request({
        origins: ['https://www.youtube.com/embed/7MNS2dPfm0g'],
      })
      .then((allowed) => {
        console.log(allowed);
      })
      .catch((err) => console.log(err));
  }
}
