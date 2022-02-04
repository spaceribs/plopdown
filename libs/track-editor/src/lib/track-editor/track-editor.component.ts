import { Layer } from './../layer/layer.models';
import { PlopdownFile, PlopdownFileHeaders } from '@plopdown/plopdown-file';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Cue, PlopdownTemplateType } from '@plopdown/plopdown-cues';
import { v4 } from 'uuid';
import { CueTemplates } from './track-editor.cue-templates';

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

  constructor(private cd: ChangeDetectorRef) {}

  public updateHeaders(headers: PlopdownFileHeaders) {
    if (this.plopdownFile != null) {
      this.plopdownFileChange.emit({ ...this.plopdownFile, headers });
    }
  }

  public updateCue(cue: Cue) {
    if (this.plopdownFile == null) {
      return;
    }
    const cueIndex = this.plopdownFile.cues.findIndex((existingCue) => {
      return existingCue.id === cue.id;
    });
    const cues = [...this.plopdownFile.cues];

    if (cueIndex !== -1) {
      const newCue = { ...cue };
      cues[cueIndex] = newCue;
      this.cueSelected = newCue;
    }

    const file = { ...this.plopdownFile, cues };

    this.plopdownFileChange.emit(file);
    this.plopdownFile = file;

    this.cd.detectChanges();
  }

  addCue(type: PlopdownTemplateType) {
    if (this.plopdownFile == null) {
      return;
    }

    const newCue: Cue = {
      id: v4({}),
      layer: this.cueSelected?.layer || this.layers[0].id,
      startTime: this.currentTime,
      endTime: this.currentTime + 1000,
      data: {
        ...CueTemplates[type],
      },
    };

    console.log(newCue);

    const cues: Cue[] = [...this.plopdownFile.cues, newCue];

    const file = { ...this.plopdownFile, cues };

    this.plopdownFileChange.emit(file);
    this.plopdownFile = file;

    this.cueSelectedChange.emit(newCue);
    this.cueSelected = newCue;

    this.cd.detectChanges();
  }

  duplicateCue(cue: Cue) {
    if (this.plopdownFile == null) {
      return;
    }

    const newCue: Cue = {
      ...cue,
      id: `${cue.id} Copy`,
      data: { ...cue.data },
      startTime: cue.endTime,
      endTime: cue.endTime + (cue.endTime - cue.startTime),
    };

    const cues: Cue[] = [...this.plopdownFile.cues, newCue];

    const file = { ...this.plopdownFile, cues };

    this.plopdownFileChange.emit(file);
    this.plopdownFile = file;

    this.cueSelectedChange.emit(newCue);
    this.cueSelected = newCue;

    this.cd.detectChanges();
  }

  removeCue(selectedCue: Cue) {
    if (this.plopdownFile == null) {
      return;
    }

    const cues = this.plopdownFile.cues.filter((cue) => {
      return cue !== selectedCue;
    });

    const file = { ...this.plopdownFile, cues };

    this.plopdownFileChange.emit(file);
    this.plopdownFile = file;

    this.cueSelectedChange.emit(null);
    this.cueSelected = null;

    this.cd.detectChanges();
  }
}
