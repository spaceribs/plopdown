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
  mdiPause,
  mdiMagnify,
  mdiCommentRemove,
  mdiCommentPlus,
  mdiCommentMultiple,
} from '@mdi/js';
import { Cue, PlopdownTemplateType } from '@plopdown/plopdown-cues';

@Component({
  selector: 'plopdown-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  public mdiSkipNext = mdiSkipNext;
  public mdiRewind10 = mdiRewind10;
  public mdiPlay = mdiPlay;
  public mdiPause = mdiPause;
  public mdiFastForward10 = mdiFastForward10;
  public mdiSkipPrevious = mdiSkipPrevious;

  public mdiMagnify = mdiMagnify;

  public mdiCommentPlus = mdiCommentPlus;
  public mdiCommentRemove = mdiCommentRemove;
  public mdiCommentMultiple = mdiCommentMultiple;

  public PlopdownTemplateType = PlopdownTemplateType;

  public newCueType = PlopdownTemplateType.Plop;

  @Input() playing: boolean = false;

  @Input() endTime: number = 0;

  @Input() zoom: number = 0;
  @Output() zoomChange: EventEmitter<number> = new EventEmitter();

  @Input() time: number = 0;
  @Output() timeChange: EventEmitter<number> = new EventEmitter();

  @Input() public cueSelected: Cue | null = null;

  @Output() playPause: EventEmitter<void> = new EventEmitter();
  @Output() addCue: EventEmitter<PlopdownTemplateType> = new EventEmitter();
  @Output() removeCue: EventEmitter<Cue> = new EventEmitter();
  @Output() duplicateCue: EventEmitter<Cue> = new EventEmitter();
}
