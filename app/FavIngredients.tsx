import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useProtectedRoute } from '../src/hooks/useProtectedRoute';

const FavIngredients = () => {
   useProtectedRoute();
  return (
    <View style={styles.container}>
      <Text>Fav Ingredients Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavIngredients;
