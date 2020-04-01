import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { VideoElementRef } from '@plopdown/video-elem-refs';
import {
  BackgroundFindVideos,
  ContentScriptPubService,
  BackgroundSubService
} from '@plopdown/messages';
import { map } from 'rxjs/operators';
import {
  VideoScanService,
  IFrameScanService,
  XPathService
} from '@plopdown/window-ref';
import { LoggerService } from '@plopdown/logger';

@Component({
  selector: 'plopdown-content-scanner',
  template: '',
  styleUrls: ['./content-scanner.component.scss']
})
export class ContentScannerComponent implements OnInit {
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
    xpathService: XPathService
  ) {
    this.onBackgroundFindVideos$ = bgSub.getFindVideos();

    const videoElems$ = videoScanner.getVideoElems();
    const iframeElems$ = iframeScanner.getIFrameElems();

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
