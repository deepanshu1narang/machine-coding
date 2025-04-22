import { forwardRef } from "react";


const Note = forwardRef(({ position, onMouseDown, note }, ref) => {
  return (
    <div
      onMouseDown={onMouseDown}
      ref={ref}
      className="note"
      style={{
        left: position?.x,
        top: position?.y,
      }}
    >
      📌 {note.text}
    </div>
  );
});

export default Note;
