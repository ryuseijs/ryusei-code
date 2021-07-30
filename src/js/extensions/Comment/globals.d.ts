declare module '@ryusei/code' {
  import { Comment } from './Comment';

  interface Options {
    /**
     * Options for the Comment component.
     */
    comment?: boolean | CommentOptions,
  }

  interface CommentOptions {
  }

  interface Extensions {
    Comment: Comment;
  }

  interface LanguageConfig {
    /**
     * A line comment syntax.
     */
    lineComment?: [ string, string ];

    /**
     * A block comment syntax.
     */
    blockComment?: [ string, string ];
  }
}
