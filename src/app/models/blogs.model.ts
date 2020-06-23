export interface Blog {
  description: string;
  id: string;
  kind: string;
  locale: {language: string, country: string, variant: string};
  name: string;
  pages: {totalItems: number, selfLink: string};
  posts: {totalItems: number, selfLink: string};
  published: string;
  selfLink: string;
  status: string;
  updated: string;
  url: string;
}

export interface GETBlogsResponse {
  items?: Blog[];
  kind?: string;
}
