import AsyncStorage from '@react-native-async-storage/async-storage';

// funcion para obtener favoritos, retorna una promise con un record que dado un id retorna un conjunto de datos idreceta-boolfav
// asyncstorage guarda los datos de manera key:data donde en este caso key hace referencia al usuario y data es un array con id de recetas en favoritos.

export const getFavoritos = async (userId: string | undefined): Promise<Record<string, boolean>> => {
    if (userId){
      const data = await AsyncStorage.getItem(`favoritos_${userId}`);
      return data ? JSON.parse(data) : {};
    } else {
        return {}
    }
};

export const toggleFavorito = async (userId: string | undefined, recetaId: string) => {
  const favoritos = await getFavoritos(userId);
  if (favoritos[recetaId]) {
    delete favoritos[recetaId];
  } else {
    favoritos[recetaId] = true;
  }
  await AsyncStorage.setItem(`favoritos_${userId}`, JSON.stringify(favoritos));
};

export const esFavorito = async (userId: string | undefined, recetaId: string): Promise<boolean> => {
  const favoritos = await getFavoritos(userId);
  return !!favoritos[recetaId];
};
