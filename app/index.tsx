import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RecipeCard from "../src/components/Home/RecipeCard";
import SearchBar from "../src/components/Home/SearchBar";
import Menu from "../src/components/Menu/Menu";
import MenuOption from "../src/components/Menu/MenuOption";
import { auth } from "../src/constants/firebaseConfig";
import { useTheme } from "../src/hooks/useTheme";

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
};

function Home() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const fetchRecipes = async (search: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch {
      setRecipes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes(""); // Carga inicial
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Buscar Recetas
        </Text>
      </View>
      <SearchBar
        value={query}
        onChange={(text) => {
          setQuery(text);
          fetchRecipes(text);
        }}
        placeholder="Buscar por nombre..."
      />
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <RecipeCard
              name={item.strMeal}
              category={item.strCategory}
              area={item.strArea}
              image={item.strMealThumb}
            />
          )}
          ListEmptyComponent={
            <Text
              style={{
                color: theme.textSecondary,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              No se encontraron recetas para "{query}".
            </Text>
          }
        />
      )}
      <Menu>
        <MenuOption
          label="Recetas favoritas"
          icon="star"
          onPress={() => router.push("/FavRecipes")}
        />
        <MenuOption
          label="Ingredientes favoritos"
          icon="kitchen"
          onPress={() => router.push("/FavIngredients")}
        />
        {!user && (
          <MenuOption
            label="Iniciar sesion"
            icon="login"
            onPress={() => router.push("/Login")}
          />
        )}
        {user && (
          <MenuOption
            label="Cerrar sesión"
            icon="logout"
            onPress={async () => await signOut(auth)}
          />
        )}
      </Menu>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24, // Espacio para la barra de estado
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});

export default Home;
