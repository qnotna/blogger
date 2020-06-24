export interface NoPostsConfig {
  imageUrl: string;
  title: string;
  message?: string;
  showButton?: boolean;
  buttonText?: string;
}

export const renderNoPostsConfig = (noContent: boolean, noResults: boolean): NoPostsConfig => {
  if (noContent) {
    return {
      imageUrl: 'https://img.icons8.com/fluent/96/000000/typewriter-with-paper.png',
      title: 'Dieser Blog enthält keine Posts.',
      message: 'Erstelle einen Post in diesem Blog, um ihn hier anzuzeigen.',
      showButton: false,
    } as NoPostsConfig;
  }
  if (noResults) {
    return {
      imageUrl: 'https://img.icons8.com/color/96/000000/search.png',
      title: 'Es wurde kein Suchergebnis zur Anfrage gefunden',
      message: 'Hast Du den Text richtig eingegeben?',
      showButton: true,
      buttonText: 'Weiterlesen',
    } as NoPostsConfig;
  }
};
