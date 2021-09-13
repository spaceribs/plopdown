import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Tick } from './track-editor.models';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.scss'],
})
export class TrackEditorComponent implements OnChanges, OnInit {
  @Input() public startTime: Date = new Date(0);
  @Input() public endTime: Date = new Date(10000);

  @Input() public zoom: number = 10;
  @Output() public zoomChanged: EventEmitter<number> = new EventEmitter();

  @Input() public time: Date = new Date(5000);
  @Output() public timeChanged: EventEmitter<Date> = new EventEmitter();

  public tracksWidth: number = 2000;
  public ticks: Tick[] = [];

  constructor() {}

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    this.tracksWidth = this.endTime.getTime() / this.zoom;

    const numOfTicks = Math.ceil(this.tracksWidth / this.zoom);
    this.ticks = new Array(numOfTicks).fill(0).map((_, index) => {
      return {
        time: new Date(index * 100 * this.zoom),
        left: index * 100,
      };
    });
  }
}
