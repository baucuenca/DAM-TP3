import axios from 'axios';
import { Ingredient, IngredientsResponse } from '../types/ingredient';
const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await axios.get<IngredientsResponse>(`${baseUrl}list.php?i=list`);
    return response.data.ingredients ?? [];
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};
/*
export const searchIngredients = async (query: string): Promise<Ingredient[]> => {
  const all = await getAllIngredients();
  return all.filter(ing =>
    ing.strIngredient.toLowerCase().includes(query.toLowerCase())
  );
};*/