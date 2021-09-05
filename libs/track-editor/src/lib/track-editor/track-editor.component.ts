import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.scss'],
})
export class TrackEditorComponent implements OnInit {
  public startTime = new Date(0);
  public currentTime = new Date(5000);
  public endTime = new Date(10000);

  constructor() {}

  ngOnInit(): void {}
}
