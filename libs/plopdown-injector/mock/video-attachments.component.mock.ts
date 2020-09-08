import { VideoAttachmentsComponent } from '@plopdown/plopdown-injector';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'plopdown-video-attachments',
  template: 'mock-video-attachments',
})
export class MockVideoAttachmentsComponent
  implements Partial<VideoAttachmentsComponent> {
  @Input() public videoElems: HTMLVideoElement[] | null;
}
