import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext'

const useTheme = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);

  return {theme, toggleTheme};
}
export default useTheme;