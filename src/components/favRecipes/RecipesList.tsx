import { getAllRecipes } from '@/src/services/recipesAPI';
import { Meal } from '@/src/types/meal';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import RecetaCard from './RecetaCard';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const getIngredientsArray = (meal: Meal): string[] => {
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient.trim());
      }
    }

    return ingredients;
  };

  return (
    <View>
      {recipes.map((recipe) => (
        <RecetaCard
          key={recipe.idMeal}
          name={recipe.strMeal}
          imageUrl={recipe.strMealThumb}
          ingredients={getIngredientsArray(recipe)}
        />
      ))}
    </View>
  );
};

export default RecipesList;
