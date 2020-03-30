import { XPathService } from './xpath.service';
import { WindowRefService } from '@plopdown/window-ref';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { VideoRefsModule } from './video-refs.module';

@Injectable({
  providedIn: VideoRefsModule
})
export class IFrameScanService {
  private document: Document;

  private iframes$: Observable<HTMLIFrameElement[]>;
  private scan$: Subject<void> = new Subject();

  constructor(window: WindowRefService, xpathService: XPathService) {
    this.document = window.getDocument();
    this.iframes$ = this.scan$.pipe(
      map(() => {
        return this.document.querySelectorAll('iframe');
      }),
      map(domElems => {
        const iframes: HTMLIFrameElement[] = [];

        if (domElems == null) {
          return iframes;
        }

        domElems.forEach(elem => {
          iframes.push(elem);
        });

        return iframes;
      })
    );
  }

  public scan(): void {
    this.scan$.next();
  }

  public getIFrameElems(): Observable<HTMLIFrameElement[]> {
    return this.iframes$;
  }
}
