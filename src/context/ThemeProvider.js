import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { themes } from '../themes/ColorThemes';
import { ThemeContext } from './ThemeContext';

const THEME_STORAGE_KEY = '@MyApp:themePreference';

export const ThemeProvider = ({ children }) => {
  const initialSystemColorScheme = Appearance.getColorScheme();
  const [themeName, setThemeName] = useState(initialSystemColorScheme || 'light');

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedThemeName = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedThemeName && themes[storedThemeName]) {
          setThemeName(storedThemeName);
        } else if (initialSystemColorScheme && themes[initialSystemColorScheme]) {
          setThemeName(initialSystemColorScheme);
        } else {
          setThemeName('light'); 
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        setThemeName(initialSystemColorScheme || 'light');
      }
    };
    loadThemePreference();
  }, [initialSystemColorScheme]);

  useEffect(() => {
    const handleSystemThemeChange = async ({ colorScheme }) => {
      if (colorScheme && themes[colorScheme]) {
        console.log('System theme changed to:', colorScheme);
        try {
          const storedThemeName = await AsyncStorage.getItem(THEME_STORAGE_KEY);
          if (!storedThemeName) {
            setThemeName(colorScheme); 
          }
        } catch (error) {
          console.error('Failed to process system theme change:', error);
        }
      }
    };

    const subscription = Appearance.addChangeListener(handleSystemThemeChange);

    return () => {
      subscription.remove();
    };
  }, [setThemeName]);

  const toggleTheme = useCallback(async (newThemeName) => {
    if (themes[newThemeName]) {
      setThemeName(newThemeName);
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeName);
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
    } else {
      console.warn(`Theme "${newThemeName}" not found. Reverting to "light".`);
      setThemeName('light');
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, 'light');
      } catch (error) {
        console.error('Failed to save fallback theme preference:', error);
      }
    }
  }, []);

  const currentTheme = useMemo(() => {
    return themes[themeName] || themes.light; 
  }, [themeName]);

  const contextValue = useMemo(() => ({
    theme: currentTheme,
    themeName: themeName,
    toggleTheme,
  }), [currentTheme, themeName, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};