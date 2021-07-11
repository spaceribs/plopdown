import { Component, Input } from '@angular/core';
import { VideoAttachmentsComponent } from '../src/lib/video-attachments/video-attachments.component';

@Component({
  selector: 'plopdown-video-attachments',
  template: 'mock-video-attachments',
})
export class MockVideoAttachmentsComponent
  implements Partial<VideoAttachmentsComponent> {
  @Input() public videoElems: HTMLVideoElement[] | null;
}
