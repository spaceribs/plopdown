import { HttpClient } from '@angular/common/http';
import { WindowRefService } from '@plopdown/window-ref';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadAssetService {
  constructor(
    private windowRef: WindowRefService,
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  asText(path: string): Observable<SafeUrl> {
    return this.http.get(path, { responseType: 'blob' }).pipe(
      map((blob) => {
        return this.domSanitizer.bypassSecurityTrustUrl(
          this.windowRef.getURL().createObjectURL(blob)
        );
      })
    );
  }
}
