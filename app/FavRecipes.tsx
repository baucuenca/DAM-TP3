import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FavRecipes = () => {
  const router = useRouter(); 
  const handleGoBack = () => {
    router.back();
  };

  const handleViewAllRecipes = () => {
    router.push('/Home'); 
  };

  const favoriteRecipes = [
    {
      id: '1',
      name: 'Fideos con Queso',
      ingredients: 'Ingredientes: ...', 
      image: 'https://placehold.co/100x100/E0E0E0/FFFFFF?text=Receta',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis favoritas</Text>
      </View>

      <ScrollView style={styles.contentArea}>
        <Text style={styles.sectionTitle}>Recetas</Text>

        {favoriteRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeDetails}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <Text style={styles.recipeIngredients}>{recipe.ingredients}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteIcon}>
               <Ionicons name="heart" size={24} />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllRecipes}>
          <Text style={styles.viewAllButtonText}>Ver Todas Las Recetas</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50, 
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333333',
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginRight: 40,
  },
  contentArea: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
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
    color: '#333333',
    marginBottom: 4,
  },
  recipeIngredients: {
    fontSize: 14,
    color: '#666666',
  },
  favoriteIcon: {
    padding: 8,
  },
  heartIcon: {
    fontSize: 24,
    color: '#FF6347', 
  },
  viewAllButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  viewAllButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default FavRecipes;