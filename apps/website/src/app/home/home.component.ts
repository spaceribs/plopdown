import { PlyrService } from './plyr.service';
import { PlopdownEmbedComponent } from '@plopdown/plopdown-embed';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  OnDestroy,
  ComponentRef,
  ErrorHandler,
} from '@angular/core';
import {
  map,
  switchMap,
  first,
  shareReplay,
  withLatestFrom,
} from 'rxjs/operators';
import { PlopdownFile, PlopdownFileService } from '@plopdown/plopdown-file';
import { Track } from '@plopdown/tracks';
import { Observable, Subscription, Subject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'plopdown-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  public readonly overlayComponent$: Observable<
    ComponentRef<PlopdownEmbedComponent>
  >;
  public subs: Subscription = new Subscription();
  public currentDate: Date;

  @ViewChild('exampleVideo')
  exampleVideo: ElementRef<HTMLVideoElement> | null = null;

  public plyr: Plyr | null = null;

  private tracks$: Observable<Track[]>;
  private track$: Subject<Track | null> = new ReplaySubject(1);
  private initTrack$: Subject<void> = new Subject();
  private removeTrack$: Subject<void> = new Subject();

  constructor(
    http: HttpClient,
    fileService: PlopdownFileService,
    private plyrService: PlyrService,
    private appRef: ApplicationRef,
    private errorHandler: ErrorHandler,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.currentDate = new Date();

    const overlayFactory = this.componentFactoryResolver.resolveComponentFactory(
      PlopdownEmbedComponent
    );

    this.tracks$ = http
      .get('/assets/minnie_facts.vtt', {
        responseType: 'text',
      })
      .pipe(
        map((raw) => {
          const file: PlopdownFile = fileService.decode(raw);

          const track: Track = {
            _id: 'f2c311a4-e4f8-471d-9882-2a98eabbecee',
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            cues: file.cues,
          };

          return [track];
        }),
        shareReplay(1)
      );

    this.overlayComponent$ = this.initTrack$.pipe(
      switchMap(() => {
        return this.tracks$;
      }),
      map((tracks) => {
        const componentRef = overlayFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        componentRef.instance.tracks = tracks;
        componentRef.instance.track = tracks[0];
        if (this.exampleVideo != null) {
          componentRef.instance.videoElem = this.exampleVideo.nativeElement;
        }
        componentRef.changeDetectorRef.detectChanges();

        return componentRef;
      }),
      shareReplay(1)
    );

    const removeSub = this.overlayComponent$
      .pipe(
        switchMap((componentRef) => {
          return componentRef.instance.remove.asObservable();
        })
      )
      .subscribe({
        next: () => {
          this.removeTrack$.next();
        },
        error: (err) => {
          errorHandler.handleError(err);
        },
      });
    this.subs.add(removeSub);

    const setTrackSub = this.track$
      .pipe(withLatestFrom(this.overlayComponent$))
      .subscribe({
        next: ([track, component]) => {
          component.instance.track = track;
        },
      });
    this.subs.add(setTrackSub);

    const trackChangeSub = this.overlayComponent$
      .pipe(
        switchMap((componentRef) => {
          return componentRef.instance.trackChange.asObservable();
        })
      )
      .subscribe({
        next: (track) => {
          this.track$.next(track);
        },
      });
    this.subs.add(trackChangeSub);

    const attachOverlaySub = this.overlayComponent$.subscribe({
      next: (componentRef) => {
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
        this.exampleVideo?.nativeElement?.parentNode?.appendChild(domElem);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(attachOverlaySub);

    const detachOverlaySub = this.removeTrack$
      .pipe(switchMap(() => this.overlayComponent$.pipe(first())))
      .subscribe({
        next: (componentRef) => {
          const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
          domElem.remove();
          componentRef.destroy();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(detachOverlaySub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.exampleVideo == null) {
      return;
    }

    this.plyr = this.plyrService.create(this.exampleVideo.nativeElement);
    this.initTrack();
  }

  public initTrack() {
    this.initTrack$.next();
  }
}
