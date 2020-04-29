import { Track, TracksService, SavedTrack } from '@plopdown/tracks';
import { Observable } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import { RuntimeService } from '@plopdown/browser-ref';
import { Component } from '@angular/core';
import { LoggerService } from '@plopdown/logger';

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
    logger: LoggerService
  ) {
    this.tracks$ = trackService.getTracks();
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
  }

  public onRemoveTrack(track: SavedTrack) {
    return this.trackService.removeTrack(track);
  }
}
