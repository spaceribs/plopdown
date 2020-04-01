import { WindowRefService } from '@plopdown/window-ref';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ErrorHandler,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { VideoRef, VideoRefsService } from '@plopdown/video-refs';
import { map } from 'rxjs/operators';
import { LoggerService } from '@plopdown/logger';

@Component({
  selector: 'plopdown-video-attachments',
  templateUrl: './video-attachments.component.html',
  styleUrls: ['./video-attachments.component.scss']
})
export class VideoAttachmentsComponent implements OnInit, OnDestroy {
  private videoRefs$: Observable<VideoRef[]>;
  private document: Document;
  private subs: Subscription = new Subscription();
  public videoRefs: VideoRef[];

  constructor(
    private logger: LoggerService,
    private cd: ChangeDetectorRef,
    private errorHandler: ErrorHandler,
    videoRefs: VideoRefsService,
    window: WindowRefService
  ) {
    this.document = window.getDocument();

    this.videoRefs$ = videoRefs.getVideoRefs().pipe(
      map(refs => {
        return refs.filter(ref => {
          return (
            ref.ref.frameOrigin === this.document.location.origin &&
            ref.ref.framePath === this.document.location.pathname
          );
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const videoRefsSub = this.videoRefs$.subscribe({
      next: refs => {
        this.logger.debug('Video References Found', refs);
        this.videoRefs = refs;
        this.cd.detectChanges();
      },
      error: err => {
        this.errorHandler.handleError(err);
      }
    });
    this.subs.add(videoRefsSub);
  }
}
