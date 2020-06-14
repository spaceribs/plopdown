import { Component, OnInit, Inject } from '@angular/core';
import { POSTS } from './blog.config';
import { Routes, Route } from '@angular/router';

interface PostDateBucket {
  month: number;
  year: number;
  date: Date;
  posts: Routes;
}

@Component({
  selector: 'plopdown-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public dateArchives: PostDateBucket[];

  static comparePostDates(a: Route, b: Route) {
    const aCreated = new Date(a.data.attributes.created);
    const bCreated = new Date(b.data.attributes.created);
    return bCreated.getTime() - aCreated.getTime();
  }

  constructor(@Inject(POSTS) posts: Routes) {
    this.dateArchives = posts
      .reduce((memo, post) => {
        const postDate = new Date(post.data.attributes.created);
        const postMonth = new Date(post.data.attributes.created).getMonth();
        const postYear = new Date(post.data.attributes.created).getFullYear();

        const existingBucket = memo.find((bucket) => {
          return bucket.year === postYear && bucket.month === postMonth;
        });

        if (existingBucket != null) {
          existingBucket.posts.push(post);
          existingBucket.posts.sort(BlogComponent.comparePostDates);
        } else {
          memo.push({
            month: postMonth,
            year: postYear,
            date: postDate,
            posts: [post],
          });
        }

        return memo;
      }, [] as PostDateBucket[])
      .sort((a, b) => {
        const aDate = new Date(`${a.year}-${a.month}`);
        const bDate = new Date(`${b.year}-${b.month}`);
        return bDate.getTime() - aDate.getTime();
      });
  }

  ngOnInit(): void {}
}
