import React, { SetStateAction } from 'react';

enum Theme{
  light = 'light',
  dark = 'dark',
}

interface ThemeContextProps {
  theme: Theme,
  toggleTheme: () => void,  
}

interface ThemeContextProviderProps {
  children: React.ReactNode,
}

export const ThemeContext = React.createContext({} as ThemeContextProps);

export default function ThemeContextProvider({children} : ThemeContextProviderProps) {  
  const [theme, setTheme] = React.useState(Theme.light);

  React.useEffect(() => {
    console.log("use effect theme context");
    const tempTheme = localStorage.getItem('theme');
    switch(tempTheme) {
      case 'light':
        setTheme(Theme.light);
        break;
      case 'dark':
        setTheme(Theme.dark);
        break;
      default:
        break;
    }

    if(!tempTheme) localStorage.setItem('theme', 'light');    
  }, []);

  const toggleTheme = () => {
    const temp = theme === Theme.light ? Theme.dark : Theme.light;
    setTheme(temp);
    localStorage.setItem('theme', temp);
  }  

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}