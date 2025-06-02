import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FavRecipes = () => {
  return (
    <View style={styles.container}>
      <Text>Fav Recipes Screen</Text>
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

export default FavRecipes;
