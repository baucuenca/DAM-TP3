import { useIsAuthenticated } from "@/src/hooks/useIsAuthenticated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../constants/firebaseConfig";
import { useTheme } from "../hooks/useTheme";
import { esFavorito, toggleFavorito } from "../services/favoritosStorage";

type Props = {
  id: string;
  name: string;
  category: string;
  area: string;
  image: string;
};

const RecipeCard = ({ id, name, category, area, image }: Props) => {
  const { theme } = useTheme();
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const user = auth.currentUser?.uid;
  const [esActualmenteFavorito, setEsActualmenteFavorito] = useState(false);

  useEffect(() => {
    const verificarFavorito = async () => {
      const esFav = await esFavorito(user, id);
      setEsActualmenteFavorito(esFav);
    };

    if (user) {
      verificarFavorito();
    }
  }, [user, id]);

  const onClickFavorito = (idMeal: Props["id"]) => {
    if (isAuthenticated) {
      toggleFavorito(user, idMeal);
      setEsActualmenteFavorito(!esActualmenteFavorito);
    } else {
      console.log("Debes estar autenticado/a para utilizar esa función.");
    }
  };

  const navigateToDetail = () => {
    router.push(`/RecipeDetail?id=${id}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.surface, shadowColor: theme.shadowColor },
      ]}
      onPress={navigateToDetail}
      activeOpacity={0.7}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={[styles.name, { color: theme.textPrimary }]}>
            {name}
          </Text>
          <Text style={[styles.meta, { color: theme.textSecondary }]}>
            {category} · {area}
          </Text>
        </View>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation(); // Evita que se ejecute la navegación
            onClickFavorito(id);
          }}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={esActualmenteFavorito ? "heart" : "heart-outline"}
            size={24}
            color={theme.iconColor}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 8,
  },
});

export default RecipeCard;
