import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import { ThemeProvider } from '../ThemeContext'

function App() {

  return (
    <ThemeProvider>
      <HashRouter>
        {/* navbar */}

        <Navbar />
        {/* routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
