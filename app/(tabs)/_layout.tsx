import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

const tabItems: Record<string, {
  label: string;
  activeIcon: React.ComponentProps<typeof Ionicons>['name'];
  inactiveIcon: React.ComponentProps<typeof Ionicons>['name'];
}> = {
  index: { label: 'Home', activeIcon: 'home', inactiveIcon: 'home-outline' },
  contacts: { label: 'Contactos', activeIcon: 'call', inactiveIcon: 'call-outline' },
  settings: { label: 'Configuración', activeIcon: 'settings', inactiveIcon: 'settings-outline' },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',

    },
    logo: {
      width: 200,
      height: 60,
      resizeMode: 'contain',
      marginTop: 30,
      alignSelf: 'center',
    },
    tabBar: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderTopWidth: 0,
      paddingTop: 12,
      paddingHorizontal: 12,
      minHeight: 80,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabButton: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
      borderRadius: 50,
      paddingHorizontal: 18,
      paddingVertical: 10,
      gap: 8,
    },
    activeTabButton: {
      backgroundColor: isDarkMode ? '#E2E8F0' : '#1E293B',
    },
    tabLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#0F172A' : '#FFFFFF',
      flexShrink: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <Image
        source={require('@/assets/images/logo.png')} // Ruta local
        style={styles.logo}
      />
      </View>

      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarButton: (props) => {
            const focused = props['aria-selected'] === true;
            const tab = tabItems[route.name];
            const iconColor = focused
              ? (isDarkMode ? '#0F172A' : '#FFFFFF')
              : (isDarkMode ? '#CBD5E1' : '#475569');

            return (
              <HapticTab
                {...props}
                style={[props.style, styles.tabButton, focused && styles.activeTabButton]}>
                <Ionicons
                  name={focused ? tab.activeIcon : tab.inactiveIcon}
                  size={26}
                  color={iconColor}
                  accessible={false}
                />
                {focused && <Text style={styles.tabLabel}>{tab.label}</Text>}
              </HapticTab>
            );
          },
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
          tabBarShowLabel: false,
        })}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contactos',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Configuración',
          }}
        />
      </Tabs>
    </View>
  );
}
