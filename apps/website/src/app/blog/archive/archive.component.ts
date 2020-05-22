import { BlogComponent } from './../blog.component';
import { POSTS } from './../blog.config';
import { Component, OnInit, Inject } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'plopdown-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  public postRoutes: Routes;

  constructor(@Inject(POSTS) posts: Routes) {
    this.postRoutes = posts.sort(BlogComponent.comparePostDates).slice(0, 20);
  }

  ngOnInit(): void {}
}
