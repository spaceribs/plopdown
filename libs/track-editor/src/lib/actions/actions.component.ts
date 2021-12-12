import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  mdiSkipNext,
  mdiSkipPrevious,
  mdiPlay,
  mdiRewind10,
  mdiFastForward10,
  mdiPlus,
  mdiMinus,
  mdiPause,
  mdiMagnify,
} from '@mdi/js';

@Component({
  selector: 'plopdown-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  public mdiMagnify = mdiMagnify;

  public mdiSkipNext = mdiSkipNext;
  public mdiRewind10 = mdiRewind10;
  public mdiPlay = mdiPlay;
  public mdiPause = mdiPause;
  public mdiFastForward10 = mdiFastForward10;
  public mdiSkipPrevious = mdiSkipPrevious;

  @Input() playing: boolean = false;

  @Input() endTime: number = 0;

  @Input() zoom: number = 0;
  @Output() zoomChange: EventEmitter<number> = new EventEmitter();

  @Input() time: number = 0;
  @Output() timeChange: EventEmitter<number> = new EventEmitter();

  @Output() playPause: EventEmitter<void> = new EventEmitter();
}
