import axios from 'axios';
import { Meal } from '../types/meal';

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
