import { PlyrService } from './plyr.service';
import { StageComponent } from '@plopdown/plopdown-embed';
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
} from '@angular/core';
import { map, switchMap, first, shareReplay } from 'rxjs/operators';
import { PlopdownFile, PlopdownFileService } from '@plopdown/plopdown-file';
import { Track } from '@plopdown/tracks';
import { Observable, Subscription, Subject } from 'rxjs';
import { VIDEO_ELEM_TOKEN, TRACK_TOKEN } from '@plopdown/tokens';

@Component({
  selector: 'plopdown-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  public readonly track$: Observable<Track>;
  public readonly overlayComponent$: Observable<ComponentRef<StageComponent>>;
  public subs: Subscription = new Subscription();
  public currentDate: Date;

  @ViewChild('exampleVideo') exampleVideo: ElementRef<HTMLVideoElement>;
  public plyr: Plyr;

  private initTrack$: Subject<void> = new Subject();
  private removeTrack$: Subject<void> = new Subject();

  constructor(
    http: HttpClient,
    fileService: PlopdownFileService,
    private plyrService: PlyrService,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.currentDate = new Date();

    const overlayFactory = this.componentFactoryResolver.resolveComponentFactory(
      StageComponent
    );

    this.track$ = http
      .get('/assets/minnie_facts.vtt', {
        responseType: 'text',
      })
      .pipe(
        map((raw) => {
          const file: PlopdownFile = fileService.decode(raw);

          const track: Track = {
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            cues: file.cues,
          };

          return track;
        })
      );

    this.overlayComponent$ = this.initTrack$.pipe(
      switchMap(() => {
        return this.track$;
      }),
      map((track) => {
        const componentInjector = Injector.create({
          providers: [
            {
              provide: VIDEO_ELEM_TOKEN,
              useValue: this.exampleVideo.nativeElement,
            },
            {
              provide: TRACK_TOKEN,
              useValue: track,
            },
          ],
        });
        const componentRef = overlayFactory.create(componentInjector);
        this.appRef.attachView(componentRef.hostView);

        const removeSub = componentRef.instance.remove.subscribe(() => {
          this.removeTrack$.next();
        });
        this.subs.add(removeSub);
        componentRef.changeDetectorRef.detectChanges();

        return componentRef;
      }),
      shareReplay(1)
    );

    const attachOverlaySub = this.overlayComponent$.subscribe(
      (componentRef) => {
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
        this.exampleVideo.nativeElement.parentNode.appendChild(domElem);
      }
    );
    this.subs.add(attachOverlaySub);

    const detachOverlaySub = this.removeTrack$
      .pipe(switchMap(() => this.overlayComponent$.pipe(first())))
      .subscribe((componentRef) => {
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
        domElem.remove();
        componentRef.destroy();
      });
    this.subs.add(detachOverlaySub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.plyr = this.plyrService.create(this.exampleVideo.nativeElement);
    this.initTrack();
  }

  public initTrack() {
    this.initTrack$.next();
  }
}
