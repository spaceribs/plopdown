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
import {
  VideoScanService,
  VideoElementRef,
  IFrameScanService
} from '@plopdown/video-refs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'plopdown-cs',
  template: '',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private videoElems$: Observable<VideoElementRef[]>;
  private iframeOrigins$: Observable<string[]>;
  private subs: Subscription = new Subscription();
  private onBackgroundFindVideos$: Observable<BackgroundFindVideos>;

  constructor(
    private videoScanner: VideoScanService,
    private iframeScanner: IFrameScanService,
    private logger: LoggerService,
    private csPub: ContentScriptPubService,
    bgSub: BackgroundSubService
  ) {
    this.onBackgroundFindVideos$ = bgSub.getFindVideos();

    this.videoElems$ = videoScanner.getVideoElems();
    const iframeElems$ = iframeScanner.getIFrameElems();

    this.iframeOrigins$ = iframeElems$.pipe(
      map(elems => elems.map(elem => elem.src))
    );
  }

  ngOnInit(): void {
    const elemsFoundSub = combineLatest([
      this.videoElems$,
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
