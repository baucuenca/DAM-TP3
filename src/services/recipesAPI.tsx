import axios from 'axios';
import { auth } from '../constants/firebaseConfig';
import { Meal } from '../types/meal';
import { getFavoritos } from './favoritosStorage';
const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

type MealsResponse = {
  meals: Meal[] | null;
};

export const getAllRecipes = async (): Promise<Meal[]> => {
  try {
    const response = await axios.get<MealsResponse>(`${baseUrl}search.php?f=a`);
    return response.data.meals ?? [];
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getFavorites = async (): Promise<Meal[]> => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) return [];

    const favoritos = await getFavoritos(userId); 

    const ids = Object.keys(favoritos); 
    if (ids.length === 0) return [];

    const requests = ids.map((id) =>
      axios.get<MealsResponse>(`${baseUrl}lookup.php?i=${id}`)
    );

    const responses = await Promise.all(requests);

    const recetas = responses
      .map((res) => res.data.meals?.[0]) 
      .filter((meal): meal is Meal => meal !== undefined);

    return recetas;
  } catch (error) {
    console.error("Error obteniendo recetas favoritas:", error);
    return [];
  }
};
