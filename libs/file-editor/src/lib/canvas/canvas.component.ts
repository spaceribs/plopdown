import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, throttleTime } from 'rxjs/operators';
import { Layer } from './../layer/layer.models';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, animationFrameScheduler, Subscription } from 'rxjs';
import { mdiArrowDown, mdiArrowUp, mdiClose } from '@mdi/js';
import { Cue } from '@plopdown/plopdown-cues';

@Component({
  selector: 'plopdown-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements OnDestroy {
  private readonly subs: Subscription = new Subscription();

  public mdiClose = mdiClose;
  public mdiArrowUp = mdiArrowUp;
  public mdiArrowDown = mdiArrowDown;

  @Input() public cues: Cue[] = [];
  @Output() public cuesChange: EventEmitter<Cue[]> = new EventEmitter();

  @Input() public layers: Layer[] = [];
  @Output() public layersChange: EventEmitter<Layer[]> = new EventEmitter();

  @Input() public startTime: number = 0;
  @Input() public endTime: number = 0;

  @Input() public cueSelected: Cue | null = null;
  @Output() public cueSelectedChange: EventEmitter<Cue | null> =
    new EventEmitter();

  @Input() public zoom: number = 10;
  @Output() public zoomChange: EventEmitter<number> = new EventEmitter();

  @Input() public time: number = 0;
  @Output() public timeChange: EventEmitter<number> = new EventEmitter();

  public hintTime: number = 0;

  @ViewChild('scrollBox')
  public scrollBox: ElementRef<HTMLDivElement> | null = null;

  public addLayerForm: FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
  });

  private readonly zoomUpdate$: Subject<number> = new Subject();

  constructor() {
    const zoomUpdateSub = this.zoomUpdate$
      .pipe(
        filter((delta) => delta > 10 || delta < -10),
        throttleTime(60, animationFrameScheduler, {
          leading: true,
          trailing: true,
        })
      )
      .subscribe((delta) => {
        const newZoom = delta < 0 ? this.zoom - 1 : this.zoom + 1;
        if (newZoom > 1) {
          this.zoomChange.emit(newZoom);
        }
      });
    this.subs.add(zoomUpdateSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get hintTimePosition(): number {
    return this.hintTime / this.zoom;
  }

  public get timePosition(): number {
    return this.time / this.zoom;
  }

  public get scrollWidth(): number {
    return this.endTime / this.zoom;
  }

  public setHintTime(event: MouseEvent) {
    const relativeLeft = event.pageX;

    const boxRect = this.scrollBox?.nativeElement.getBoundingClientRect();
    const scrollWidth = this.scrollBox?.nativeElement.scrollWidth;

    if (scrollWidth != null && boxRect != null) {
      const ratio = (relativeLeft - boxRect.x) / scrollWidth;
      this.hintTime = this.endTime * ratio;
    }
  }

  public setTime(event: MouseEvent) {
    const relativeLeft = event.offsetX;
    const scrollWidth = this.scrollBox?.nativeElement.scrollWidth;
    if (scrollWidth != null) {
      const ratio = relativeLeft / scrollWidth;
      this.timeChange.emit(this.endTime * ratio);
    }
  }

  public zoomScroll(event: WheelEvent) {
    this.zoomUpdate$.next(event.deltaY);
  }

  public addLayer(event: Event) {
    event.preventDefault();

    if (this.addLayerForm.valid != true) {
      return;
    }

    const layers = [...this.layers];

    layers.push({
      id: this.addLayerForm.value.id,
      readonly: false,
    });

    this.addLayerForm.reset();

    this.layersChange.emit(layers);
  }

  public setLayerId(oldLayer: Layer, event: Event) {
    event.preventDefault();

    if (event.target == null) {
      return;
    }

    const layers = [...this.layers];
    const index = layers.indexOf(oldLayer);
    const layer = { ...oldLayer };

    layers.splice(index, 1, layer);

    const newId = (event.target as any).innerText.trim();

    const cues = this.cues.map((oldCue) => {
      if (oldCue.layer === layer.id) {
        const cue = { ...oldCue };
        cue.layer = newId;
        return cue;
      }
      return oldCue;
    });

    layer.id = newId;

    if (layer.id === '') {
      this.removeLayer(layer);
      return;
    }

    this.cuesChange.emit(cues);
    this.layersChange.emit(layers);
  }

  public removeLayer(layer: Layer) {
    const layers = [...this.layers];

    const index = layers.indexOf(layer);

    const cues = this.cues.map((oldCue) => {
      if (oldCue.layer === layer.id) {
        const cue = { ...oldCue };
        cue.layer = layers[index - 1].id;
        return cue;
      }
      return oldCue;
    });

    layers.splice(index, 1);

    this.cuesChange.emit(cues);
    this.layersChange.emit(layers);
  }

  public moveLayerUp(layer: Layer) {
    const layers = [...this.layers];

    const fromIndex = layers.indexOf(layer);
    const toIndex = fromIndex - 1;

    layers.splice(fromIndex, 1);
    layers.splice(toIndex, 0, layer);

    this.layersChange.emit(layers);
  }

  public moveLayerDown(layer: Layer) {
    const layers = [...this.layers];

    const fromIndex = layers.indexOf(layer);
    const toIndex = fromIndex + 1;

    layers.splice(fromIndex, 1);
    layers.splice(toIndex, 0, layer);

    this.layersChange.emit(layers);
  }

  public layerTrackBy(_: number, layer: Layer) {
    return layer.id;
  }

  public deselectCue(event: MouseEvent) {
    this.cueSelectedChange.emit(null);
  }
}
