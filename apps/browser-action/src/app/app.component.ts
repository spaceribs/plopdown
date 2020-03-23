import { Track } from '@plopdown/tracks';
import { VideoRef, VideoElementRef } from '@plopdown/video-refs';
import { Component } from '@angular/core';

@Component({
  selector: 'plopdown-browser-action',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading = false;
  public videoRefs: VideoRef[];
  public tracks: Track[];
  public foundVideos: VideoElementRef[];
  public selectedVideo: VideoElementRef;
  public selectedTrack: Track;
  public openExtensionsPage(path: string) {}
  public onSelectTrack() {}
  public onRemoveVideo(videoRef: VideoRef) {}
  public getVideoTitle(videoRef: VideoRef) {}
  public queryVideos() {}
}
