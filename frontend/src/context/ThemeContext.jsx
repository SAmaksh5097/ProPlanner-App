import { useContext, createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();
export const ThemeProvider = ({children}) =>{
    const [theme, setTheme] = useState(()=>{
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(()=>{
        localStorage.setItem('theme', theme);
        const root = document.documentElement
        if(theme === 'dark'){
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    },[theme])

    const toggle = ()=>{
        setTheme((prev) => prev === 'light' ? 'dark' : 'light');
    }

    return(
        <ThemeContext.Provider value={{theme, toggle}}>
        {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);