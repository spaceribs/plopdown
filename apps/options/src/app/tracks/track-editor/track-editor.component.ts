import { mdiFileUpload } from '@mdi/js';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Track } from '@plopdown/tracks';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.scss'],
})
export class TrackEditorComponent {
  public mdiFileUpload = mdiFileUpload;

  public trackForm: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<Track> = new EventEmitter();

  @Input() set track(track: Track | null) {
    if (track != null) {
      this.trackForm.patchValue(track);
    } else {
      this.trackForm.reset();
    }
  }

  constructor(fb: FormBuilder) {
    this.trackForm = fb.group({
      title: [null, Validators.required],
      for: [null, Validators.required],
      authors: [null],
      language: [null],
      license: [null],
      url: [null],
      thumbnail: [null],
      created: [null, Validators.required],
      updated: [null],
      cues: [null],
      _attachments: [null],
      _id: [null],
      _rev: [null],
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave(event: Event) {
    event.preventDefault();
    if (this.trackForm.valid) {
      this.save.emit(this.trackForm.value);
    }
  }

  setThumbnail(event: Event) {
    const control = this.trackForm.controls['_attachments'];
    const refControl = this.trackForm.controls['thumbnail'];

    const file = (event.target as HTMLInputElement).files[0];

    const attachment: PouchDB.Core.FullAttachment = {
      content_type: file.type,
      data: file,
    };

    const attachments = control.value;

    const updated = {
      ...attachments,
      [file.name]: attachment,
    };

    control.setValue(updated);
    refControl.setValue(file.name);
  }
}
