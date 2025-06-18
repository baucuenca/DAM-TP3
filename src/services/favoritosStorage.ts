import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Favoritos de Recetas ---

// Obtiene los favoritos de recetas para un usuario
export const getFavoritos = async (userId: string | undefined): Promise<Record<string, boolean>> => {
    if (userId){
      const data = await AsyncStorage.getItem(`favoritos_${userId}`);
      return data ? JSON.parse(data) : {};
    } else {
        return {}
    }
};

// Alterna el estado de favorito de una receta
export const toggleFavorito = async (userId: string | undefined, recetaId: string) => {
  const favoritos = await getFavoritos(userId);
  if (favoritos[recetaId]) {
    delete favoritos[recetaId];
  } else {
    favoritos[recetaId] = true;
  }
  await AsyncStorage.setItem(`favoritos_${userId}`, JSON.stringify(favoritos));
};

// Verifica si una receta es favorita
export const esFavorito = async (userId: string | undefined, recetaId: string): Promise<boolean> => {
  const favoritos = await getFavoritos(userId);
  return !!favoritos[recetaId];
};

// --- Favoritos de Ingredientes ---

// Obtiene los favoritos de ingredientes para un usuario
export const getFavIngredients = async (userId: string | undefined): Promise<Record<string, boolean>> => {
  if (userId){
    const data = await AsyncStorage.getItem(`favIngredients_${userId}`);
    return data ? JSON.parse(data) : {};
  } else {
    return {}
  }
};

// Alterna el estado de favorito de un ingrediente
export const toggleFavIngredient = async (userId: string | undefined, ingredientId: string) => {
  const favoritos = await getFavIngredients(userId);
  if (favoritos[ingredientId]) {
    delete favoritos[ingredientId];
  } else {
    favoritos[ingredientId] = true;
  }
  await AsyncStorage.setItem(`favIngredients_${userId}`, JSON.stringify(favoritos));
};

// Verifica si un ingrediente es favorito
export const esFavIngredient = async (userId: string | undefined, ingredientId: string): Promise<boolean> => {
  const favoritos = await getFavIngredients(userId);
  return !!favoritos[ingredientId];
};
