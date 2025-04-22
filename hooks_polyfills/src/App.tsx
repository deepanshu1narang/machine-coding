import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCustomEffect from "./hooks/useCustomEffect";
import usePrevious from "./hooks/usePrevious";
import useCustomMemo from "./hooks/useCustomMemo";
import useDebouncedValue from "./hooks/useDebouncedValue";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(10);
  const [search, setSearch] = useState<string>("");

  const prevCount2 = usePrevious(count2);

  useCustomEffect(() => {
    console.log("count", count);
  }, [count]);

  const squaredCount: number = useCustomMemo(() => {
    console.log("square");
    return count ** 2;
  }, [count]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("search", search);
    setSearch(e.target.value);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={() => setCount2((count) => count + 1)}>count2 is {count2}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <b>{prevCount2}</b>
        <div></div>
        <u>{squaredCount}</u>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div>
        <input type="text" placeholder="Search..." value={search} onChange={(e) => handleSearch(e)} />
        {/* <p>Debounced Value: {debouncedSearch}</p> */}
        {/* <p>Debounced Value: {debouncedSearchValue}</p> */}
      </div>
    </>
  );
}

export default App;
