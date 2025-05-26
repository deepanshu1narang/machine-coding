interface AddCommentProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  placeholder: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const AddComment: React.FC<AddCommentProps> = ({ ref, value, handleChange, handleSubmit, placeholder }) => {
  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="add-comment">
      <textarea ref={ref && ref} value={value} onChange={(e) => handleChange(e)} rows={3} cols={50} placeholder={placeholder} className="comment-textarea" onKeyDown={handlePressEnter} />
      <button className="comment-button" onClick={handleSubmit}>
        🎤 Add Comment
      </button>
    </div>
  );
};

export default AddComment;
