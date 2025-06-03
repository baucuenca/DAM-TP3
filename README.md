This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Iniciar la app

   ```bashQFAV
   npx expo start
   ```

Estructura de Temas y Estilos
La aplicación se adapta automáticamente a los temas claro y oscuro del sistema operativo.

Estructura de Archivos de Temas
Los colores y las definiciones de los temas se encuentran en:

src/themes/ColorThemes.js

Este archivo contiene lightTheme y darkTheme, que definen la paleta de colores para cada modo.

La aplicación utiliza un Contexto de React (ThemeContext) para gestionar el tema globalmente.

src/context/ThemeContext.js: Define la estructura del contexto (theme, themeName, toggleTheme).

src/context/ThemeProvider.js: Este componente detecta el tema del dispositivo (Appearance.getColorScheme()), escucha sus cambios y provee el tema actual a través del ThemeContext.Provider. La aplicación se sincroniza automáticamente con la configuración del sistema, sin un botón manual para cambiar el tema en la UI.

Los estilos para cada pantalla se definen directamente dentro del archivo de cada componente de pantalla, utilizando StyleSheet.create de React Native.

Ejemplo en FavRecipes.js:

// FavRecipes.js
import React, { useContext } from 'react';
import { StyleSheet, /* ... */ } from 'react-native';
import { ThemeContext } from './src/context/ThemeContext';

const FavRecipes = () => {
  const { theme: currentTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: currentTheme.background,
    },
    headerTitle: {
      color: currentTheme.textPrimary,
    },
    recipeCard: {
      backgroundColor: currentTheme.surface,
      shadowColor: currentTheme.shadowColor,
    },
    // ... más estilos
  });

  // ... JSX del componente
};

export default FavRecipes;

Cuando el currentTheme cambia, los estilos se recalculan y la interfaz de usuario se actualiza para reflejar el nuevo tema.
