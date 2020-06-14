import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { routes, posts } from './blog.routes';
import { SiteNavModule } from '../site-nav/site-nav.module';
import { SiteFooterModule } from '../site-footer/site-footer.module';
import { ArchiveComponent } from './archive/archive.component';
import { POSTS } from './blog.config';

@NgModule({
  declarations: [BlogComponent, PostComponent, ArchiveComponent],
  imports: [
    SiteNavModule,
    SiteFooterModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [{ provide: POSTS, useValue: posts }],
})
export class BlogModule {}
