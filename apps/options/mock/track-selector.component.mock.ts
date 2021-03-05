import { TrackSelectorComponent } from '../src/app/videos/track-selector/track-selector.component';
import { Component, Input } from '@angular/core';
import { TrackRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-track-selector',
  template: 'mock-plopdown-track-selector',
})
export class MockTrackSelectorComponent
  implements Partial<TrackSelectorComponent> {
  @Input() set trackRef(trackRef: TrackRef | null) {
    return;
  }
}
