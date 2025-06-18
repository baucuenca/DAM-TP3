import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getAllIngredients } from "../../services/ingredientsAPI";
import { Ingredient } from "../../types/ingredient";
import IngredientCard from "./IngredientCard";

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();
        setIngredients(data);
      } catch (error) {
        console.error("Error al obtener ingredientes:", error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item) => item.idIngredient}
      renderItem={({ item }) => (
        <IngredientCard
          id={item.idIngredient}
          name={item.strIngredient}
          description={item.strDescription}
        />
      )}
    />
  );
};

export default IngredientsList;