import { bounceIn } from 'ng-animate';
import {
  Observable,
  Subject,
  ReplaySubject,
  combineLatest,
  BehaviorSubject,
  merge,
  fromEvent,
  animationFrameScheduler
} from 'rxjs';
import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  map,
  switchMap,
  debounceTime,
  mapTo,
  tap,
  distinct
} from 'rxjs/operators';
import {
  trigger,
  transition,
  useAnimation,
  sequence,
  group,
  style,
  animate,
  state
} from '@angular/animations';

@Component({
  selector: 'plopdown-video-overlay',
  templateUrl: './video-overlay.component.html',
  styleUrls: ['./video-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('videoOutline', [
      transition(
        'void => *',
        sequence([
          // useAnimation(fadeOut, {
          //   params: { timing: 0.2 }
          // }),
          style({
            'box-shadow': 'inset 0 0 0 3px lightgreen',
            'background-color': 'rgb(144, 238, 144, 0.2)'
          }),
          useAnimation(bounceIn, {
            params: { timing: 0.4 }
          }),
          animate(
            '1s',
            style({
              'box-shadow': 'inset 0 0 0 3px transparent',
              'background-color': 'transparent'
            })
          )
        ])
      )
    ])
  ]
})
export class VideoOverlayComponent {
  private manualReposition$: Subject<void> = new BehaviorSubject(null);
  private videoElem$: Subject<HTMLVideoElement> = new ReplaySubject(1);
  public styles$: Observable<{ overlay: object; stage: object }>;

  @Input() public set videoElem(elem: HTMLVideoElement | null) {
    if (elem) {
      this.videoElem$.next(elem);
    }
  }

  constructor(cd: ChangeDetectorRef) {
    const positionOverlay$ = this.videoElem$.pipe(
      switchMap(elem => {
        return merge([
          this.manualReposition$.asObservable(),
          fromEvent(elem, 'play'),
          fromEvent(elem, 'load'),
          fromEvent(elem, 'resize'),
          fromEvent(elem, 'mousemove')
        ]).pipe(mapTo(elem));
      }),
      debounceTime(200, animationFrameScheduler)
    );

    const aspectRatio$ = positionOverlay$.pipe(
      map(elem => {
        return elem.videoWidth / elem.videoHeight;
      }),
      distinct()
    );

    const letterboxedWidth$ = combineLatest([
      positionOverlay$,
      aspectRatio$
    ]).pipe(
      map(([elem, aspectRatio]) => {
        if (elem.offsetWidth <= elem.offsetHeight * aspectRatio) {
          return elem.offsetWidth;
        }
        return elem.offsetHeight * aspectRatio;
      }),
      distinct()
    );

    const letterboxedHeight$ = combineLatest([
      positionOverlay$,
      aspectRatio$
    ]).pipe(
      map(([elem, aspectRatio]) => {
        if (elem.offsetWidth <= elem.offsetHeight * aspectRatio) {
          return elem.offsetWidth / aspectRatio;
        }
        return elem.offsetHeight;
      }),
      distinct()
    );

    const fontSize$ = positionOverlay$.pipe(
      map(elem => {
        return elem.offsetHeight / 44;
      }),
      distinct()
    );

    const overlayStyle$ = combineLatest([positionOverlay$, fontSize$]).pipe(
      map(([elem, fontSize]) => {
        return {
          'width.px': elem.offsetWidth,
          'height.px': elem.offsetHeight,
          'left.px': elem.offsetLeft,
          'top.px': elem.offsetTop,
          'font-size.px': fontSize
        };
      })
    );

    const stageStyle$ = combineLatest([
      letterboxedWidth$,
      letterboxedHeight$
    ]).pipe(
      map(([width, height]) => {
        return {
          'width.px': width,
          'height.px': height
        };
      })
    );

    this.styles$ = combineLatest([overlayStyle$, stageStyle$]).pipe(
      map(([overlay, stage]) => {
        return { overlay, stage };
      }),
      tap(() =>
        // TODO: had to force changes after tick.
        setTimeout(() => {
          cd.detectChanges();
        }, 0)
      )
    );
  }
}
