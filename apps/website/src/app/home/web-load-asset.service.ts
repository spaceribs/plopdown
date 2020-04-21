import { Injectable } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebLoadAssetService {
  constructor(private domSanitizer: DomSanitizer) {}

  public asText(_: string): Observable<SafeUrl> {
    return of(
      this.domSanitizer.bypassSecurityTrustUrl('/assets/plopdown-logo.svg')
    );
  }
}
