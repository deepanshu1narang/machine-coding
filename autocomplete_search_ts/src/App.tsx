import { useEffect, useRef, useState } from "react";
import "./App.css";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

function App() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const cache = useRef<{ [key: string]: Recipe[] }>({});

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = null!;

    timeout = setTimeout(() => fnFetchData(search), 500);

    return () => clearTimeout(timeout);
  }, [search]);

  function arrowMove(e: React.KeyboardEvent<HTMLInputElement>): void {
    let idx = -1;
    if (e.key === "ArrowDown") {
      idx = selectedIndex === results.length - 1 ? 0 : selectedIndex + 1;
      setSelectedIndex(idx);
    } else if (e.key === "ArrowUp") {
      idx = selectedIndex === 0 ? results.length - 1 : selectedIndex - 1;
      setSelectedIndex(idx);
    } else if (e.key === "Enter") {
      setRecipe(results[selectedIndex]);
      // setSearch(results[selectedIndex].name);
    }
  }

  function fnFetchData(key: string) {
    const val = key?.toLowerCase();
    if (val in cache.current) {
      setResults(cache.current[val]);
    } else {
      let url: string = `https://dummyjson.com/recipes/search?limit=50`;
      if (val) url += `&q=${val}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          cache.current[val] = data.recipes;
          setResults(data.recipes as Recipe[]);
        })
        .catch((err) => {
          console.log(err);
          setResults([]);
        });
    }
  }

  function handleClickRecipe(res: Recipe) {
    setSearch(res.name);
    setRecipe(res);
  }

  return (
    <div className="App">
      <h3>AutoComplete Search</h3>
      <div className="page">
        <div className="input_result-box">
          <input onChange={(e) => setSearch(e.target.value)} value={search} onKeyDown={(e) => arrowMove(e)} />
          <div className="results" tabIndex={1}>
            {results.map((res, idx) => {
              let className = "result";
              if (idx === selectedIndex) {
                className += " active";
              }
              return (
                <div className={className} key={res.id} onClick={() => handleClickRecipe(res)}>
                  {res.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="recipe">{JSON.stringify(recipe)}</div>
      </div>
    </div>
  );
}

export default App;
