import { PostModel } from './post.model';
import { Component, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'plopdown-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  public routeData: PostModel;
  public routeContent: SafeHtml | null = null;

  constructor(route: ActivatedRoute, sanitizer: DomSanitizer) {
    this.routeData = route.snapshot.data as PostModel;
    const sanitizedContent = sanitizer.sanitize(
      SecurityContext.HTML,
      this.routeData.html
    );
    if (sanitizedContent != null) {
      this.routeContent = sanitizer.bypassSecurityTrustHtml(sanitizedContent);
    }
  }
}
