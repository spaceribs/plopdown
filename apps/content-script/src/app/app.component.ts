import {
  ContentScriptPubService,
  BackgroundSubService,
  BackgroundFindVideos
} from '@plopdown/messages';
import { LoggerService } from '@plopdown/logger';
import { Observable, Subscription, combineLatest } from 'rxjs';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { VideoElementRef } from 'libs/video-elem-refs/src';
import { map } from 'rxjs/operators';
import {
  WindowRefService,
  VideoScanService,
  IFrameScanService,
  XPathService
} from '@plopdown/window-ref';

@Component({
  selector: 'plopdown-cs',
  template: '',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private foundVideos$: Observable<VideoElementRef[]>;
  private iframeOrigins$: Observable<string[]>;
  private subs: Subscription = new Subscription();
  private onBackgroundFindVideos$: Observable<BackgroundFindVideos>;

  constructor(
    private videoScanner: VideoScanService,
    private iframeScanner: IFrameScanService,
    private logger: LoggerService,
    private csPub: ContentScriptPubService,
    bgSub: BackgroundSubService,
    window: WindowRefService,
    xpathService: XPathService
  ) {
    this.onBackgroundFindVideos$ = bgSub.getFindVideos();

    const videoElems$ = videoScanner.getVideoElems();
    const iframeElems$ = iframeScanner.getIFrameElems();
    const document = window.getDocument();

    this.foundVideos$ = videoElems$.pipe(
      map(elems => {
        return elems.map(elem => {
          const xpath = xpathService.getXPath(elem);

          return {
            xpath,
            title: elem.title,
            frameTitle: document.title,
            frameOrigin: document.location.origin,
            framePath: document.location.pathname,
            frameSearch: document.location.search
          } as VideoElementRef;
        });
      })
    );

    this.iframeOrigins$ = iframeElems$.pipe(
      map(elems => elems.map(elem => elem.src))
    );
  }

  ngOnInit(): void {
    const elemsFoundSub = combineLatest([
      this.foundVideos$,
      this.iframeOrigins$
    ]).subscribe({
      next: ([videos, iframes]) => {
        if (videos.length) {
          this.logger.debug('Publishing Found Videos', videos);
          this.csPub.videosFound(videos);
        }
        if (iframes.length) {
          this.logger.debug('Publishing Found iFrames', iframes);
          this.csPub.iframesFound(iframes);
        }
      }
    });
    this.subs.add(elemsFoundSub);

    const scanSub = this.onBackgroundFindVideos$.subscribe({
      next: () => {
        console.log('scan request');
        this.scan();
      }
    });
    this.subs.add(scanSub);
  }

  ngAfterViewInit(): void {
    this.csPub.ready();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public scan() {
    this.videoScanner.scan();
    this.iframeScanner.scan();
  }
}
