import { UnsavedVideoRef } from '@plopdown/video-refs';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'plopdown-video-attachments',
  template: `
    <ng-container *ngIf="videoElems">
      <plopdown-video-attachment
        *ngFor="let videoElem of videoElems"
        [videoElem]="videoElem"
        (attached)="attached.emit($event)"
      ></plopdown-video-attachment>
    </ng-container>
  `,
})
export class VideoAttachmentsComponent {
  @Input() public videoElems: HTMLVideoElement[] | null = null;
  @Output() public attached: EventEmitter<UnsavedVideoRef> = new EventEmitter();
}
