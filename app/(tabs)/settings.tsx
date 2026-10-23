import React, { useEffect, useState } from 'react';
import { AppState, Platform, View, Text, StyleSheet, Switch, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function Settings() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const notificationsAvailable = Platform.OS !== 'web' &&
    Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  const [isEnabled, setIsEnabled] = useState(false); // Estado para el Switch

  useEffect(() => {
    // Función para verificar el estado de los permisos
    const checkNotificationPermissions = async () => {
      if (!notificationsAvailable) return;
      try {
        const Notifications = await import('expo-notifications');
        const { granted } = await Notifications.getPermissionsAsync();
        setIsEnabled(granted);
      } catch {
        setIsEnabled(false);
      }
    };

    checkNotificationPermissions(); // Verificar permisos al montar el componente
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void checkNotificationPermissions();
    });
    return () => subscription.remove();
  }, [notificationsAvailable]);

  // Función para solicitar permisos de notificación
  const requestNotificationPermission = async () => {
    try {
      const Notifications = await import('expo-notifications');
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'General',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
      const { granted, canAskAgain } = await Notifications.requestPermissionsAsync();
      setIsEnabled(granted);
      if (!granted) {
        Alert.alert('Permiso no concedido', canAskAgain
          ? 'No se han otorgado los permisos de notificación.'
          : 'Puedes cambiar los permisos desde los ajustes del dispositivo.');
      }
    } catch {
      Alert.alert('Notificaciones no disponibles', 'No se pudo consultar el permiso. Inténtalo de nuevo.');
    }
  };

  // Función para cambiar el valor del switch
  const toggleSwitch = async (value: boolean) => {
    if (!notificationsAvailable) return;
    if (value) {
      // Si el switch se activa, solicitamos permisos
      await requestNotificationPermission();
    } else {
      try {
        await Linking.openSettings();
      } catch {
        Alert.alert('Permisos', 'Cambia el permiso de notificaciones en los ajustes del dispositivo.');
      }
    }
  };

  // Función para mostrar Ayuda
  const handleHelp = () => {
    Alert.alert(
      'Ayuda',
      'Bienvenido a la app de la Unidad Educativa A Distancia República de Argentina.\n\n' +
        'Aquí te damos algunos consejos para aprovechar al máximo la app:\n' +
        '1. En la pestaña "Inicio", accede fácilmente a las plataformas educativas del colegio.\n' +
        '2. Usa la sección "Contactos" para comunicarte con el equipo administrativo y docente.\n' +
        '3. Personaliza tu experiencia en "Configuración" activando o desactivando notificaciones y ajustando el tema de la app.\n\n' +
        'Si necesitas más ayuda, contáctanos escribiendo a administracion@ueargentina.edu.ec.'
    );
  };

  // Función para mostrar Acerca de
  const handleAbout = () => {
    Alert.alert(
      'Acerca de',
      'Unidad Educativa A Distancia República de Argentina\n\n' +
        'Descripción: Una aplicación diseñada para facilitar el acceso a las plataformas de estudio de nuestro colegio.\n\n' +
        'Características principales:\n' +
        '- Navegación intuitiva hacia plataformas educativas.\n' +
        '- Configuración personalizada para estudiantes.\n\n' +
        'Desarrollador: Diego Segovia (diegoseg_15 / diegoseg15)\n' +
        `Versión: ${appVersion}\n` +
        'Fecha de lanzamiento: Noviembre 2024\n\n' +
        'Derechos reservados © UEArgentina.'
    );
  };

  // Función para abrir la página de legalidad
  const handleLegal = () => {
    Linking.openURL('https://ueargentina.edu.ec/legalidad/');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f8f8f8',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 20,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 10,
      padding: 15,
      elevation: 3, // Sombra para darle profundidad en Android
      shadowColor: isDarkMode ? '#444' : '#ccc', // Sombra más suave en modo claro
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    optionText: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#333',
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    switchLabel: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#333',
    },
    icon: {
      marginRight: 10,
    },
  });

  return (
    <View style={styles.container}>
      {/* General Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración General</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Notificaciones</Text>
          <Switch
            disabled={!notificationsAvailable}
            trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
            thumbColor={isEnabled ? Colors[colorScheme ?? 'light'].tint : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      {/* Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legalidad</Text>
        <TouchableOpacity style={styles.switchContainer} onPress={handleLegal}>
          <Ionicons name="document-text-outline" size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
          <Text style={styles.optionText}>Ver Legalidad</Text>
        </TouchableOpacity>
      </View>

      {/* Help Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ayuda</Text>
        <TouchableOpacity style={styles.switchContainer} onPress={handleHelp}>
          <Ionicons name="help-circle-outline" size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
          <Text style={styles.optionText}>¿Necesitas ayuda?</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acerca de</Text>
        <TouchableOpacity style={styles.switchContainer} onPress={handleAbout}>
          <Ionicons name="information-circle-outline" size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
          <Text style={styles.optionText}>V{appVersion}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
