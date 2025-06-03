import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

type Props = {
  name: string;
  category: string;
  area: string;
  image: string;
};

const RecipeCard = ({ name, category, area, image }: Props) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.surface, shadowColor: theme.shadowColor }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.textPrimary }]}>{name}</Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {category} · {area}
        </Text>
      </View>
    </View>
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
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
  },
});

export default RecipeCard;