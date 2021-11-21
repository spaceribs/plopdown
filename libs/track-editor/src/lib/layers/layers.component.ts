import { Subject, Subscription, Observable, fromEvent } from 'rxjs';
import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Layer } from '../layer/layer.models';
import { filter, map, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { LayerElement } from '../element/element.models';

@Component({
  selector: 'plopdown-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss'],
})
export class LayersComponent implements OnDestroy {
  private readonly subs: Subscription = new Subscription();

  @HostBinding('style.width.px')
  @Input()
  public width: number = 0;

  @Input() public zoom: number = 0;
  @Input() public totalTime: Date = new Date(0);

  @Input() public layers: Layer[] = [];
  @Output() public layersChange: EventEmitter<Layer[]> = new EventEmitter();

  private readonly elemDragStart$: Subject<[LayerElement, Layer]> =
    new Subject();
  private readonly layerDrop$: Subject<Layer> = new Subject();
  private readonly layerOver$: Subject<Layer> = new Subject();

  public overLayer$: Observable<Layer | null>;

  constructor() {
    this.overLayer$ = this.elemDragStart$.pipe(
      switchMap(([_, elemLayer]) => {
        return this.layerOver$.pipe(
          takeUntil(fromEvent(document, 'mouseup')),
          startWith(elemLayer)
        );
      }),
      startWith(null)
    );

    const layerDropSub = this.elemDragStart$
      .pipe(
        switchMap(([elem, elemLayer]) => {
          return this.layerDrop$.pipe(
            takeUntil(fromEvent(document, 'mouseup')),
            filter((dropLayer) => dropLayer !== elemLayer),
            map<Layer, [[LayerElement, Layer], Layer]>((dropLayer) => [
              [elem, elemLayer],
              dropLayer,
            ])
          );
        })
      )
      .subscribe(([[elem, elemLayer], dropLayer]) => {
        const currentIndex = elemLayer.elements.indexOf(elem);
        elemLayer.elements.splice(currentIndex, 1);
        dropLayer.elements.push(elem);
        this.layersChange.emit(this.layers);
      });
    this.subs.add(layerDropSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public elemDragStart($event: MouseEvent, elem: LayerElement, layer: Layer) {
    $event.stopPropagation();
    this.elemDragStart$.next([elem, layer]);
  }

  public layerDrop(layer: Layer) {
    this.layerDrop$.next(layer);
  }

  public layerOver(layer: Layer) {
    this.layerOver$.next(layer);
  }
}
