import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppTheme } from "@/constants/AppTheme";

type SettingsAction = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function Settings() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const theme = AppTheme.colors[isDarkMode ? "dark" : "light"];
  const styles = createStyles(theme, isDarkMode);

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

  const actions: SettingsAction[] = [
    {
      title: "Legalidad",
      description: "Consulta políticas, términos e información institucional.",
      icon: "document-text-outline",
      onPress: handleLegal,
    },
    {
      title: "Ayuda",
      description: "Revisa cómo usar la aplicación y sus accesos principales.",
      icon: "help-circle-outline",
      onPress: handleHelp,
    },
    {
      title: "Acerca de",
      description: "Versión 1.1.0 · Información de la aplicación.",
      icon: "information-circle-outline",
      onPress: handleAbout,
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="settings" size={32} color="#FFFFFF" />
        </View>

        <Text style={styles.heroTitle}>Configuración</Text>

        <Text style={styles.heroDescription}>
          Gestiona opciones generales, revisa información legal y consulta datos
          de la aplicación.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <Text style={styles.sectionSubtitle}>
            Ajustes básicos de experiencia dentro de la app.
          </Text>
        </View>

        <View style={styles.preferenceRow}>
          <View style={styles.actionIcon}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={theme.primary}
            />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Notificaciones</Text>
            <Text style={styles.actionValue}>
              Preparado para funcionar en la versión compilada.
            </Text>
          </View>

          <Switch
            trackColor={{
              false: isDarkMode ? "#374151" : "#D0D5DD",
              true: theme.primary,
            }}
            thumbColor={isEnabled ? "#FFFFFF" : "#F4F3F4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Información</Text>
          <Text style={styles.sectionSubtitle}>
            Accesos útiles y detalles importantes.
          </Text>
        </View>

        <View style={styles.sectionBody}>
          {actions.map((item) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.75}
              onPress={item.onPress}
              style={styles.actionRow}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={item.icon} size={22} color={theme.primary} />
              </View>

              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{item.title}</Text>
                <Text style={styles.actionValue}>{item.description}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function createStyles(
  theme: typeof AppTheme.colors.light,
  isDarkMode: boolean,
) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: AppTheme.spacing.md,
      paddingBottom: AppTheme.spacing.xl,
    },
    hero: {
      backgroundColor: theme.primary,
      borderRadius: AppTheme.radius.lg,
      padding: AppTheme.spacing.lg,
      marginBottom: AppTheme.spacing.lg,
    },
    heroIcon: {
      width: 58,
      height: 58,
      borderRadius: 18,
      backgroundColor: "rgba(255,255,255,0.18)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: AppTheme.spacing.md,
    },
    heroTitle: {
      fontSize: 25,
      fontWeight: "800",
      color: "#FFFFFF",
      marginBottom: AppTheme.spacing.sm,
    },
    heroDescription: {
      fontSize: 15,
      lineHeight: 22,
      color: "rgba(255,255,255,0.88)",
    },
    section: {
      backgroundColor: theme.surface,
      borderRadius: AppTheme.radius.lg,
      padding: AppTheme.spacing.md,
      marginBottom: AppTheme.spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: isDarkMode ? "#000" : "#101828",
      ...AppTheme.shadow.card,
    },
    sectionHeader: {
      marginBottom: AppTheme.spacing.sm,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
    },
    sectionSubtitle: {
      fontSize: 13,
      color: theme.textMuted,
      marginTop: 3,
    },
    sectionBody: {
      gap: AppTheme.spacing.sm,
    },
    preferenceRow: {
      minHeight: 78,
      borderRadius: AppTheme.radius.md,
      backgroundColor: isDarkMode ? theme.surfaceSoft : "#F8FAFC",
      paddingHorizontal: AppTheme.spacing.md,
      paddingVertical: AppTheme.spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      gap: AppTheme.spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionRow: {
      minHeight: 78,
      borderRadius: AppTheme.radius.md,
      backgroundColor: isDarkMode ? theme.surfaceSoft : "#F8FAFC",
      paddingHorizontal: AppTheme.spacing.md,
      paddingVertical: AppTheme.spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      gap: AppTheme.spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: isDarkMode ? "#1E3A5F" : "#EAF2FF",
      alignItems: "center",
      justifyContent: "center",
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 15,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 2,
    },
    actionValue: {
      fontSize: 13,
      lineHeight: 18,
      color: theme.textMuted,
    },
  });
}