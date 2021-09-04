import { Track, TracksService } from '@plopdown/tracks';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.css'],
})
export class TrackEditorComponent {
  tracks$: Observable<Track[]>;

  constructor(private trackService: TracksService) {
    this.tracks$ = trackService.getTracks();
  }
}
