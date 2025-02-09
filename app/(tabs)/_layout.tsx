import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Image, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#444' : '#DDD',
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: 75,
    },
    tabIcon: {
      fontSize: 30,
      marginVertical: 5,
    },
    tabLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 2,
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
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIconStyle: styles.tabIcon,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'} // Cambia dinámicamente el icono
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contactos',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? 'call' : 'call-outline'} // Cambia dinámicamente el icono
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Configuración',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'} // Cambia dinámicamente el icono
                size={30}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
