import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import {
  BackgroundFindVideos,
  ContentScriptPubService,
  BackgroundSubService,
  BackgroundTrackFound
} from '@plopdown/messages';
import { map } from 'rxjs/operators';
import {
  VideoScanService,
  IFrameScanService,
  XPathService
} from '@plopdown/window-ref';
import { LoggerService } from '@plopdown/logger';
import { VideoRef } from '@plopdown/video-refs';

@Component({
  selector: 'plopdown-content-scanner',
  template: '',
  styleUrls: ['./content-scanner.component.scss']
})
export class ContentScannerComponent implements OnInit, AfterViewInit {
  private foundVideos$: Observable<VideoRef[]>;
  private iframeOrigins$: Observable<string[]>;
  private subs: Subscription = new Subscription();
  private onBackgroundFindVideos$: Observable<BackgroundFindVideos>;
  private onBackgroundTrackFound$: Observable<BackgroundTrackFound>;

  constructor(
    private videoScanner: VideoScanService,
    private iframeScanner: IFrameScanService,
    private logger: LoggerService,
    private csPub: ContentScriptPubService,
    bgSub: BackgroundSubService,
    xpathService: XPathService
  ) {
    this.onBackgroundFindVideos$ = bgSub.getFindVideos();
    this.onBackgroundTrackFound$ = bgSub.getTrackFound();

    const videoElems$ = videoScanner.getVideoElems();
    const iframeElems$ = iframeScanner.getIFrameElems();

    this.foundVideos$ = videoElems$.pipe(
      map(elems => {
        return elems.map(elem => {
          const xpath = xpathService.getXPath(elem);

          return {
            xpath,
            title: elem.title,
            duration: elem.duration,
            frameTitle: document.title,
            frameOrigin: document.location.origin,
            framePath: document.location.pathname,
            frameSearch: document.location.search
          } as VideoRef;
        });
      })
    );

    this.iframeOrigins$ = iframeElems$.pipe(
      map(elems => elems.map(elem => elem.src))
    );
  }

  ngAfterViewInit(): void {
    this.csPub.ready();
  }

  ngOnInit(): void {
    const elemsFoundSub = combineLatest([
      this.foundVideos$,
      this.iframeOrigins$
    ]).subscribe({
      next: ([videos, iframes]) => {
        this.logger.debug('Publishing Found Content', videos, iframes);
        this.csPub.videosFound(videos);
        this.csPub.iframesFound(iframes);
      }
    });
    this.subs.add(elemsFoundSub);

    const scanSub = this.onBackgroundFindVideos$.subscribe({
      next: () => {
        this.scan();
      }
    });
    this.subs.add(scanSub);
  }

  public scan() {
    this.videoScanner.scan();
    this.iframeScanner.scan();
  }
}
