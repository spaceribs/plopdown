import { Component, Output, EventEmitter, Input } from '@angular/core';
import {
  mdiSkipNext,
  mdiSkipPrevious,
  mdiPlay,
  mdiRewind10,
  mdiFastForward10,
  mdiPlus,
  mdiMinus,
  mdiPause,
} from '@mdi/js';

@Component({
  selector: 'plopdown-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  public mdiPlus = mdiPlus;
  public mdiMinus = mdiMinus;

  public mdiSkipNext = mdiSkipNext;
  public mdiRewind10 = mdiRewind10;
  public mdiPlay = mdiPlay;
  public mdiPause = mdiPause;
  public mdiFastForward10 = mdiFastForward10;
  public mdiSkipPrevious = mdiSkipPrevious;

  @Input() playing: boolean = false;

  @Output() gotoStart: EventEmitter<void> = new EventEmitter();
  @Output() rewind: EventEmitter<number> = new EventEmitter();
  @Output() playPause: EventEmitter<void> = new EventEmitter();
  @Output() fastForward: EventEmitter<number> = new EventEmitter();
  @Output() gotoEnd: EventEmitter<void> = new EventEmitter();

  @Output() zoomIn: EventEmitter<void> = new EventEmitter();
  @Output() zoomReset: EventEmitter<void> = new EventEmitter();
  @Output() zoomOut: EventEmitter<void> = new EventEmitter();
}
