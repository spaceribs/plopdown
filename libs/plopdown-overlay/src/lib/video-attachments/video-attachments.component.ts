import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SavedVideoRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-video-attachments',
  template: `
    <plopdown-video-attachment
      *ngFor="let videoRef of videoRefs | keyvalue"
      [xpath]="videoRef.value.xpath"
      [track]="videoRef.value.track"
    ></plopdown-video-attachment>
  `
})
export class VideoAttachmentsComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  @Input() public videoRefs: Map<SavedVideoRef['_id'], SavedVideoRef>;

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}
}
