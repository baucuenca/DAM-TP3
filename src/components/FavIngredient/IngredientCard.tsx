import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../constants/firebaseConfig";
import { useTheme } from "../../hooks/useTheme";
import { esFavIngredient, toggleFavIngredient } from "../../services/favoritosStorage";

type Props = {
  id: string;
  name: string;
  description?: string | null;
};

const IngredientCard = ({ id, name, description }: Props) => {
  const { theme } = useTheme();
  const user = auth.currentUser?.uid;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const checkFav = async () => {
      const fav = await esFavIngredient(user, id);
      setIsFav(fav);
    };
    if (user) checkFav();
  }, [user, id]);

  const onToggleFav = () => {
    if (user) {
      toggleFavIngredient(user, id);
      setIsFav(!isFav);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: theme.textPrimary }]}>{name}</Text>
        {description ? (
          <Text style={[styles.desc, { color: theme.textSecondary }]} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={onToggleFav}>
        <Ionicons name={isFav ? "heart" : "heart-outline"} size={24} color={theme.iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default IngredientCard;