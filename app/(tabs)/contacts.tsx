import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, useColorScheme } from 'react-native';

const ContactScreen: React.FC = () => {
  const colorScheme = useColorScheme(); // Detectar el modo oscuro o claro

  // Función para abrir enlaces telefónicos
  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Función para abrir el correo electrónico
  const handleEmail = () => {
    Linking.openURL('mailto:administracion@ueargentina.edu.ec');
  };

  // Función para abrir la página web del colegio
  const handleWebsite = () => {
    Linking.openURL('https://ueargentina.edu.ec/');
  };

  // Función para abrir las redes sociales
  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>

      {/* Nueva sección: Página web */}
      <ThemedText type='title' style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Visita nuestra Página Web</ThemedText>
      <TouchableOpacity onPress={handleWebsite} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }]}>
        <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#fff' : '#007BFF' }]}>www.ueargentina.edu.ec</Text>
      </TouchableOpacity>

      {/* Nueva sección: Redes sociales */}
      <ThemedText type='title' style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Síguenos en Redes Sociales</ThemedText>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => handleSocialLink('https://www.facebook.com/ue.argentina')} style={[styles.socialButton]}>
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialLink('https://tiktok.com/ued_republicadeargentina')} style={[styles.socialButton]}>
          <Text style={styles.socialButtonText}>TikTok</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSocialLink('https://www.instagram.com/ueargentina')} style={[styles.socialButton]}>
          <Text style={styles.socialButtonText}>Instagram</Text>
        </TouchableOpacity>
      </View>

      <ThemedText type='title' style={[styles.title]}>Contáctanos</ThemedText>

      <View style={styles.contactContainer}>
        <ThemedText type='subtitle' style={[styles.sectionTitle]}>Teléfonos:</ThemedText>
        <TouchableOpacity onPress={() => handleCall('+59332825180')} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }]}>
          <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#fff' : '#007BFF' }]}>Ambato: (+593)3 2 825 180</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCall('+593995690287')} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }]}>
          <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#fff' : '#007BFF' }]}>Latacunga: (+593)99 569 0287</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCall('+59332568928')} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }]}>
          <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#fff' : '#007BFF' }]}>La Maná: (+593)3 2 568 928</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCall('+593994601717')} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }]}>
          <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#fff' : '#007BFF' }]}>La Maná: (+593)99 460 1717</Text>
        </TouchableOpacity>

        <ThemedText type='subtitle' style={[styles.sectionTitle]}>Email:</ThemedText>
        <TouchableOpacity onPress={handleEmail} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }]}>
          <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#fff' : '#007BFF' }]}>administracion@ueargentina.edu.ec</Text>
        </TouchableOpacity>
      </View>

      <ThemedText type='title' style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Visítanos En</ThemedText>

      <View style={styles.addressContainer}>
        <ThemedText type='default' style={[styles.contactText]}>Ambato: Rocafuerte 1720 y Guayaquil</ThemedText>
        <ThemedText type='default' style={[styles.contactText]}>Latacunga: Amazonas 8100 y Sucre</ThemedText>
        <ThemedText type='default' style={[styles.contactText]}>La Maná: Amazonas y los Álamos</ThemedText>
      </View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  contactContainer: {
    marginVertical: 20,
  },
  addressContainer: {
    marginTop: 10,
    marginBottom: 50,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  socialButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    marginVertical: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ContactScreen;
