export interface Post {
  kind: string;
  id: string;
  blog: {
    id: string;
  };
  published: string;
  updated: string;
  url: string;
  selflink: string;
  title: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    url: string;
    image: {
      url: string;
    };
  };
  replies: {
    totalItems: string;
    selfLink: string;
  };
}

export interface GETPostsResponse {
  items?: Post[];
}

/**
 * HTTP DELETE response representation
 * Has optional post response object
 */
export interface DELETEPostResponse {
  post?: Post;
}
