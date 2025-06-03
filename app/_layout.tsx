import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { useTheme } from '../src/hooks/useTheme';

const ThemedStatusBar = () => {
  const { theme, themeName } = useTheme();
  return (
    <StatusBar
      barStyle={themeName === 'light' ? 'light-content' : 'dark-content'}
      backgroundColor={theme.surface} 
    />
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <Stack screenOptions={{headerShown: false}}/>
    </ThemeProvider>
  );
}