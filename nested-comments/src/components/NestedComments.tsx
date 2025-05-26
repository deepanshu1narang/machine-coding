import { useState } from "react";
import useCommentTree from "../hooks/useCommentTree";
import type { NestedComments } from "../types/types";
import "./styles.css";
import CommentComponent from "./Comment";
import AddComment from "./AddComment";

const NestedCommentsComponent: React.FC<NestedComments> = ({ comments }) => {
  const [comment, setComment] = useState<string>("");

  const { commentsData, insertComment, deleteComment, editComment, voteComment, sortComments } = useCommentTree(comments);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment) {
      insertComment(comment, null);
      setComment("");
    }
  };

  return (
    <>
      <AddComment value={comment} handleChange={(e) => handleChange(e)} handleSubmit={handleSubmit} placeholder="Add a new Comment...." />

      {/* sorting */}
      <select name="sort" id="sort" className="sort-dropdown" onChange={(e) => sortComments(e.target.value as "latest" | "oldest" | "most-voted")}>
        {["latest", "oldest", "most-voted"].map((e) => (
          <option key={e} value={e} className="option">
            {e}
          </option>
        ))}
      </select>

      {commentsData.map((comment) => {
        return <CommentComponent key={comment.id} id={comment.id} content={comment.content} votes={comment.votes} timestamp={comment.timestamp} replies={comment.replies} insertComment={insertComment} deleteComment={deleteComment} editComment={editComment} voteComment={voteComment} />;
      })}
    </>
  );
};

export default NestedCommentsComponent;
