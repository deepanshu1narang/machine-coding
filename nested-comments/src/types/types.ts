interface Comment {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: Comment[];
}

interface NestedComments {
  comments: Comment[];
  // onSubmit: (content: string) => void;
  // onEdit: (content: string) => void;
  // onDelete: (commentId: number) => void;
  // onUpvote: (commentId: number) => void;
  // onDownVote: (commentId: number) => void;
}

export type { Comment, NestedComments };
