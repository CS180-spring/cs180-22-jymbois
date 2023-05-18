import React, { createContext, useState, useEffect } from 'react';
import { retrieveIsDark, writeIsDark } from './databaseQueries';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchIsDark = async () => {
      try {
        const darkEnabled = await retrieveIsDark();
        setIsDarkMode(darkEnabled);
      } catch (error) {
        console.log("Error: ", error);
        setIsDarkMode(false);
      }
    };

    fetchIsDark();
  }, []);

  const toggleTheme = () => {
    writeIsDark(!isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
export default ThemeContext;