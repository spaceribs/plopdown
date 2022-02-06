import { Track, TracksService } from '@plopdown/tracks';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './tracks-editor.component.html',
  styleUrls: ['./tracks-editor.component.css'],
})
export class TracksEditorComponent {
  tracks$: Observable<Track[]>;

  selectedTrack: Track | null = null;

  constructor(tracksService: TracksService) {
    this.tracks$ = tracksService.getTracks();
  }
}
