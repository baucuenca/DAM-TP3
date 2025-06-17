import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IngredientCard from "../src/components/FavIngredient/IngredientCard";
import SearchBar from "../src/components/Home/SearchBar";
import { ThemeContext } from "../src/context/ThemeContext";
import { useProtectedRoute } from "../src/hooks/useProtectedRoute";
import { getFavIngredients } from "../src/services/favoritosStorage";
import { getAllIngredients } from "../src/services/ingredientsAPI";
import { Ingredient } from "../src/types/ingredient";

const FavIngredients = () => {
  useProtectedRoute();
  const router = useRouter();
  const { theme: currentTheme } = useContext(ThemeContext);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [favIds, setFavIds] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const user = require("../src/constants/firebaseConfig").auth.currentUser?.uid;

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();
        setIngredients(data);

        const favIngredients = await getFavIngredients(user);
        setFavIds(favIngredients);
      } catch (error) {
        console.error("Error al obtener ingredientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  const handleToggleFav = async (ingredientId: string) => {
    await require("../src/services/favoritosStorage").toggleFavIngredient(user, ingredientId);
    const favs = await getFavIngredients(user);
    setFavIds(favs);
  };

  // Ingredientes favoritos
  const favIngredients = ingredients.filter((ing) => favIds[ing.idIngredient]);

  // Ingredientes que coinciden con la búsqueda y NO son favoritos
  const searchResults = query
    ? ingredients.filter(
        (ing) =>
          ing.strIngredient
            .trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase()) &&
          !favIds[ing.idIngredient]
      )
    : [];

  // Lista final: 
  // - Si hay búsqueda, solo muestra los resultados de búsqueda (sin favoritos).
  // - Si no hay búsqueda, muestra solo los favoritos.
  const listToShow =
    query !== ""
      ? ingredients.filter(
          (ing) =>
            ing.strIngredient
              .trim()
              .toLowerCase()
              .includes(query.trim().toLowerCase())
        )
      : favIngredients;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 16,
      backgroundColor: currentTheme.surface,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.border,
      shadowColor: currentTheme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      flex: 1,
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      color: currentTheme.textPrimary,
      marginRight: 40,
    },
    contentArea: {
      flex: 1,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: currentTheme.textPrimary,
      marginBottom: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={currentTheme.iconColor}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis ingredientes</Text>
      </View>

      <View style={styles.contentArea}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar nuevo ingrediente favorito"
        />
        {query === "" && (
          <Text style={styles.sectionTitle}>Ingredientes Favoritos</Text>
        )}
        {loading ? (
          <ActivityIndicator size="large" color={currentTheme.primary} />
        ) : (
          <FlatList
            data={listToShow}
            keyExtractor={(item) => item.idIngredient}
            renderItem={({ item }) => (
              <IngredientCard
                id={item.idIngredient}
                name={item.strIngredient}
                description={item.strDescription}
                isFav={!!favIds[item.idIngredient]}
                onToggleFav={handleToggleFav}
              />
            )}
            ListEmptyComponent={
              <Text
                style={{
                  color: currentTheme.textSecondary,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                No se encontraron ingredientes para "{query}".
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavIngredients;
