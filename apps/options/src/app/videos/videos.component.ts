import { Observable } from 'rxjs';
import { VideoRefsService, VideoRef } from '@plopdown/video-refs';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'plopdown-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  public videoRefs$: Observable<VideoRef[]>;

  constructor(private videoRefsService: VideoRefsService) {
    this.videoRefs$ = this.videoRefsService
      .getVideoRefs()
      .pipe(tap(console.log));
  }

  public getVideoLink(videoRef: VideoRef) {
    return `${videoRef.frameOrigin}${videoRef.framePath}${videoRef.frameSearch}`;
  }
}
