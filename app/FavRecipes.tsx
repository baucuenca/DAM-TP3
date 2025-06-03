import RecipesList from '@/src/components/favRecipes/recipesList';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../src/context/ThemeContext';
import { useProtectedRoute } from '../src/hooks/useProtectedRoute';

const FavRecipes = () => {
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
      flexDirection: 'row',
      alignItems: 'center',
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
    backButtonText: { 
      fontSize: 24,
      color: currentTheme.iconColor, 
    },
    headerTitle: {
      flex: 1,
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      color: currentTheme.textPrimary, 
      marginRight: 40,
    },
    contentArea: {
      flex: 1,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: currentTheme.textPrimary, 
      marginBottom: 16,
    },
    recipeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.surface, 
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      shadowColor: currentTheme.shadowColor, 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    recipeImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
    },
    recipeDetails: {
      flex: 1,
    },
    recipeName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: currentTheme.textPrimary, 
      marginBottom: 4,
    },
    recipeIngredients: {
      fontSize: 14,
      color: currentTheme.textSecondary,
    },
    favoriteIcon: {
      padding: 8,
    },
    heartIcon: { 
      fontSize: 24,
      color: currentTheme.primary, 
    },
    buttonPrimary: {
      backgroundColor: currentTheme.buttonPrimary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      shadowColor: currentTheme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, 
      marginBottom: 20, 
    },
    buttonPrimaryText: {
      color: currentTheme.buttonPrimaryText,
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonSecondary: {
      backgroundColor: currentTheme.buttonSecondary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    buttonSecondaryText: {
      color: currentTheme.buttonSecondaryText,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={currentTheme.iconColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis favoritas</Text>
      </View>

      <ScrollView style={styles.contentArea}>
        <Text style={styles.sectionTitle}>Recetas</Text>
        <RecipesList/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavRecipes;
