import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  name: string;
  ingredients: string[];
  imageUrl: string;
};

const RecetaCard = ({ name, ingredients, imageUrl }: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ingredients}>
          Ingredientes: {ingredients.slice(0, 3).join(', ')}...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  ingredients: {
    color: '#ccc',
    fontSize: 14,
  },
  iconContainer: {
    padding: 8,
  },
});

export default RecetaCard;
