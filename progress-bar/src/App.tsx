import { useState } from "react";
import "./App.css";
import ProgressBar from "./ProgressBar";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <h1>progress bar</h1>
      <ProgressBar isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className="controls">
        <button onClick={() => setIsLoading(true)}>Start</button>
        <button onClick={() => setIsLoading(false)}>Stop</button>
      </div>
    </div>
  );
}

export default App;
