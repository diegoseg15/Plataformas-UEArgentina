import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

const HomeScreen: React.FC = () => {
  // Si la pantalla es mayor a 600px, muestra en fila horizontal; si no, 2x2.
  const isLargeScreen = width > 600;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://ueargentina.edu.ec/wp-content/uploads/2020/06/logo.png' }}
        style={styles.logo}
      />

      <View style={[styles.gridContainer, isLargeScreen && styles.largeScreenContainer]}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="school-outline" size={50} color="gray" />
          <Text style={styles.cardText}>Régimen Sierra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="school-outline" size={50} color="gray" />
          <Text style={styles.cardText}>Régimen Costa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="school-outline" size={50} color="gray" />
          <Text style={styles.cardText}>Semi Presencial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Ionicons name="school-outline" size={50} color="gray" />
          <Text style={styles.cardText}>Europa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginTop: 20,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row', // Por defecto muestra en filas
    flexWrap: 'wrap', // Permite que los elementos pasen a otra fila si no caben
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  largeScreenContainer: {
    flexWrap: 'nowrap', // En pantallas grandes, no se envuelve
    justifyContent: 'space-around', // Espacio uniforme entre los elementos
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;
