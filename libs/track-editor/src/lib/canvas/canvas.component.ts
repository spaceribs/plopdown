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
import { LayerElement } from '../element/element.models';

@Component({
  selector: 'plopdown-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements OnDestroy {
  private readonly subs: Subscription = new Subscription();

  @Input() public layerElements: LayerElement[] = [];
  @Output() public layerElementsChange: EventEmitter<LayerElement[]> =
    new EventEmitter();

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
}
