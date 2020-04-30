import { SavedTrack } from '@plopdown/tracks';
import { LoggerService } from '@plopdown/logger';
import { VideoOverlayComponent } from './../video-overlay/video-overlay.component';
import { XPathService } from '@plopdown/window-ref';
import {
  Component,
  OnInit,
  Input,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  ComponentRef,
  OnDestroy,
  ComponentFactoryResolver
} from '@angular/core';
import { Subscription } from 'rxjs';
import { VIDEO_ELEM_TOKEN, TRACK_TOKEN } from '@plopdown/tokens';

@Component({
  selector: 'plopdown-video-attachment',
  template: ''
})
export class VideoAttachmentComponent implements OnInit, OnDestroy {
  private videoElem: HTMLVideoElement | null;
  private subs: Subscription = new Subscription();
  overlayComponentRef: ComponentRef<VideoOverlayComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private xpathService: XPathService,
    private logger: LoggerService,
    private appRef: ApplicationRef
  ) {}

  @Input() public xpath: string;
  @Input() public track: SavedTrack;

  ngOnInit(): void {
    this.videoElem = this.xpathService.getElement<HTMLVideoElement>(this.xpath);

    if (this.videoElem == null) {
      this.logger.warn('No video found matching xpath.', this.videoElem);
      return;
    }

    this.firefoxFix(this.videoElem);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      VideoOverlayComponent
    );

    if (this.track == null) {
      this.logger.error('Could not find associated track.');
    }

    const componentInjector = Injector.create({
      providers: [
        { provide: VIDEO_ELEM_TOKEN, useValue: this.videoElem },
        { provide: TRACK_TOKEN, useValue: this.track }
      ]
    });

    const componentRef = componentFactory.create(componentInjector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    this.videoElem.offsetParent.append(domElem);

    this.overlayComponentRef = componentRef;

    componentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.appRef.detachView(this.overlayComponentRef.hostView);
    this.overlayComponentRef.destroy();
    this.overlayComponentRef.location.nativeElement.remove();
    this.subs.unsubscribe();
  }

  /**
   * Forces the browser to start and stop the video,
   * rendering annotations.
   *
   * @param video - Video element to force load.
   */
  firefoxFix(video: HTMLVideoElement) {
    video.play();
    video.pause();
  }
}
