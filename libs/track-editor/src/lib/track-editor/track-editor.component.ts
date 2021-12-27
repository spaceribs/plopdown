import { Layer } from './../layer/layer.models';
import { PlopdownFile, PlopdownFileHeaders } from '@plopdown/plopdown-file';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Cue } from '@plopdown/plopdown-cues';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackEditorComponent {
  @Input() public currentTime: number = 0;
  @Input() public endTime: number = 0;

  @Input() public zoom: number = 10;
  @Output() public zoomChange: EventEmitter<Date> = new EventEmitter();

  @Input() public plopdownFile: PlopdownFile | null = null;
  @Output() public plopdownFileChange: EventEmitter<PlopdownFile> =
    new EventEmitter();

  @Input() public layers: Layer[] = [];
  @Output() public layersChange: EventEmitter<Layer[]> = new EventEmitter();

  @Input() public cueSelected: Cue | null = null;
  @Output() public cueSelectedChange: EventEmitter<Cue | null> =
    new EventEmitter();

  public updateHeaders(headers: PlopdownFileHeaders) {
    if (this.plopdownFile != null) {
      this.plopdownFileChange.emit({ ...this.plopdownFile, headers });
    }
  }

  public updateCue(cue: Cue) {
    if (this.plopdownFile != null) {
      const cueIndex = this.plopdownFile.cues.indexOf(cue);
      const cues = [ ...this.plopdownFile.cues ];

      if (cueIndex !== -1) {
        cues[cueIndex] = { ...cue };
      }

      const file = { ...this.plopdownFile, cues };
      this.plopdownFileChange.emit(file);
      this.plopdownFile = file;
    }
  }
}
