import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SavedVideoRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-video-attachments',
  template: `
    <plopdown-video-attachment
      *ngFor="let videoRef of videoRefs"
      [xpath]="videoRef.ref.xpath"
      [track]="videoRef.track"
    ></plopdown-video-attachment>
  `
})
export class VideoAttachmentsComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  @Input() public videoRefs: SavedVideoRef[];

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}
}
