import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { WindowRefModule } from './window-ref.module';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: WindowRefModule
})
export class VideoScanService {
  private document: Document;

  private videoElems$: Observable<HTMLVideoElement[]>;
  private scan$: Subject<void> = new Subject();

  constructor(window: WindowRefService) {
    this.document = window.getDocument();
    this.videoElems$ = this.scan$.pipe(
      map(() => {
        return this.document.querySelectorAll('video');
      }),
      map(domElems => {
        const videos: HTMLVideoElement[] = [];

        if (domElems == null) {
          return videos;
        }

        domElems.forEach(elem => {
          videos.push(elem);
        });

        return videos;
      })
    );
  }

  public scan(): void {
    this.scan$.next();
  }

  public getVideoElems(): Observable<HTMLVideoElement[]> {
    return this.videoElems$;
  }
}
