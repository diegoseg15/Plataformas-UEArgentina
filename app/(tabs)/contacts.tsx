import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppTheme } from "@/constants/AppTheme";
import { InternalWebLink } from "@/components/InternalWebLink";

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
  const theme = AppTheme.colors[isDarkMode ? "dark" : "light"];
  const styles = createStyles(theme, isDarkMode);

  const openUrl = async (url: string) => {
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
      onPress: () => openUrl("tel:+59332825180"),
    },
    {
      label: "Latacunga",
      value: "+593 99 569 0287",
      icon: "call-outline",
      onPress: () => openUrl("tel:+593995690287"),
    },
    {
      label: "La Maná",
      value: "+593 3 256 8928",
      icon: "call-outline",
      onPress: () => openUrl("tel:+59332568928"),
    },
    {
      label: "La Maná",
      value: "+593 99 460 1717",
      icon: "call-outline",
      onPress: () => openUrl("tel:+593994601717"),
    },
  ];

  const socialActions: ContactAction[] = [
    {
      label: "Facebook",
      value: "ue.argentina",
      icon: "logo-facebook",
      onPress: () => openUrl("https://www.facebook.com/ue.argentina"),
    },
    {
      label: "TikTok",
      value: "@ued_republicadeargentina",
      icon: "logo-tiktok",
      onPress: () => openUrl("https://tiktok.com/@ued_republicadeargentina"),
    },
    {
      label: "Instagram",
      value: "@ueargentina",
      icon: "logo-instagram",
      onPress: () => openUrl("https://www.instagram.com/ueargentina"),
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
    openUrl(`https://www.google.com/maps/search/?api=1&query=${encodedQuery}`);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="call" size={32} color="#FFFFFF" />
        </View>

        <Text style={styles.heroTitle}>Contacto institucional</Text>

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
        <InternalWebLink href="https://ueargentina.edu.ec/" title="Página Web">
          <View style={styles.actionRow}>
            <View style={styles.actionIcon}>
              <Ionicons name="globe-outline" size={22} color={theme.primary} />
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Sitio oficial</Text>
              <Text style={styles.actionValue}>www.ueargentina.edu.ec</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.textMuted}
            />
          </View>
        </InternalWebLink>
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
          onPress={() => openUrl("mailto:administracion@ueargentina.edu.ec")}
          style={styles.actionRow}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="mail-outline" size={22} color={theme.primary} />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Administración</Text>
            <Text style={styles.actionValue}>
              administracion@ueargentina.edu.ec
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
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
            onPress={() => openMap(item.query)}
            style={styles.addressRow}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="location-outline"
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
        <Text style={styles.sectionTitle}>{title}</Text>
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
  theme: typeof AppTheme.colors.light;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={item.onPress}
      style={styles.actionRow}
    >
      <View style={styles.actionIcon}>
        <Ionicons name={item.icon} size={22} color={theme.primary} />
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{item.label}</Text>
        <Text style={styles.actionValue}>{item.value}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
    </TouchableOpacity>
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
    actionRow: {
      minHeight: 66,
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
    addressRow: {
      minHeight: 66,
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
