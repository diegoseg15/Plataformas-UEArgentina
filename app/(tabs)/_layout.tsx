import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import { AppTheme } from "@/constants/AppTheme";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const theme = AppTheme.colors[isDarkMode ? "dark" : "light"];

  const styles = createStyles(theme, isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoCard}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
            />
          </View>
        </View>

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.textMuted,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            tabBarItemStyle: styles.tabItem,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Inicio",
              tabBarIcon: ({ focused, color }) => (
                <View
                  style={[styles.iconWrap, focused && styles.iconWrapActive]}
                >
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={22}
                    color={color}
                  />
                </View>
              ),
            }}
          />

          <Tabs.Screen
            name="contacts"
            options={{
              title: "Contactos",
              tabBarIcon: ({ focused, color }) => (
                <View
                  style={[styles.iconWrap, focused && styles.iconWrapActive]}
                >
                  <Ionicons
                    name={focused ? "call" : "call-outline"}
                    size={22}
                    color={color}
                  />
                </View>
              ),
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: "Configuración",
              tabBarIcon: ({ focused, color }) => (
                <View
                  style={[styles.iconWrap, focused && styles.iconWrapActive]}
                >
                  <Ionicons
                    name={focused ? "settings" : "settings-outline"}
                    size={22}
                    color={color}
                  />
                </View>
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}

function createStyles(
  theme: typeof AppTheme.colors.light,
  isDarkMode: boolean,
) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: AppTheme.spacing.md,
      paddingTop: AppTheme.spacing.sm,
      paddingBottom: AppTheme.spacing.md,
      backgroundColor: theme.background,
    },
    logoCard: {
      height: 76,
      borderRadius: AppTheme.radius.lg,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: isDarkMode ? "#000" : "#101828",
      ...AppTheme.shadow.card,
    },
    logo: {
      width: 210,
      height: 54,
      resizeMode: "contain",
    },
    tabBar: {
      height: 76,
      paddingTop: 8,
      paddingBottom: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      shadowColor: isDarkMode ? "#000" : "#101828",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 10,
    },
    tabItem: {
      borderRadius: AppTheme.radius.md,
    },
    tabLabel: {
      fontSize: 12,
      fontWeight: "700",
      marginTop: 2,
    },
    iconWrap: {
      width: 42,
      height: 32,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
    },
    iconWrapActive: {
      backgroundColor: isDarkMode ? "#1E3A5F" : "#EAF2FF",
    },
  });
}
