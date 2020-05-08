import { VideoRef } from '@plopdown/video-refs';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'plopdown-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.scss']
})
export class VideoEditorComponent implements OnInit {
  @Input() set videoRef(videoRef: VideoRef) {
    this.videoRefForm.setValue(videoRef);
  }
  public videoRefForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.videoRefForm = fb.group({
      trackId: [null],
      title: [null],
      frameTitle: [null],
      frameOrigin: [null, Validators.required],
      framePath: [null],
      frameSearch: [null],
      xpath: [null, Validators.required],
      duration: [null, Validators.required]
    });
  }

  ngOnInit(): void {}
}
