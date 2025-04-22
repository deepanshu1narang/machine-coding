import { useState } from "react";
import "./App.css";
import Notes from "./components/Notes_mine";

const sampleNotes = [
  {
    id: 1,
    text: "Akshay Saini is a good teacher",
  },
  {
    id: 2,
    text: "Machine coding from Roadside Coder is really cool",
  },
];

function App() {
  const [notes, setNotes] = useState(sampleNotes);

  return (
    <div className="work-area">
      <h1>Drag and Drop Notes</h1>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
