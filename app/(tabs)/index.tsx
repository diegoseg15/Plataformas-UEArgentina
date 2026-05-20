import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InternalWebLink } from "@/components/InternalWebLink";
import { AppTheme } from "@/constants/AppTheme";

type PlatformCard = {
  title: string;
  description: string;
  href: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const platforms: PlatformCard[] = [
  {
    title: "Régimen Sierra",
    description: "Accede al aula virtual del régimen Sierra.",
    href: "https://ueargentina.edu.ec/plataforma/sierra",
    icon: "book-outline",
  },
  {
    title: "Régimen Costa",
    description: "Ingresa a la plataforma educativa Costa.",
    href: "https://ueargentina.edu.ec/plataforma/costa",
    icon: "school-outline",
  },
  {
    title: "Semi Presencial",
    description: "Consulta recursos para modalidad semi presencial.",
    href: "https://ueargentina.edu.ec/plataforma/semipresencial",
    icon: "laptop-outline",
  },
  {
    title: "Europa",
    description: "Acceso para estudiantes del programa Europa.",
    href: "https://ueargentina.edu.ec/plataforma/europa",
    icon: "globe-outline",
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const theme = AppTheme.colors[isDarkMode ? "dark" : "light"];

  const styles = createStyles(theme, isDarkMode);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="school" size={34} color="#FFFFFF" />
        </View>

        <Text style={styles.heroTitle}>Plataformas educativas</Text>

        <Text style={styles.heroDescription}>
          Accede de forma rápida y segura a los espacios digitales de la Unidad
          Educativa A Distancia República de Argentina.
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Selecciona una plataforma</Text>
        <Text style={styles.sectionSubtitle}>
          El contenido se abrirá dentro de la app.
        </Text>
      </View>

      <View style={styles.grid}>
        {platforms.map((item) => (
          <InternalWebLink key={item.title} href={item.href} title={item.title}>
            <View style={styles.card}>
              <View style={styles.cardIcon}>
                <Ionicons name={item.icon} size={30} color={theme.primary} />
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={theme.textMuted}
              />
            </View>
          </InternalWebLink>
        ))}
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
      fontSize: 26,
      fontWeight: "800",
      color: "#FFFFFF",
      marginBottom: AppTheme.spacing.sm,
    },
    heroDescription: {
      fontSize: 15,
      lineHeight: 22,
      color: "rgba(255,255,255,0.88)",
    },
    sectionHeader: {
      marginBottom: AppTheme.spacing.md,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: theme.text,
    },
    sectionSubtitle: {
      marginTop: 4,
      fontSize: 14,
      color: theme.textMuted,
    },
    grid: {
      gap: AppTheme.spacing.md,
    },
    card: {
      minHeight: 108,
      backgroundColor: theme.surface,
      borderRadius: AppTheme.radius.md,
      padding: AppTheme.spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      gap: AppTheme.spacing.md,
      shadowColor: isDarkMode ? "#000" : "#101828",
      ...AppTheme.shadow.card,
    },
    cardPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.99 }],
    },
    cardIcon: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: isDarkMode ? "#1E3A5F" : "#EAF2FF",
      alignItems: "center",
      justifyContent: "center",
    },
    cardBody: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 13,
      lineHeight: 18,
      color: theme.textMuted,
    },
  });
}
