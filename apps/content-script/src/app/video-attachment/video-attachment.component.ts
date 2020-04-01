import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plopdown-video-attachment',
  templateUrl: './video-attachment.component.html',
  styleUrls: ['./video-attachment.component.scss']
})
export class VideoAttachmentComponent implements OnInit {
  constructor() {}
  @Input() public xpath: string;
  ngOnInit(): void {}
}
