import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { themes } from '../themes/ColorThemes';
import { ThemeContext } from './ThemeContext';

const THEME_STORAGE_KEY = '@MyApp:themePreference';

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = Appearance.getColorScheme();
  const [themeName, setThemeName] = useState(systemColorScheme || 'light');

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedThemeName = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedThemeName && themes[storedThemeName]) {
          setThemeName(storedThemeName);
        } else if (systemColorScheme && themes[systemColorScheme]) {
          setThemeName(systemColorScheme);
        } else {
          setThemeName('light'); 
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
        setThemeName(systemColorScheme || 'light');
      }
    };
    loadThemePreference();
  }, [systemColorScheme]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme && themes[colorScheme]) {
        console.log('System theme changed to:', colorScheme);
      }
    });
    return () => subscription.remove();
  }, []);

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