import { ArchiveComponent } from './archive/archive.component';
import { PostComponent } from './post/post.component';
import { Routes, Route } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostModel } from './post/post.model';

export const posts: Routes = [];

function importAll(r) {
  r.keys().forEach((key) => {
    const postData: PostModel = r(key);

    const route: Route = {
      path: postData.attributes.slug,
      component: PostComponent,
      data: postData,
    };

    posts.push(route);
  });
}

importAll(
  require.context('frontmatter-markdown-loader!./post-content/', true, /\.md$/)
);

export const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [{ path: '', component: ArchiveComponent }, ...posts],
  },
];
