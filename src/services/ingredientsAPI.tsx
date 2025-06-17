import axios from 'axios';
import { Ingredient, IngredientsResponse } from '../types/ingredient';
const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await axios.get<IngredientsResponse>(`${baseUrl}list.php?i=list`);
    console.log("Respuesta cruda de la API:", response.data);
    return response.data.meals ?? [];
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

export const searchIngredients = async (query: string): Promise<Ingredient[]> => {
  const response = await axios.get<IngredientsResponse>(`${baseUrl}list.php?i=list`);
  const allIngredients = response.data.meals ?? [];
  return allIngredients.filter(ing =>
    ing.strIngredient.toLowerCase().includes(query.toLowerCase())
  );
};