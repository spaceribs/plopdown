import { Subject, Subscription, Observable, fromEvent } from 'rxjs';
import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Layer } from '../layer/layer.models';
import {
  map,
  switchMap,
  takeUntil,
  startWith,
  distinctUntilChanged,
  share,
  sample,
} from 'rxjs/operators';
import { LayerElement } from '../element/element.models';

@Component({
  selector: 'plopdown-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayersComponent implements OnDestroy {
  private readonly subs: Subscription = new Subscription();

  @HostBinding('style.width.px')
  @Input()
  public width: number = 0;

  @Input() public zoom: number = 0;
  @Input() public totalTime: number = 0;

  @Input() public layerElements: LayerElement[] = [];
  @Output() public layerElementsChange: EventEmitter<LayerElement[]> =
    new EventEmitter();

  @Input() public layers: Layer[] = [];
  @Output() public layersChange: EventEmitter<Layer[]> = new EventEmitter();

  private readonly elemDragStart$: Subject<[LayerElement, Layer]> =
    new Subject();
  private readonly layerOver$: Subject<Layer> = new Subject();

  public overLayer$: Observable<Layer>;

  constructor() {
    this.overLayer$ = this.elemDragStart$.pipe(
      switchMap(([_, elemLayer]) => {
        return this.layerOver$.pipe(
          takeUntil(fromEvent(document, 'mouseup')),
          startWith(elemLayer)
        );
      }),
      distinctUntilChanged(),
      share()
    );

    const layerDropSub = this.elemDragStart$
      .pipe(
        switchMap(([elem, layer]) => {
          return this.overLayer$.pipe(
            sample(fromEvent(document, 'mouseup')),
            // filter((dropLayer) => dropLayer?.title === elem),
            map<Layer, [LayerElement, Layer]>((dropLayer) => [elem, dropLayer])
          );
        })
      )
      .subscribe(([elem, dropLayer]) => {
        if (dropLayer == null) {
          return;
        }
        elem.layer = dropLayer.id;
        this.layerElementsChange.emit(this.layerElements);
      });
    this.subs.add(layerDropSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public elemLayer(layer: Layer): LayerElement[] {
    return this.layerElements.filter((elem) => {
      return elem.layer === layer.id;
    });
  }

  public elemDragStart(elem: LayerElement, layer: Layer) {
    this.elemDragStart$.next([elem, layer]);
  }

  public layerOver(layer: Layer) {
    this.layerOver$.next(layer);
  }

  public elemTrackBy(_: number, elem: LayerElement) {
    return elem.id;
  }

  public layerTrackBy(_: number, layer: Layer) {
    return layer.id;
  }
}
