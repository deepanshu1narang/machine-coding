import React from 'react'
import { Link } from 'react-router-dom'
import useTheme from '../../ThemeContext'

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className='navbar'>
            <div className='nav'>
                {
                    ["home", "about", "blog"].map(nav => <Link key={nav} to={nav}>{nav.replace(nav[0], nav[0].toUpperCase())}</Link>)
                }
            </div>
            <div className='mode-switch'>
                <label>
                    <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
                    <span className='slider round'></span>
                </label>
            </div>
        </nav>
    )
}

export default Navbar
