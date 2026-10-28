import React from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import { isSafeWebUrl } from "@/utils/webUrls";

type ContactColors = {
  background: string;
  surface: string;
  surfaceSoft: string;
  primary: string;
  text: string;
  textMuted: string;
  border: string;
  banner: string;
  bannerBorder: string;
  bannerTitle: string;
  bannerSubtitle: string;
};

type ContactAction = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

type AddressItem = {
  city: string;
  address: string;
  query: string;
};

export default function ContactScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { width } = useWindowDimensions();
  const theme: ContactColors = isDarkMode
    ? {
        background: "#101827", surface: "#1B273B", surfaceSoft: "#101827",
        primary: "#A7C7FF", text: "#F3F6FC", textMuted: "#B7C5D9", border: "#33445C",
        banner: "#12305F", bannerBorder: "rgba(126, 176, 255, 0.32)",
        bannerTitle: "#FFFFFF", bannerSubtitle: "#C6D8F2",
      }
    : {
        background: "#F5F7FB", surface: "#FFFFFF", surfaceSoft: "#F5F7FB",
        primary: "#2456A6", text: "#182944", textMuted: "#52647E", border: "#DCE5F1",
        banner: "#E7F0FF", bannerBorder: "#C3D7F4",
        bannerTitle: "#12294D", bannerSubtitle: "#40597C",
      };
  const styles = createStyles(theme, isDarkMode);

  const openUrl = async (url: string) => {
    if (!isSafeWebUrl(url)) {
      Alert.alert("Enlace no disponible", "Solo se permiten enlaces web HTTPS sin credenciales.");
      return;
    }

    if (Platform.OS === "web") {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      await openBrowserAsync(url);
    } catch {
      Alert.alert("No se pudo abrir el enlace", "Comprueba tu conexión e inténtalo de nuevo.");
    }
  };

  const openContact = async (url: `tel:${string}` | `mailto:${string}`) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "No se pudo abrir",
        "El dispositivo no pudo abrir esta acción.",
      );
    }
  };

  const phoneActions: ContactAction[] = [
    {
      label: "Ambato",
      value: "+593 3 282 5180",
      icon: "call-outline",
      onPress: () => { void openContact("tel:+59332825180"); },
    },
    {
      label: "Latacunga",
      value: "+593 99 569 0287",
      icon: "call-outline",
      onPress: () => { void openContact("tel:+593995690287"); },
    },
    {
      label: "La Maná",
      value: "+593 3 256 8928",
      icon: "call-outline",
      onPress: () => { void openContact("tel:+59332568928"); },
    },
    {
      label: "La Maná",
      value: "+593 99 460 1717",
      icon: "call-outline",
      onPress: () => { void openContact("tel:+593994601717"); },
    },
  ];

  const socialActions: ContactAction[] = [
    {
      label: "Facebook",
      value: "ue.argentina",
      icon: "logo-facebook",
      onPress: () => { void openUrl("https://www.facebook.com/ue.argentina"); },
    },
    {
      label: "TikTok",
      value: "@ued_republicadeargentina",
      icon: "logo-tiktok",
      onPress: () => { void openUrl("https://tiktok.com/@ued_republicadeargentina"); },
    },
    {
      label: "Instagram",
      value: "@ueargentina",
      icon: "logo-instagram",
      onPress: () => { void openUrl("https://www.instagram.com/ueargentina"); },
    },
  ];

  const addresses: AddressItem[] = [
    {
      city: "Ambato",
      address: "Rocafuerte 1720 y Guayaquil",
      query:
        "Unidad Educativa a Distancia República de Argentina, Rocafuerte 1720 y Guayaquil, Ambato, Ecuador",
    },
    {
      city: "Latacunga",
      address: "Amazonas 8100 y Sucre",
      query:
        "Unidad Educativa a Distancia República de Argentina, Amazonas 8100 y Sucre, Latacunga, Ecuador",
    },
    {
      city: "La Maná",
      address: "Amazonas y los Álamos",
      query:
        "Unidad Educativa a Distancia República de Argentina, Amazonas y los Álamos, La Maná, Ecuador",
    },
  ];

  const openMap = (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    void openUrl(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingHorizontal: width < 380 ? 16 : 24 }]}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="call" size={32} color={theme.primary} accessible={false} />
        </View>

        <Text accessibilityRole="header" style={styles.heroTitle}>Contacto institucional</Text>

        <Text style={styles.heroDescription}>
          Comunícate con la institución, visita nuestros canales oficiales o
          encuentra nuestras sedes principales.
        </Text>
      </View>

      <Section
        title="Página web"
        subtitle="Accede al sitio oficial de la institución."
        styles={styles}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          accessibilityRole="link"
          accessibilityLabel="Sitio oficial: www.ueargentina.edu.ec"
          accessibilityHint="Abre el sitio oficial en un navegador externo"
          onPress={() => { void openUrl("https://ueargentina.edu.ec/"); }}
        >
          <View style={styles.actionRow}>
            <View style={styles.actionIcon}>
              <Ionicons name="globe-outline" size={22} color={theme.primary} accessible={false} />
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Sitio oficial</Text>
              <Text style={styles.actionValue}>www.ueargentina.edu.ec</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              accessible={false}
              size={20}
              color={theme.textMuted}
            />
          </View>
        </TouchableOpacity>
      </Section>

      <Section
        title="Redes sociales"
        subtitle="Síguenos en nuestros canales oficiales."
        styles={styles}
      >
        {socialActions.map((item) => (
          <ActionRow
            key={item.label}
            item={item}
            theme={theme}
            styles={styles}
          />
        ))}
      </Section>

      <Section
        title="Teléfonos"
        subtitle="Toca un número para llamar directamente."
        styles={styles}
      >
        {phoneActions.map((item, index) => (
          <ActionRow
            key={`${item.label}-${index}`}
            item={item}
            theme={theme}
            styles={styles}
          />
        ))}
      </Section>

      <Section
        title="Correo electrónico"
        subtitle="Envía un mensaje al área administrativa."
        styles={styles}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          accessibilityRole="link"
          accessibilityLabel="Administración: administracion@ueargentina.edu.ec"
          accessibilityHint="Abre tu aplicación de correo"
          onPress={() => { void openContact("mailto:administracion@ueargentina.edu.ec"); }}
          style={styles.actionRow}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="mail-outline" size={22} color={theme.primary} accessible={false} />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Administración</Text>
            <Text style={styles.actionValue}>
              administracion@ueargentina.edu.ec
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={theme.textMuted} accessible={false} />
        </TouchableOpacity>
      </Section>

      <Section
        title="Direcciones"
        subtitle="Sedes principales de atención."
        styles={styles}
      >
        {addresses.map((item) => (
          <TouchableOpacity
            key={item.city}
            activeOpacity={0.75}
            accessibilityRole="link"
            accessibilityLabel={`${item.city}: ${item.address}`}
            accessibilityHint="Abre la dirección en Google Maps en un navegador externo"
            onPress={() => openMap(item.query)}
            style={styles.addressRow}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="location-outline"
                accessible={false}
                size={22}
                color={theme.primary}
              />
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{item.city}</Text>
              <Text style={styles.actionValue}>{item.address}</Text>
            </View>

            <Ionicons
              name="navigate-outline"
              accessible={false}
              size={20}
              color={theme.textMuted}
            />
          </TouchableOpacity>
        ))}
      </Section>
    </ScrollView>
  );
}

function Section({
  title,
  subtitle,
  children,
  styles,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function ActionRow({
  item,
  theme,
  styles,
}: {
  item: ContactAction;
  theme: ContactColors;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      accessibilityRole="link"
      accessibilityLabel={`${item.label}: ${item.value}`}
      accessibilityHint={item.icon === "call-outline" ? "Abre el teléfono para llamar" : "Abre el canal oficial en un navegador externo"}
      onPress={item.onPress}
      style={styles.actionRow}
    >
      <View style={styles.actionIcon}>
        <Ionicons name={item.icon} size={22} color={theme.primary} accessible={false} />
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{item.label}</Text>
        <Text style={styles.actionValue}>{item.value}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={theme.textMuted} accessible={false} />
    </TouchableOpacity>
  );
}

function createStyles(
  theme: ContactColors,
  isDarkMode: boolean,
) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      paddingVertical: 32,
      paddingBottom: 100,
      width: "100%",
      maxWidth: 960,
      alignSelf: "center",
    },
    hero: {
      backgroundColor: theme.banner,
      borderColor: theme.bannerBorder,
      borderWidth: 1,
      borderRadius: 26,
      padding: 26,
      marginBottom: 20,
    },
    heroIcon: {
      width: 58,
      height: 58,
      borderRadius: 18,
      backgroundColor: "rgba(255,255,255,0.18)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    heroTitle: {
      fontSize: 32,
      fontWeight: "800",
      color: theme.bannerTitle,
      letterSpacing: -0.8,
      marginBottom: 8,
    },
    heroDescription: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.bannerSubtitle,
    },
    section: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.border,
      ...Platform.select({
        web: {
          boxShadow: isDarkMode ? "0 10px 24px rgba(0, 0, 0, 0.32)" : "0 10px 24px rgba(24, 41, 68, 0.10)",
        },
        default: {
          shadowColor: "#182944",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDarkMode ? 0.4 : 0.12,
          shadowRadius: 16,
          elevation: 3,
        },
      }),
    },
    sectionHeader: {
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
    },
    sectionSubtitle: {
      fontSize: 13,
      color: theme.textMuted,
      marginTop: 3,
    },
    sectionBody: {
      gap: 8,
    },
    actionRow: {
      minHeight: 66,
      borderRadius: 14,
      backgroundColor: theme.surfaceSoft,
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    addressRow: {
      minHeight: 66,
      borderRadius: 14,
      backgroundColor: theme.surfaceSoft,
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
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
