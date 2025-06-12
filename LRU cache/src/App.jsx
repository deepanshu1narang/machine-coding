import { useState } from 'react';
import './App.css'
import DynamicContentLoader from './components/DynamicContentLoader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <DynamicContentLoader />
    </div>
  )
}

export default App
