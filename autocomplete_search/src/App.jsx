import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});

  useEffect(() => {
    let timer = setTimeout(() => fetchData(search), 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [search]);

  const fetchData = (val) => {
    if (cache[val]) {
      setResults(cache[val]);
    }
    else {
      fetch('https://dummyjson.com/recipes/search?q=' + val)
        .then(res => res.json())
        .then(data => {
          setResults(data?.recipes);
          setCache(cache => ({
            ...cache,
            [val]: data?.recipes
          }));
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className='App'>
      <h4>auto complete search</h4>
      <div className='input-box'>
        <input value={search} onChange={e => setSearch(e.target.value)} />
        <div className='input-results'>
          {
            results.map((recipe) => (<span key={recipe.id}>{recipe.name}</span>))
          }
        </div>
      </div>
    </div>
  )
}

export default App
