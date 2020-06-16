import { Component, Input } from '@angular/core';
import { TrackEditorComponent } from '../src/app/tracks/track-editor/track-editor.component';
import { Track } from '@plopdown/tracks';

@Component({
  selector: 'plopdown-track-editor',
  template: 'mock-plopdown-track-editor',
})
export class MockTrackEditorComponent implements Partial<TrackEditorComponent> {
  @Input() set track(track: Track | null) {}
}
