import { Component, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SavedVideoRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-video-attachments',
  template: `
    <plopdown-video-attachment
      *ngFor="let videoRef of videoRefs | keyvalue"
      [xpath]="videoRef.value.xpath"
      [duration]="videoRef.value.duration"
      [track]="videoRef.value.track"
    ></plopdown-video-attachment>
  `
})
export class VideoAttachmentsComponent implements OnDestroy {
  private subs: Subscription = new Subscription();

  @Input() public videoRefs: Map<SavedVideoRef['_id'], SavedVideoRef>;

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
