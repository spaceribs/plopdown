import { SavedVideoRef } from './../../../../libs/video-refs/src/lib/video-ref.model';
import { LoggerService } from '@plopdown/logger';
import {
  ContentScriptPubService,
  BackgroundSubService
} from '@plopdown/messages';
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { map, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VideoRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-cs',
  template: `
    <plopdown-content-scanner></plopdown-content-scanner>
    <plopdown-video-attachments
      [videoRefs]="videoRefs$ | async"
    ></plopdown-video-attachments>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  public videoRefs$: Observable<Map<SavedVideoRef['_id'], SavedVideoRef>>;

  constructor(
    private csPub: ContentScriptPubService,
    private bgSub: BackgroundSubService,
    private logger: LoggerService
  ) {
    this.videoRefs$ = this.bgSub.getVideoRefsFound().pipe(
      map(res => res.args[0]),
      scan((refs, videoRefs) => {
        videoRefs.forEach(videoRef => {
          refs.set(videoRef['_id'], videoRef);
        });
        return refs;
      }, new Map<SavedVideoRef['_id'], SavedVideoRef>())
    );
  }

  ngAfterViewInit(): void {
    this.logger.debug('Content script ready');
    this.csPub.requestTrack('test');
  }
}
