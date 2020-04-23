import { VideoOverlayComponent } from './../../../../../libs/plopdown-overlay/src/lib/video-overlay/video-overlay.component';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  OnDestroy
} from '@angular/core';
import { map } from 'rxjs/operators';
import { PlopdownFile, PlopdownFileService } from '@plopdown/plopdown-file';
import { Track } from '@plopdown/tracks';
import { Observable, Subscription } from 'rxjs';
import Plyr from 'plyr';

@Component({
  selector: 'plopdown-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  public readonly track$: Observable<Track>;
  public overlayShown = false;
  public subs: Subscription = new Subscription();

  @ViewChild('exampleVideo') exampleVideo: ElementRef<HTMLVideoElement>;
  public plyr: Plyr;

  constructor(
    http: HttpClient,
    fileService: PlopdownFileService,
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.track$ = http
      .get('/assets/minnie_facts.vtt', {
        responseType: 'text'
      })
      .pipe(
        map(raw => {
          const file: PlopdownFile = fileService.decode(raw);

          const track: Track = {
            id: file.headers.id,
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            cues: file.cues
          };

          return track;
        })
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.plyr = new Plyr(this.exampleVideo.nativeElement);

    const overlayFactory = this.componentFactoryResolver.resolveComponentFactory(
      VideoOverlayComponent
    );

    const tracksSub = this.track$.subscribe(track => {
      const componentRef = overlayFactory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);

      const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      this.exampleVideo.nativeElement.parentNode.appendChild(domElem);

      componentRef.instance.videoElem = this.exampleVideo.nativeElement;
      componentRef.instance.track = track;

      componentRef.changeDetectorRef.detectChanges();
    });
    this.subs.add(tracksSub);
  }

  public removeOverlay() {
    this.overlayShown = false;
  }

  public onPlopify() {
    this.overlayShown = true;
  }
}
