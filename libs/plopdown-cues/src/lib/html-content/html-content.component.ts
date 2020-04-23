import { SANITIZER_OPTIONS } from './html-content.model';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  Component,
  Input,
  SecurityContext,
  ChangeDetectorRef
} from '@angular/core';
import * as SanitizeHTML from 'sanitize-html';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'plopdown-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent {
  public rawHtml$: Subject<string> = new ReplaySubject(1);
  public sanitizedHtml$: Observable<SafeHtml>;

  @Input() set html(html: string) {
    this.rawHtml$.next(html);
  }

  constructor(sanitizer: DomSanitizer, cd: ChangeDetectorRef) {
    this.sanitizedHtml$ = this.rawHtml$.pipe(
      map(rawHtml => {
        return sanitizer.sanitize(SecurityContext.HTML, rawHtml);
      }),
      map(partiallySanitized => {
        return SanitizeHTML(partiallySanitized, SANITIZER_OPTIONS);
      }),
      map(sanitized => {
        return sanitizer.bypassSecurityTrustHtml(sanitized);
      }),
      tap(() => {
        setTimeout(() => {
          cd.detectChanges();
        }, 0);
      })
    );
  }
}
