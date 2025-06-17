import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  id: string;
  name: string;
  description?: string | null;
  isFav: boolean;
  onToggleFav: (id: string) => void;
};

const IngredientCard = ({ id, name, description, isFav, onToggleFav }: Props) => {
  const { theme } = useTheme();

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
      <TouchableOpacity onPress={() => onToggleFav(id)}>
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