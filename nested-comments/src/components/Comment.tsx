import { useEffect, useRef, useState } from "react";
import type { Comment } from "../types/types";
import AddComment from "./AddComment";

interface CommentProps extends Comment {
  insertComment(content: string, commentId: number | null): void;
  deleteComment(commentId: number): void;
  editComment(commentId: number, content: string): void;
  voteComment(commentId: number, type: "upvote" | "downvote"): void;
}

const CommentComponent: React.FC<CommentProps> = ({ id, content, votes, replies, timestamp, insertComment, deleteComment, editComment, voteComment }: CommentProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const replyRef = useRef<HTMLTextAreaElement>(null!);
  const editRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    if (isEdit) {
      editRef.current.focus();
      editRef.current.selectionStart = editRef.current.selectionEnd = editRef.current.value.length;
    }
    if (expand) replyRef?.current?.focus();
  }, [expand, isEdit]);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const handleReplySubmit = () => {
    if (replyContent) {
      //   logic
      insertComment(replyContent, id);
      setReplyContent("");
    }
  };

  const handleEditComment = () => {
    // if isEdit is false means now only we have opened window for editing... if it's true means we're going to close it
    if (isEdit) {
      if (editContent !== content) {
        // logic for editing comment
        editComment(id, editContent);
      }
      setEditContent("");
    } else {
      setEditContent(content);
    }
    setIsEdit(!isEdit);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleEditComment();
    }
  };

  return (
    <div className="comment">
      <>
        {!isEdit ? <p className="comment-content">{content}</p> : <textarea value={editContent} onChange={(e) => handleEditChange(e)} rows={1} cols={50} className="comment-textarea" onKeyDown={handleEditKeyDown} ref={editRef} />}
        <p className="comment-info">Votes: {votes}</p>
        <p className="comment-info">{new Date(timestamp).toLocaleString()}</p>
      </>

      <div className="comment-actions">
        {
          <button className="comment-button" onClick={toggleExpand}>
            {expand ? "🙈 Hide Replies" : "🗣 Reply"}
          </button>
        }
        <button className="comment-button" onClick={handleEditComment}>
          {isEdit ? "✔ Done" : "✏ Edit"}
        </button>
        <button className="comment-button" onClick={() => deleteComment(id)}>
          🚮 Delete
        </button>
        <button className="comment-button" onClick={() => voteComment(id, "upvote")}>
          👍 Upvote
        </button>
        <button className="comment-button" onClick={() => voteComment(id, "downvote")}>
          👎 Downvote
        </button>
      </div>
      {expand && (
        <div className="comment-replies">
          <AddComment ref={replyRef} value={replyContent} handleChange={(e) => handleChange(e)} handleSubmit={handleReplySubmit} placeholder="Add a new Comment...." />

          {replies.map((reply) => {
            return <CommentComponent deleteComment={deleteComment} insertComment={insertComment} key={reply.id} id={reply.id} content={reply.content} votes={reply.votes} timestamp={reply.timestamp} replies={reply.replies} editComment={editComment} voteComment={voteComment} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
