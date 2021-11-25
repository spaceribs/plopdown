import { Layer } from './../layer/layer.models';
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

  public get layers(): Layer[] {
    const layers: Layer[] = [];

    if (this.video != null) {
      layers.push({
        readonly: true,
        title: 'Video',
        elements: [this.video],
      });
    }

    if (this.plopdownFile != null) {
      const newLayers = this.plopdownFile.cues.reduce((layers, cue) => {
        const existingLayer = layers.find((layer) => layer.title === cue.layer);

        if (existingLayer == null) {
          layers.push({
            readonly: false,
            title: cue.layer,
            elements: [cue],
          });
        } else {
          existingLayer.elements.push(cue);
        }

        return layers;
      }, [] as Layer[]);

      layers.push(...newLayers);
    }

    return layers;
  }

  public set layers(value: Layer[]) {}
}
