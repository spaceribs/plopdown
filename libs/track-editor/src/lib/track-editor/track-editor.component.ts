import { LayerElement } from './../element/element.models';
import { PlopdownFile } from '@plopdown/plopdown-file';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { VideoStatus } from '../track-editor.models';

@Component({
  selector: 'plopdown-track-editor',
  templateUrl: './track-editor.component.html',
  styleUrls: ['./track-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackEditorComponent {
  @Input() public zoom: number = 10;
  @Output() public zoomChange: EventEmitter<Date> = new EventEmitter();

  @Input() public video: VideoStatus | null = null;

  @Input() public plopdownFile: PlopdownFile | null = null;
  @Output() public plopdownFileChange: EventEmitter<PlopdownFile> =
    new EventEmitter();

  public get layerElements(): LayerElement[] {
    const layerElements: LayerElement[] = [];

    if (this.video != null) {
      layerElements.push(this.video);
    }

    if (this.plopdownFile?.cues != null) {
      layerElements.push(...this.plopdownFile.cues);
    }

    return layerElements;
  }

  public set layerElements(layerElements: LayerElement[]) {
    console.log(layerElements);
  }
}
