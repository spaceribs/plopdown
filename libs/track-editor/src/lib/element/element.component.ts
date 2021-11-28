import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { animationFrameScheduler, fromEvent, Subscription } from 'rxjs';
import {
  map,
  switchMap,
  takeUntil,
  throttleTime,
  pluck,
  filter,
  mapTo,
  sample,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'plopdown-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementComponent implements AfterViewInit, OnDestroy {
  private subs: Subscription = new Subscription();

  @Input() public zoom: number = 0;
  @Input() public totalTime: number = 0;

  @Input() public start: number = 0;
  @Output() public startChange: EventEmitter<number> = new EventEmitter();

  @Input() public end: number = 0;
  @Output() public endChange: EventEmitter<number> = new EventEmitter();

  @HostBinding('attr.tabindex') public tabIndex = 0;

  @Input()
  @HostBinding('style.background-color')
  public color: string = '#0F0';

  @HostBinding('style.left.px')
  public get left(): number {
    return this.start / this.zoom;
  }

  @HostBinding('style.right.px')
  public get right(): number {
    return (this.totalTime - this.end) / this.zoom;
  }

  @HostListener('click', ['$event'])
  public onClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  @ViewChild('dragLeft')
  private dragLeft: ElementRef<HTMLSpanElement> | null = null;

  @ViewChild('dragRight')
  private dragRight: ElementRef<HTMLSpanElement> | null = null;

  @ViewChild('dragAll')
  private dragAll: ElementRef<HTMLDivElement> | null = null;

  @Output() public draggingElement: EventEmitter<null> = new EventEmitter();

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private zone: NgZone
  ) {}

  public ngAfterViewInit(): void {
    if (
      this.dragLeft == null ||
      this.dragRight == null ||
      this.dragAll == null
    ) {
      throw new Error('Drag Elements not found');
    }

    const dragLeftElem = this.dragLeft.nativeElement;
    const dragRightElem = this.dragRight.nativeElement;
    const dragAllElem = this.dragAll.nativeElement;

    this.zone.runOutsideAngular(() => {
      const drag$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
        pluck<MouseEvent, number>('clientX'),
        throttleTime(15, animationFrameScheduler, { trailing: true }),
        distinctUntilChanged(),
        filter((clientX) => clientX > 0)
      );

      const dragLeftStart$ = fromEvent<MouseEvent>(
        dragLeftElem,
        'mousedown'
      ).pipe(
        tap((event) => event.stopPropagation),
        pluck<MouseEvent, number>('clientX')
      );

      const dragRightStart$ = fromEvent<MouseEvent>(
        dragRightElem,
        'mousedown'
      ).pipe(
        tap((event) => event.stopPropagation),
        pluck<MouseEvent, number>('clientX')
      );

      const dragElemStart$ = fromEvent<MouseEvent>(
        dragAllElem,
        'mousedown'
      ).pipe(pluck<MouseEvent, number>('clientX'));

      const dragEnd$ = fromEvent(document, 'mouseup');

      const dragLeftMove$ = dragLeftStart$.pipe(
        switchMap((startX) => {
          return drag$.pipe(
            map((dragX) => {
              let dragPos = dragX - startX;
              return dragPos;
            }),
            takeUntil(dragEnd$)
          );
        })
      );

      const dragRightMove$ = dragRightStart$.pipe(
        switchMap((startX) => {
          return drag$.pipe(
            map((dragX) => {
              let dragPos = startX - dragX;
              return dragPos;
            }),
            takeUntil(dragEnd$)
          );
        })
      );

      const dragElemMove$ = dragElemStart$.pipe(
        switchMap((startX) => {
          return drag$.pipe(
            map((dragX) => {
              let dragPos = startX - dragX;
              return dragPos;
            }),
            takeUntil(dragEnd$)
          );
        })
      );

      const finalLeftPos$ = dragLeftMove$.pipe(
        sample(dragEnd$),
        map((offset) => {
          return this.start + offset * this.zoom;
        })
      );

      const finalRightPos$ = dragRightMove$.pipe(
        sample(dragEnd$),
        map((offset) => {
          return this.end - offset * this.zoom;
        })
      );

      const finalElemPos$ = dragElemMove$.pipe(
        sample(dragEnd$),
        map((offset) => {
          return [
            this.start - offset * this.zoom,
            this.end - offset * this.zoom,
          ];
        })
      );

      const dragLeftSub = dragLeftMove$.subscribe((offset) => {
        this.renderer.setStyle(
          this.element.nativeElement,
          'margin-left',
          `${offset}px`
        );
      });
      this.subs.add(dragLeftSub);

      const dragRightSub = dragRightMove$.subscribe((offset) => {
        this.renderer.setStyle(
          this.element.nativeElement,
          'margin-right',
          `${offset}px`
        );
      });
      this.subs.add(dragRightSub);

      const dragElemSub = dragElemMove$.subscribe((offset) => {
        this.renderer.setStyle(
          this.element.nativeElement,
          'transform',
          `translateX(${-offset}px)`
        );
      });
      this.subs.add(dragElemSub);

      const finalLeftSub = finalLeftPos$.subscribe((finalLeft) => {
        this.renderer.setStyle(this.element.nativeElement, 'margin-left', null);
        this.startChange.emit(finalLeft);
      });
      this.subs.add(finalLeftSub);

      const finalRightSub = finalRightPos$.subscribe((finalRight) => {
        this.renderer.removeStyle(this.element.nativeElement, 'margin-right');
        this.endChange.emit(finalRight);
      });
      this.subs.add(finalRightSub);

      const finalElemSub = finalElemPos$.subscribe(
        ([finalLeft, finalRight]) => {
          this.renderer.removeStyle(this.element.nativeElement, 'transform');
          this.startChange.emit(finalLeft);
          this.endChange.emit(finalRight);
        }
      );
      this.subs.add(finalElemSub);

      const emitDraggingStartSub = dragElemStart$.subscribe(() => {
        this.draggingElement.emit();
      });
      this.subs.add(emitDraggingStartSub);
    });
  }
}
