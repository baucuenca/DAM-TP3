import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IngredientsList from "../src/components/FavIngredient/IngredientsList";
import { ThemeContext } from "../src/context/ThemeContext";
import { useProtectedRoute } from "../src/hooks/useProtectedRoute";

const FavIngredients = () => {
  useProtectedRoute();
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const { theme: currentTheme } = useContext(ThemeContext);

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
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={currentTheme.iconColor}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis ingredientes</Text>
      </View>

      <View style={styles.contentArea}>
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <IngredientsList />
      </View>
    </SafeAreaView>
  );
};

export default FavIngredients;
