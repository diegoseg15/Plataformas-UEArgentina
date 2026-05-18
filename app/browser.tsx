import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

export default function BrowserScreen() {
  const { url, title } = useLocalSearchParams<{
    url?: string;
    title?: string;
  }>();

  if (!url) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: title ?? "Navegador",
          headerShown: true,
        }}
      />

      <WebView
        source={{ uri: decodeURIComponent(url) }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});
