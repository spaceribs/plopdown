import { VideoAttachmentsComponent } from '@plopdown/plopdown-injector';
import { Component, Input } from '@angular/core';
import { SavedVideoRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-video-attachments',
  template: 'mock-video-attachments',
})
export class MockVideoAttachmentsComponent
  implements Partial<VideoAttachmentsComponent> {
  @Input() public videoRefs: Map<SavedVideoRef['_id'], SavedVideoRef>;
}
