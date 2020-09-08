import { Track, TracksService } from '@plopdown/tracks';
import { Observable } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import { RuntimeService } from '@plopdown/browser-ref';
import { Component } from '@angular/core';
import { LoggerService } from '@plopdown/logger';

@Component({
  selector: 'plopdown-track-manager',
  templateUrl: './track-manager.component.html',
  styleUrls: ['./track-manager.component.scss'],
})
export class TrackManagerComponent {
  public tracks$: Observable<Track[]>;

  constructor(
    private runtime: RuntimeService,
    private window: WindowRefService,
    private tracksService: TracksService,
    logger: LoggerService
  ) {
    this.tracks$ = tracksService.getTracks();
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
  }

  public onRemoveTrack(track: Track) {
    return this.tracksService.removeTrack(track);
  }
}
