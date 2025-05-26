import { useState } from "react";
import type { Comment } from "../types/types";

const useCommentTree = (
  initialComments: Comment[]
): {
  commentsData: Comment[];
  insertComment(content: string, commentId: number | null): void;
  deleteComment(commentId: number): void;
  editComment(commentId: number, content: string): void;
  voteComment(commentId: number, type: "upvote" | "downvote"): void;
  sortComments(order: "latest" | "oldest" | "most-voted"): void;
} => {
  const [commentsData, setCommentsData] = useState<Comment[]>(initialComments);

  const updateComments = (commentsData: Comment[]): void => {
    localStorage.setItem("comments", JSON.stringify(commentsData));
  };

  const insertComment = (content: string, commentId: number | null): void => {
    const comment = {
      id: Date.now(),
      content: content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId === null) {
      let aComments = structuredClone(commentsData);
      aComments.push(comment);
      setCommentsData(aComments);
      updateComments(aComments);
    } else {
      let aComments = structuredClone(commentsData);
      replyToComment(commentId, comment, aComments);
      setCommentsData(aComments);
      updateComments(aComments);
    }
  };

  const replyToComment = (commentId: number, newComment: Comment, comments: Comment[]): boolean => {
    for (let i = 0; i < comments.length; i++) {
      if (commentId === comments[i].id) {
        comments[i].replies.push(newComment);
        return true;
      } else {
        if (comments[i].replies.length > 0) {
          const found = replyToComment(commentId, newComment, comments[i].replies);
          if (found) return true;
        }
      }
    }
    return false;
  };

  const deleteComment = (commentId: number): void => {
    const aComments = structuredClone(commentsData);

    deleteCommentRecursively(commentId, aComments);

    function deleteCommentRecursively(commentId: number, comments: Comment[]) {
      for (let i = 0; i < comments.length; i++) {
        if (commentId === comments[i].id) {
          comments.splice(i, 1);
          return true;
        } else {
          if (comments[i].replies.length > 0) {
            const found = deleteCommentRecursively(commentId, comments[i].replies);
            if (found) return true;
          }
        }
      }
    }

    setCommentsData(aComments);
    updateComments(aComments);
  };

  const editComment = (commentId: number, content: string): void => {
    const comments = structuredClone(commentsData);

    editCommentRecursive(commentId, content, comments);

    function editCommentRecursive(commentId: number, content: string, comments: Comment[]): boolean {
      for (let i = 0; i < comments.length; i++) {
        if (commentId === comments[i].id) {
          comments[i] = { ...comments[i], content: content, timestamp: new Date().toISOString() };
          return true;
        } else {
          if (comments[i].replies.length > 0) {
            const found = editCommentRecursive(commentId, content, comments[i].replies);
            if (found) return true;
          }
        }
      }

      return false;
    }

    setCommentsData(comments);
    updateComments(comments);
  };

  const voteComment = (commentId: number, type: "upvote" | "downvote"): void => {
    const comments = structuredClone(commentsData);
    voteCommentRecursively(commentId, type, comments);

    function voteCommentRecursively(commentId: number, type: "upvote" | "downvote", comments: Comment[]): boolean {
      for (let i = 0; i < comments.length; i++) {
        if (commentId === comments[i].id) {
          if (type === "upvote") comments[i].votes++;
          else comments[i].votes--;
          comments[i].timestamp = new Date().toISOString();
          return true;
        } else {
          if (comments[i].replies.length > 0) {
            const found = voteCommentRecursively(commentId, type, comments[i].replies);
            if (found) return true;
          }
        }
      }

      return false;
    }

    setCommentsData(comments);
    updateComments(comments);
  };

  const sortComments = (order: "latest" | "oldest" | "most-voted") => {
    const comments = structuredClone(commentsData);

    sortCommentsRecursively(order, comments);

    function sortCommentsRecursively(order: "latest" | "oldest" | "most-voted", comments: Comment[]): void {
      if (order === "latest") {
        comments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      } else if (order === "oldest") {
        comments.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      } else if (order === "most-voted") {
        comments.sort((a, b) => b.votes - a.votes);
      }

      comments.forEach((com) => sortCommentsRecursively(order, com.replies));
    }

    setCommentsData(comments);
  };

  return {
    commentsData,
    insertComment,
    deleteComment,
    editComment,
    voteComment,
    sortComments,
  };
};

export default useCommentTree;
