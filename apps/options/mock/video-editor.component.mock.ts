import { Component, Input } from '@angular/core';
import { VideoEditorComponent } from '../src/app/videos/video-editor/video-editor.component';
import { VideoRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-video-editor',
  template: 'mock-plopdown-track-editor',
})
export class MockVideoEditorComponent implements Partial<VideoEditorComponent> {
  @Input() set videoRef(videoRef: VideoRef | null) {}
}
