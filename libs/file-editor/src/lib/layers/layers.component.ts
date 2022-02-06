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
import { Cue } from '@plopdown/plopdown-cues';

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

  @Input() public cues: Cue[] = [];
  @Output() public cuesChange: EventEmitter<Cue[]> = new EventEmitter();

  @Input() public cueSelected: Cue | null = null;
  @Output() public cueSelectedChange: EventEmitter<Cue | null> =
    new EventEmitter();

  @Input() public layers: Layer[] = [];

  private readonly cueDragStart$: Subject<[Cue, Layer]> = new Subject();
  private readonly layerOver$: Subject<Layer> = new Subject();

  public overLayer$: Observable<Layer>;

  constructor() {
    this.overLayer$ = this.cueDragStart$.pipe(
      switchMap(([_, cueLayer]) => {
        return this.layerOver$.pipe(
          takeUntil(fromEvent(document, 'mouseup')),
          startWith(cueLayer)
        );
      }),
      distinctUntilChanged(),
      share()
    );

    const layerDropSub = this.cueDragStart$
      .pipe(
        switchMap(([cue, layer]) => {
          return this.overLayer$.pipe(
            sample(fromEvent(document, 'mouseup')),
            // filter((dropLayer) => dropLayer?.title === cue),
            map<Layer, [Cue, Layer]>((dropLayer) => [cue, dropLayer])
          );
        })
      )
      .subscribe(([cue, dropLayer]) => {
        if (dropLayer == null) {
          return;
        }
        cue.layer = dropLayer.id;
        this.cuesChange.emit(this.cues);
      });
    this.subs.add(layerDropSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public cueLayer(layer: Layer): Cue[] {
    return this.cues.filter((cue) => {
      return cue.layer === layer.id;
    });
  }

  public cueDragStart(cue: Cue, layer: Layer) {
    this.cueDragStart$.next([cue, layer]);
  }

  public layerOver(layer: Layer) {
    this.layerOver$.next(layer);
  }

  public cueTrackBy(_: number, cue: Cue) {
    return cue.id;
  }

  public layerTrackBy(_: number, layer: Layer) {
    return layer.id;
  }

  public startTimeUpdate(cue: Cue, startTime: number) {
    cue.startTime = startTime;
    this.cuesChange.emit(this.cues);
  }

  public endTimeUpdate(cue: Cue, endTime: number) {
    cue.endTime = endTime;
    this.cuesChange.emit(this.cues);
  }
}
