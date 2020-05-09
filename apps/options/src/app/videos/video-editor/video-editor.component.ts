import { VideoRef } from '@plopdown/video-refs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'plopdown-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.scss']
})
export class VideoEditorComponent {
  public videoRefForm: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<VideoRef> = new EventEmitter();

  @Input() set videoRef(videoRef: VideoRef | null) {
    if (videoRef != null) {
      this.videoRefForm.setValue(videoRef);
    } else {
      this.videoRefForm.reset();
    }
  }

  constructor(fb: FormBuilder) {
    this.videoRefForm = fb.group({
      title: [null, Validators.required],
      frameTitle: [null],
      frameOrigin: [
        null,
        [Validators.required, Validators.pattern(/^https?:\/\//)]
      ],
      framePath: [null],
      frameSearch: [null],
      xpath: [null, Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]],
      track: [null],
      _id: [null],
      _rev: [null]
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave(event: Event) {
    event.preventDefault();
    if (this.videoRefForm.valid) {
      this.save.emit(this.videoRefForm.value);
    }
  }
}
