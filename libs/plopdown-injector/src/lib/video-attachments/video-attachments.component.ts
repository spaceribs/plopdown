import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'plopdown-video-attachments',
  template: `
    @for (videoElem of videoElems; track videoElem) {
    <plopdown-video-attachment
      [videoElem]="videoElem"
    ></plopdown-video-attachment>
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class VideoAttachmentsComponent {
  @Input() public videoElems: HTMLVideoElement[] | null = null;
}
