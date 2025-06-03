import { createContext } from 'react';
import { themes } from '../themes/ColorThemes';

export const ThemeContext = createContext({
  theme: themes.light,
  themeName: 'light', 
  toggleTheme: (themeName) => {
    console.warn('toggleTheme function not yet implemented or ThemeProvider not used');
  },
});