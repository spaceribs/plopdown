import { BlogComponent } from './../blog.component';
import { POSTS } from './../blog.config';
import { Component, Inject } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'plopdown-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent {
  public postRoutes: Routes;

  constructor(@Inject(POSTS) posts: Routes) {
    posts.sort(BlogComponent.comparePostDates);
    this.postRoutes = posts.slice(0, 20);
  }
}
