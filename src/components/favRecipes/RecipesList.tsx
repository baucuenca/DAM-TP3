import { getFavorites } from '@/src/services/recipesAPI';
import { Meal } from '@/src/types/meal';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import RecipeCard from '../RecipeCard';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  // aca hay que cambiar el endpoint y aparte filtrar por favs
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getFavorites();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);
  // funcion para obtener ingredientes que podemos usar en el detalle de receta
  // const getIngredientsArray = (meal: Meal): string[] => {
  //   const ingredients: string[] = [];

  //   for (let i = 1; i <= 20; i++) {
  //     const ingredient = meal[`strIngredient${i}` as keyof Meal];
  //     if (ingredient && ingredient.trim()) {
  //       ingredients.push(ingredient.trim());
  //     }
  //   }

  //   return ingredients;
  // };

  return (
    <View>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          id={recipe.idMeal}
          name={recipe.strMeal}
          image={recipe.strMealThumb}
          category={recipe.strCategory}
          area={recipe.strArea}
        />
      ))}
    </View>
  );
};

export default RecipesList;
