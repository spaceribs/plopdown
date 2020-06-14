import { WindowRefModule } from './window-ref.module';

import { WindowRefService } from './window-ref.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: WindowRefModule,
})
export class IFrameScanService {
  private document: Document;

  private iframes$: Observable<HTMLIFrameElement[]>;
  private scan$: Subject<void> = new Subject();

  constructor(window: WindowRefService) {
    this.document = window.getDocument();
    this.iframes$ = this.scan$.pipe(
      map(() => {
        return this.document.querySelectorAll('iframe');
      }),
      map((domElems) => {
        const iframes: HTMLIFrameElement[] = [];

        if (domElems == null) {
          return iframes;
        }

        domElems.forEach((elem) => {
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
