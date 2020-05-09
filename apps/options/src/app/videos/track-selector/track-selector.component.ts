import { Observable } from 'rxjs';
import { TracksService, SavedTrack } from '@plopdown/tracks';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrackRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-track-selector',
  templateUrl: './track-selector.component.html',
  styleUrls: ['./track-selector.component.scss']
})
export class TrackSelectorComponent implements OnInit {
  public tracks$: Observable<SavedTrack[]>;
  public trackSelectorForm: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<TrackRef> = new EventEmitter();

  @Input() set trackRef(trackRef: TrackRef | null) {
    if (trackRef != null) {
      this.trackSelectorForm.setValue(trackRef);
    } else {
      this.trackSelectorForm.reset();
    }
  }

  constructor(fb: FormBuilder, tracksService: TracksService) {
    this.tracks$ = tracksService.getTracks();

    this.trackSelectorForm = fb.group({
      _id: [null, Validators.required],
      title: [null, Validators.required]
    });
  }

  onSelectTrack(track: SavedTrack) {
    this.trackSelectorForm.setValue({
      _id: track._id,
      title: track.title
    });
  }

  onReset(event: Event) {
    event.preventDefault();
    this.save.emit(null);
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave(event: Event) {
    event.preventDefault();
    if (this.trackSelectorForm.valid) {
      this.save.emit(this.trackSelectorForm.value);
    }
  }

  ngOnInit(): void {}
}
