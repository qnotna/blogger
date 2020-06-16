export interface NoPostsConfig {
  imageUrl: string;
  title: string;
  message?: string;
  showButton?: boolean;
}

export const renderNoPostsConfig = (noContent: boolean, noResults: boolean): NoPostsConfig => {
    if (noContent) {
        return {
            imageUrl: 'https://img.icons8.com/fluent/96/000000/typewriter-with-paper.png',
            title: 'This blog does not contain any posts',
            message: 'Create a post in this blog to make it appear here.',
            showButton: false
        } as NoPostsConfig;
    }
    if (noResults) {
        return {
            imageUrl: 'https://img.icons8.com/color/96/000000/search.png',
            title: 'Nothing matching your search was found in this blog',
            message: 'Did you type in your query correctly?',
            showButton: true
        } as NoPostsConfig;
    }
};
