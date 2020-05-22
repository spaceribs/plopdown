export interface PostModel {
  attributes: {
    title: string;
    created: string;
    slug: string;
    author: string;
    exerpt: string;
    tags: string[];
  };
  html: string;
}
