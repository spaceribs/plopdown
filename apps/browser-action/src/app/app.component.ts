import {
  BrowserActionPubService,
  BackgroundSubService,
  ContentScriptSubService
} from '@plopdown/messages';
import { RuntimeService } from '@plopdown/browser-ref';
import { WindowRefService } from '@plopdown/window-ref';
import { Track, TracksService } from '@plopdown/tracks';
import {
  VideoRef,
  VideoElementRef,
  VideoRefsService
} from '@plopdown/video-refs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Observable, timer, merge, Subscription } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeOut, fadeIn } from 'ng-animate';
import { LoggerService } from '@plopdown/logger';

enum ActionState {
  Loading,
  NoTracks,
  NoVideos,
  Ready
}

@Component({
  selector: 'plopdown-browser-action',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(
        'void => *',
        useAnimation(fadeIn, {
          params: { timing: 0.2 }
        })
      ),
      transition(
        '* => void',
        useAnimation(fadeOut, {
          params: { timing: 0.2 }
        })
      )
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  public ActionState = ActionState;

  public state$: Observable<ActionState>;
  public videoRefs$: Observable<VideoRef[]>;
  public tracks$: Observable<Track[]>;
  public foundVideos$: Observable<VideoElementRef[]>;
  public updatingVideoRefs$: Observable<boolean>;

  private subs: Subscription = new Subscription();
  public selectedVideo: VideoElementRef;
  public selectedTrack: Track;

  constructor(
    private window: WindowRefService,
    private runtime: RuntimeService,
    private videoRefsService: VideoRefsService,
    private logger: LoggerService,
    private baPub: BrowserActionPubService,
    bgSub: BackgroundSubService,
    csSub: ContentScriptSubService,
    tracksService: TracksService
  ) {
    this.videoRefs$ = videoRefsService.getVideoRefs();
    this.tracks$ = tracksService.getTracks();
    this.updatingVideoRefs$ = videoRefsService.getUpdating();

    this.state$ = merge(
      of(ActionState.Loading),
      timer(2000).pipe(mapTo(ActionState.NoTracks))
    );
  }

  ngOnInit(): void {
    const clearInputsSub = this.videoRefs$.subscribe({
      next: () => {
        this.selectedVideo = null;
        this.selectedTrack = null;
      }
    });
    this.subs.add(clearInputsSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
  }

  public onSelectTrack() {
    const newRef: VideoRef = {
      ref: this.selectedVideo,
      track: this.selectedTrack.id
    };

    this.videoRefsService.addVideoRef(newRef);
  }

  public onRemoveVideo(videoRef: VideoRef) {
    return this.videoRefsService.removeVideoRef(videoRef);
  }

  public getVideoTitle(videoRef: VideoElementRef) {
    if (videoRef.title) {
      return `${videoRef.title}`;
    } else {
      return `${videoRef.frameTitle}`;
    }
  }

  public queryVideos() {}
}
