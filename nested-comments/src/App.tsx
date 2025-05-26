import { useMemo } from "react";
import "./App.css";
import NestedComments from "./components/NestedComments";
import commentsData from "./data/comments.json";

function App() {
  const comments = useMemo(() => {
    if (!localStorage.getItem("comments")) {
      localStorage.setItem("comments", JSON.stringify(commentsData));
      return commentsData;
    } else {
      return JSON.parse(localStorage.getItem("comments")!);
    }
  }, []);
  return (
    <div>
      <h1>Nested Comments</h1>
      <NestedComments comments={comments} />
    </div>
  );
}

export default App;
