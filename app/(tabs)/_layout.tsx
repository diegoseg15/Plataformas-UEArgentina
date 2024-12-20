import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={30} color="dodgerblue" />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contactos',
          tabBarIcon: ({ color }) => <Ionicons name="call-outline" size={30} color="gray" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={30} color="gray" />,
        }}
      />
    </Tabs>
  );
}
