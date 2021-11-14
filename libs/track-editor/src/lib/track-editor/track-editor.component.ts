import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Layer } from '../layer/layer.models';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.scss'],
})
export class TrackEditorComponent {
  @Input() public endTime: Date = new Date(10000);

  @Input() public zoom: number = 10;
  @Output() public zoomChange: EventEmitter<Date> = new EventEmitter();

  @Input() public time: Date = new Date(5000);
  @Output() public timeChange: EventEmitter<Date> = new EventEmitter();

  public layers: Layer[] = [
    {
      title: 'Layer 1',
      elements: [
        {
          start: new Date(2000),
          end: new Date(4000),
          title: 'plop',
          color: '#F00',
        },
        {
          start: new Date(5000),
          end: new Date(7000),
          title: 'audio',
          color: '#F0F',
        },
      ],
    },
    {
      title: 'Layer 2',
      elements: [
        {
          start: new Date(3000),
          end: new Date(7000),
          title: 'shape',
          color: '#0a0',
        },
      ],
    },
  ];
}
