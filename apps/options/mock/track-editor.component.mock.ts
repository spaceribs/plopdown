import { Component, Input } from '@angular/core';
import { FileEditorComponent } from '../src/app/tracks/track-editor/track-editor.component';
import { Track } from '@plopdown/tracks';

@Component({
  selector: 'plopdown-track-editor',
  template: 'mock-plopdown-track-editor',
})
export class MockTrackEditorComponent implements Partial<FileEditorComponent> {
  @Input() set track(track: Track | null) {
    return;
  }
}
