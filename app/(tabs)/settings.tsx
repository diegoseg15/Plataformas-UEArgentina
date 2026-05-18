import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function Settings() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);

    if (value) {
      Alert.alert(
        "Notificaciones",
        "Las notificaciones push completas requieren una development build en Android desde Expo SDK 53. Esta opción quedará preparada para la versión compilada.",
      );
    }
  };

  const handleHelp = () => {
    Alert.alert(
      "Ayuda",
      "Bienvenido a la app de la Unidad Educativa A Distancia República de Argentina.\n\n" +
        '1. En la pestaña "Inicio", accede fácilmente a las plataformas educativas del colegio.\n' +
        '2. Usa la sección "Contactos" para comunicarte con el equipo administrativo y docente.\n' +
        '3. En "Configuración" puedes gestionar opciones generales de la app.\n\n' +
        "Si necesitas más ayuda, contáctanos escribiendo a administracion@ueargentina.edu.ec.",
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "Acerca de",
      "Unidad Educativa A Distancia República de Argentina\n\n" +
        "Aplicación diseñada para facilitar el acceso a las plataformas de estudio del colegio.\n\n" +
        "Características principales:\n" +
        "- Navegación interna hacia plataformas educativas.\n" +
        "- Acceso rápido a contactos institucionales.\n" +
        "- Configuración personalizada para estudiantes.\n\n" +
        "Desarrollador: Diego Segovia (diegoseg_15 / diegoseg15)\n" +
        "Versión: 1.1.0\n" +
        "Derechos reservados © UEArgentina.",
    );
  };

  const handleLegal = () => {
    router.push(
      `/browser?url=${encodeURIComponent("https://ueargentina.edu.ec/legalidad/")}&title=${encodeURIComponent(
        "Legalidad",
      )}`,
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#f8f8f8",
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 20,
      backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
      borderRadius: 10,
      padding: 15,
      elevation: 3,
      shadowColor: isDarkMode ? "#444" : "#ccc",
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
      marginBottom: 12,
    },
    optionText: {
      fontSize: 16,
      color: isDarkMode ? "#fff" : "#333",
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rowOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
    },
    switchLabel: {
      fontSize: 16,
      color: isDarkMode ? "#fff" : "#333",
    },
    icon: {
      marginRight: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración General</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Notificaciones</Text>
          <Switch
            trackColor={{
              false: "#767577",
              true: Colors[colorScheme ?? "light"].tint,
            }}
            thumbColor={
              isEnabled ? Colors[colorScheme ?? "light"].tint : "#f4f3f4"
            }
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legalidad</Text>

        <TouchableOpacity style={styles.rowOption} onPress={handleLegal}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Ver Legalidad</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ayuda</Text>

        <TouchableOpacity style={styles.rowOption} onPress={handleHelp}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
            style={styles.icon}
          />
          <Text style={styles.optionText}>¿Necesitas ayuda?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acerca de</Text>

        <TouchableOpacity style={styles.rowOption} onPress={handleAbout}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
            style={styles.icon}
          />
          <Text style={styles.optionText}>V1.1.0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
