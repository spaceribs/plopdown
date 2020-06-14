import { WindowRefService } from '@plopdown/window-ref';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { switchMap, map } from 'rxjs/operators';
import { RuntimeService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadAssetService {
  constructor(
    private runtime: RuntimeService,
    private windowRef: WindowRefService,
    private domSanitizer: DomSanitizer
  ) {}

  asText(path: string): Observable<SafeUrl> {
    return from(fetch(this.runtime.getURL(path))).pipe(
      switchMap((res) => {
        return res.blob();
      }),
      map((blob) => {
        return this.domSanitizer.bypassSecurityTrustUrl(
          this.windowRef.getURL().createObjectURL(blob)
        );
      })
    );
  }
}
