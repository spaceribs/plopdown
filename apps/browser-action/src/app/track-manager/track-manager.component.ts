import { Track, TracksService } from '@plopdown/tracks';
import { Observable } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import { RuntimeService, PermissionsService } from '@plopdown/browser-ref';
import { Component } from '@angular/core';
import { VideoRefsService, VideoRef } from '@plopdown/video-refs';
import { LoggerService } from '@plopdown/logger';
import { tap } from 'rxjs/operators';
import type { VideoElementRef } from '@plopdown/video-elem-refs';

@Component({
  selector: 'plopdown-track-manager',
  templateUrl: './track-manager.component.html',
  styleUrls: ['./track-manager.component.scss']
})
export class TrackManagerComponent {
  public tracks$: Observable<Track[]>;

  constructor(
    private runtime: RuntimeService,
    private window: WindowRefService,
    private trackService: TracksService,
    logger: LoggerService,
  ) {
    this.tracks$ = trackService.getTracks().pipe(
      tap(refs => {
        logger.debug('track references', refs);
      })
    );
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
  }

  public onRemoveTrack(track: Track) {
    return this.trackService.removeTrack(track);
  }
}
