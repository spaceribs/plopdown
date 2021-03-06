import { WindowRefService } from '@plopdown/window-ref';
import { LoggerService } from '@plopdown/logger';
import { Observable, Subject, Subscription } from 'rxjs';
import { VideoRefsService, VideoRef, TrackRef } from '@plopdown/video-refs';
import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import {
  mdiRefresh,
  mdiAlertCircle,
  mdiPlus,
  mdiPencil,
  mdiTrashCan,
  mdiCommentPlus,
  mdiComment,
} from '@mdi/js';

@Component({
  selector: 'plopdown-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit, OnDestroy {
  private updateVideoRef$: Subject<VideoRef> = new Subject();
  public videoRefs$: Observable<VideoRef[]>;
  public loadingVideoRefs$: Observable<boolean>;
  public editingVideoRef: VideoRef | null = null;
  public showEditor = false;
  public showTrackSelector = false;
  public confirmReset = false;

  public subs: Subscription = new Subscription();

  public mdiRefresh = mdiRefresh;
  public mdiAlertCircle = mdiAlertCircle;
  public mdiPlus = mdiPlus;
  public mdiPencil = mdiPencil;
  public mdiTrashCan = mdiTrashCan;
  public mdiCommentPlus = mdiCommentPlus;
  public mdiComment = mdiComment;

  constructor(
    private videoRefsService: VideoRefsService,
    private logger: LoggerService,
    private errorHandler: ErrorHandler,
    private windowRef: WindowRefService
  ) {
    this.videoRefs$ = this.videoRefsService.getVideoRefs();
    this.loadingVideoRefs$ = this.videoRefsService.getLoading();
  }

  ngOnInit(): void {
    const updateVideoRefs = this.updateVideoRef$.subscribe({
      next: (videoRef) => {
        return this.videoRefsService.updateVideoRef(videoRef);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(updateVideoRefs);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public refreshVideos() {
    this.videoRefsService.refreshVideos();
  }

  public removeVideo(videoRef: VideoRef) {
    const removeVideoRefSub = this.videoRefsService
      .removeVideoRef(videoRef as VideoRef)
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

  public getVideoLink(videoRef: VideoRef) {
    return `${videoRef.frameOrigin}${videoRef.framePath || ''}${
      videoRef.frameSearch || ''
    }`;
  }

  public editVideoRef(videoRef: VideoRef) {
    this.editingVideoRef = videoRef;
    this.showEditor = true;
  }

  public createVideoRef() {
    this.editingVideoRef = null;
    this.showEditor = true;
  }

  public resetVideoRefs() {
    if (this.confirmReset !== true) {
      this.confirmReset = true;
      setTimeout(() => {
        this.confirmReset = false;
      }, 3000);
      return;
    }

    const removeVideoRefSub = this.videoRefsService.resetVideoRefs().subscribe({
      next: (res) => {
        this.logger.debug('Reset all Video References', res);
        this.windowRef.reload();
      },
      error: (err) => {
        this.logger.error('Error Resetting Video References.', err);
      },
    });
    this.subs.add(removeVideoRefSub);
  }

  public closeEdit() {
    this.showEditor = false;
  }

  public closeTrackSelector() {
    this.showTrackSelector = false;
  }

  public selectTrack(videoRef: VideoRef) {
    this.editingVideoRef = videoRef;
    this.showTrackSelector = true;
  }

  public updateTrack(trackRef: TrackRef | null) {
    if (this.editingVideoRef == null) {
      return;
    }
    this.editingVideoRef.track = trackRef;
    this.addOrUpdateVideoRef(this.editingVideoRef);
    this.closeTrackSelector();
  }

  public addOrUpdateVideoRef(videoRef: VideoRef) {
    if (videoRef['_id'] != null) {
      const updateSub = this.videoRefsService
        .updateVideoRef(videoRef)
        .subscribe({
          next: (res) => {
            this.logger.debug('Video Ref Updated', res);
            this.showEditor = false;
          },
          error: (err) => {
            this.logger.error('Error Updating Video Ref', err);
          },
        });
      this.subs.add(updateSub);
    } else {
      const addSub = this.videoRefsService.addVideoRef(videoRef).subscribe({
        next: (res) => {
          this.logger.debug('Video Ref Added', res);
          this.showEditor = false;
        },
        error: (err) => {
          this.logger.error('Error Adding Video Ref', err);
        },
      });
      this.subs.add(addSub);
    }
  }
}
