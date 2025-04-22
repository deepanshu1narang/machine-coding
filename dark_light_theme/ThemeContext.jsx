import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(x => !x);

    const theme = useMemo(() => {
        let theme = "light";

        if (isDarkMode)
            theme = "dark";
        else
            theme = "light";

        document.documentElement.setAttribute("data-theme", theme);
        return theme;

    }, [isDarkMode]);

    return <ThemeContext value={{ theme, toggleTheme }} >
        {children}
    </ThemeContext>
}
export default useTheme;