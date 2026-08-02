import { Component, Input } from '@angular/core';

@Component({
  selector: 'plopdown-video-attachments',
  template: `
    <plopdown-video-attachment
      *ngFor="let videoElem of videoElems"
      [videoElem]="videoElem"
    ></plopdown-video-attachment>
  `,
  standalone: false,
})
export class VideoAttachmentsComponent {
  @Input() public videoElems: HTMLVideoElement[] | null = null;
}
