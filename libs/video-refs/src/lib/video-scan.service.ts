import { XPathService } from './xpath.service';
import { WindowRefService } from '@plopdown/window-ref';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { VideoElementRef } from './video-element-ref.model';
import { map } from 'rxjs/operators';
import { VideoRefsModule } from './video-refs.module';

@Injectable({
  providedIn: VideoRefsModule
})
export class VideoScanService {
  private document: Document;

  private videoElems$: Observable<VideoElementRef[]>;
  private scan$: Subject<void> = new Subject();

  constructor(window: WindowRefService, xpathService: XPathService) {
    this.document = window.getDocument();
    this.videoElems$ = this.scan$.pipe(
      map(() => {
        return this.document.querySelectorAll('video');
      }),
      map(domElems => {
        const videos: VideoElementRef[] = [];

        if (domElems == null) {
          return videos;
        }

        domElems.forEach(elem => {
          const xpath = xpathService.getXPath(elem);

          if (xpath == null) {
            return;
          }

          const video: VideoElementRef = {
            xpath,
            title: elem.title,
            frameTitle: this.document.title,
            frameOrigin: this.document.location.origin,
            framePath: this.document.location.pathname,
            frameSearch: this.document.location.search
          };

          videos.push(video);
        });

        return videos;
      })
    );
  }

  public scan(): void {
    this.scan$.next();
  }

  public getVideoElems(): Observable<VideoElementRef[]> {
    return this.videoElems$;
  }
}
