import "./App.css";
import Box from "./components/Box";
import data from "./data/data.json";

function App() {
  return (
    <div>
      <h1>Nested Checkboxes</h1>
      <Box nodes={data} />
    </div>
  );
}

export default App;
