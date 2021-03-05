import { Component, Input } from '@angular/core';
import { VideoRef } from '@plopdown/video-refs';
import { VideoEditorComponent } from '../src/app/videos/video-editor/video-editor.component';

@Component({
  selector: 'plopdown-video-editor',
  template: 'mock-plopdown-track-editor',
})
export class MockVideoEditorComponent implements Partial<VideoEditorComponent> {
  @Input() videoRef: VideoRef | null = null;
}
