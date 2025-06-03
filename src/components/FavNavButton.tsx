import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";

type Props = {
  to: string;
  label: string;
  style?: ViewStyle;
  order?: number;
};

const BUTTON_SPACING = 100; // Espacio vertical entre botones
const BUTTON_BOTTOM = 50;  // Distancia del primer botón al borde inferior

const FavNavButton = ({ to, label, style, order = 0 }: Props) => {
  const router = useRouter();
  const { theme } = useTheme();

  const dynamicStyle = {
    bottom: BUTTON_BOTTOM + (order * BUTTON_SPACING),
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.primary, shadowColor: theme.shadowColor },
        dynamicStyle,
        style,
      ]}
      activeOpacity={0.8}
      onPress={() => router.push(to as any)}
    >
      <View style={styles.content}>
        <MaterialIcons name="star" size={28} color="#FFD700" style={styles.star} />
        <Text style={[styles.label, { color: theme.buttonPrimaryText }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 25,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 24,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 100,
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    marginBottom: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FavNavButton;