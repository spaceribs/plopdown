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

  @Input() public zoom: number = 10;
  @Output() public zoomChange: EventEmitter<number> = new EventEmitter();

  @Input() public time: number = 0;
  @Output() public timeChange: EventEmitter<number> = new EventEmitter();

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

  public get timePosition(): number {
    return this.time / this.zoom;
  }

  public get scrollWidth(): number {
    return this.endTime / this.zoom;
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

    this.layers.push({
      id: this.addLayerForm.value.id,
      readonly: false,
    });

    this.addLayerForm.reset();
  }

  public setLayerId(layer: Layer, event: Event) {
    event.preventDefault();

    if (event.target == null) {
      return;
    }

    const newId = (event.target as any).innerText.trim();

    this.cues
      .filter((elem) => elem.layer === layer.id)
      .forEach((elem) => {
        elem.layer = newId;
      });

    layer.id = newId;

    if (layer.id === '') {
      this.removeLayer(layer);
    }

    this.cuesChange.emit(this.cues);
    this.layersChange.emit(this.layers);
  }

  public removeLayer(layer: Layer) {
    const index = this.layers.indexOf(layer);
    this.layers.splice(index, 1);
    this.layersChange.emit(this.layers);
  }

  public moveLayerUp(layer: Layer) {
    const fromIndex = this.layers.indexOf(layer);
    const toIndex = fromIndex - 1;
    this.layers.splice(fromIndex, 1);
    this.layers.splice(toIndex, 0, layer);
    this.layersChange.emit(this.layers);
  }

  public moveLayerDown(layer: Layer) {
    const fromIndex = this.layers.indexOf(layer);
    const toIndex = fromIndex + 1;
    this.layers.splice(fromIndex, 1);
    this.layers.splice(toIndex, 0, layer);
    this.layersChange.emit(this.layers);
  }
}
