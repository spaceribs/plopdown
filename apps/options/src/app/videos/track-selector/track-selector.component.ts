import { WindowRefService } from '@plopdown/window-ref';
import { Observable } from 'rxjs';
import { TracksService, Track } from '@plopdown/tracks';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrackRef } from '@plopdown/video-refs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'plopdown-track-selector',
  templateUrl: './track-selector.component.html',
  styleUrls: ['./track-selector.component.scss'],
})
export class TrackSelectorComponent {
  public tracks$: Observable<Track[]>;
  public trackSelectorForm: FormGroup;
  @Output() cancel: EventEmitter<null> = new EventEmitter();
  @Output() save: EventEmitter<TrackRef> = new EventEmitter();

  @Input() set trackRef(trackRef: TrackRef | undefined | null) {
    if (trackRef != null) {
      this.trackSelectorForm.setValue(trackRef);
    } else {
      this.trackSelectorForm.reset();
    }
  }

  constructor(
    fb: FormBuilder,
    tracksService: TracksService,
    private windowRef: WindowRefService,
    private sanitizer: DomSanitizer
  ) {
    this.tracks$ = tracksService.getTracks();

    this.trackSelectorForm = fb.group({
      _id: [null, Validators.required],
      title: [null, Validators.required],
    });
  }

  onSelectTrack(track: Track) {
    this.trackSelectorForm.setValue({
      _id: track._id,
      title: track.title,
    });
  }

  onReset(event: Event) {
    event.preventDefault();
    this.save.emit();
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

  getAttachment(track: Track, filename?: string): SafeUrl | null {
    if (filename == null) {
      return null;
    }
    if (track._attachments == null) {
      return null;
    }
    const attachment = track._attachments[filename];
    const url = this.windowRef.getURL().createObjectURL(attachment.data);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
