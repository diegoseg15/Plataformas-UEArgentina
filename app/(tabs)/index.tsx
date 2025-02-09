import React from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExternalLink } from '@/components/ExternalLink'; // Ajusta la ruta correcta

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme(); // Detectar el esquema de color actual

  // Si la pantalla es mayor a 600px, muestra en fila horizontal; si no, 2x2.
  const isLargeScreen = width > 600;

  // Definir los estilos para los dos modos (oscuro y claro)
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f8f8f8', // Fondo oscuro o claro
      alignItems: 'center',
      justifyContent: 'center',
    },
    gridContainer: {
      flexDirection: 'row', // Distribuye las tarjetas en filas
      flexWrap: 'wrap', // Permite que las tarjetas se distribuyan en varias filas si es necesario
      justifyContent: 'center', // Alinea las tarjetas horizontalmente en el centro
      alignItems: 'center', // Alinea las tarjetas verticalmente en el centro
      marginVertical: 10,
      gap:10,
    },
    largeScreenContainer: {
      flexWrap: 'nowrap', // En pantallas grandes, las tarjetas no se envuelven
      justifyContent: 'space-around', // Espaciado uniforme entre las tarjetas
    },
    card: {
      backgroundColor: isDarkMode ? '#333' : '#fff', // Fondo de la tarjeta oscuro o claro
      width: 150,
      height: 150,
      borderRadius: 10,
      justifyContent: 'center', // Centra el contenido verticalmente
      alignItems: 'center', // Centra el contenido horizontalmente
      margin: 10,
      shadowColor: isDarkMode ? '#000' : '#ccc', // Sombra en modo oscuro o claro
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    cardText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#333', // Texto blanco en modo oscuro, negro en claro
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* Contenedor de las tarjetas */}
      <View style={[styles.gridContainer, isLargeScreen && styles.largeScreenContainer]}>
        <ExternalLink href="http://colegioargentina.net/aulavirtual/login/index.php">
          <View style={styles.card}>
            <Ionicons name="book-outline" size={50} color={isDarkMode ? 'white' : 'gray'} />
            <Text style={styles.cardText}>Régimen Sierra</Text>
          </View>
        </ExternalLink>

        <ExternalLink href="https://ueargentina.net/costa/login/index.php">
          <View style={styles.card}>
            <Ionicons name="school-outline" size={50} color={isDarkMode ? 'white' : 'gray'} />
            <Text style={styles.cardText}>Régimen Costa</Text>
          </View>
        </ExternalLink>

        <ExternalLink href="http://colegioargentina.net/aulavirtual/login/index.php">
          <View style={styles.card}>
            <Ionicons name="laptop-outline" size={50} color={isDarkMode ? 'white' : 'gray'} />
            <Text style={styles.cardText}>Semi Presencial</Text>
          </View>
        </ExternalLink>

        <ExternalLink href="https://colegioargentina.net/europa">
          <View style={styles.card}>
            <Ionicons name="globe-outline" size={50} color={isDarkMode ? 'white' : 'gray'} />
            <Text style={styles.cardText}>Europa</Text>
          </View>
        </ExternalLink>

        
      </View>
    </View>
  );
};

export default HomeScreen;
