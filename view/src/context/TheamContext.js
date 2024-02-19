import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setIsDarkMode(savedMode === 'true');
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const theme = createTheme({
    palette: {
        primary: {
          main: '#0C6470',
          dark: '#0bb0de',// Change primary color
          light :'#dcdcdc'
        },
        secondary:{
            main: '#4A4A4A',
            dark: '#dcdcdc',
            light:'#dcdcdc'
        },
        mode: isDarkMode ? 'dark' : 'light' // Set the default mode to light
      }
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
