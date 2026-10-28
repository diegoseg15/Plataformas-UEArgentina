import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { openBrowserAsync } from 'expo-web-browser';
import { isSafeWebUrl } from '@/utils/webUrls';

type PlatformLink = {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  href: string;
  disabled: boolean;
};

const platforms: PlatformLink[] = [
  { title: 'Régimen Sierra', description: 'Tu aula virtual', icon: 'book-outline', href: 'https://ueargentina.edu.ec/plataforma/sierra', disabled: false },
  { title: 'Régimen Costa', description: 'Aprende a tu ritmo', icon: 'school-outline', href: 'https://ueargentina.edu.ec/plataforma/costa', disabled: false },
  { title: 'Semi Presencial', description: 'Conectamos tu aprendizaje', icon: 'laptop-outline', href: 'https://ueargentina.edu.ec/plataforma/semipresencial', disabled: false },
  { title: 'Europa', description: 'Educación sin fronteras', icon: 'globe-outline', href: '', disabled: true },
];

const CARD_GAP = 20;
const WIDE_BREAKPOINT = 768;
const MAX_CONTENT_WIDTH = 960;
const TAB_BAR_HEIGHT = 75;
const SCROLL_BOTTOM_INSET = TAB_BAR_HEIGHT + 25;

const HomeScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const padding = width < 380 ? 16 : 24;

  const availableWidth = Math.max(0, Math.min(width - padding * 2, MAX_CONTENT_WIDTH));
  const cardWidth = isWide ? (availableWidth - CARD_GAP) / 2 : availableWidth;

  const colors = isDarkMode
    ? {
        background: '#101827',
        card: '#1B273B',
        border: '#33445C',
        text: '#F3F6FC',
        muted: '#B7C5D9',
        accent: '#A7C7FF',
        bannerFrom: '#12305F',
        bannerBorder: 'rgba(126, 176, 255, 0.32)',
        bannerGlow: 'rgba(122, 176, 255, 0.26)',
        bannerGlowSoft: 'rgba(122, 176, 255, 0.12)',
        bannerTitle: '#FFFFFF',
        bannerSubtitle: '#C6D8F2',
        bannerAccent: '#7FB4FF',
        bannerWatermark: 'rgba(168, 205, 255, 0.16)',
      }
    : {
        background: '#F5F7FB',
        card: '#FFFFFF',
        border: '#DCE5F1',
        text: '#182944',
        muted: '#52647E',
        accent: '#2456A6',
        bannerFrom: '#E7F0FF',
        bannerBorder: '#C3D7F4',
        bannerGlow: 'rgba(36, 86, 166, 0.16)',
        bannerGlowSoft: 'rgba(36, 86, 166, 0.07)',
        bannerTitle: '#12294D',
        bannerSubtitle: '#40597C',
        bannerAccent: '#2456A6',
        bannerWatermark: 'rgba(36, 86, 166, 0.12)',
      };

  const cardElevation = Platform.select({
    web: {
      boxShadow: isDarkMode ? '0 10px 24px rgba(0, 0, 0, 0.32)' : '0 10px 24px rgba(24, 41, 68, 0.10)',
    },
    default: {
      shadowColor: '#182944',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDarkMode ? 0.4 : 0.12,
      shadowRadius: 16,
      elevation: 3,
    },
  });

  const openClassroom = async (href: string) => {
    if (!isSafeWebUrl(href)) {
      Alert.alert('Enlace no disponible', 'Solo se permiten enlaces web HTTPS sin credenciales.');
      return;
    }

    if (Platform.OS === 'web') {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      await openBrowserAsync(href);
    } catch {
      Alert.alert('No se pudo abrir el enlace', 'Comprueba tu conexión e inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: padding, paddingBottom: SCROLL_BOTTOM_INSET },
      ]}
      contentInsetAdjustmentBehavior="automatic">
      <View style={[styles.content, { maxWidth: MAX_CONTENT_WIDTH }]}>
        <View
          style={[
            styles.banner,
            { backgroundColor: colors.bannerFrom, borderColor: colors.bannerBorder },
          ]}>
          <View pointerEvents="none" style={[styles.bannerGlow, { backgroundColor: colors.bannerGlow }]} />
          <View
            pointerEvents="none"
            style={[styles.bannerGlowSoft, { backgroundColor: colors.bannerGlowSoft }]}
          />
          <View style={styles.bannerCopy}>
            <View style={[styles.bannerRule, { backgroundColor: colors.bannerAccent }]} />
            <Text style={[styles.bannerTitle, { color: colors.bannerTitle }]}>¡Bienvenido!</Text>
            <Text style={[styles.bannerSubtitle, { color: colors.bannerSubtitle }]}>
              Tu futuro comienza aquí. Accede a tu aula virtual y alcanza tus metas académicas.
            </Text>
          </View>
          <Ionicons
            name="school-outline"
            size={92}
            color={colors.bannerWatermark}
            accessible={false}
            style={styles.bannerWatermark}
          />
        </View>

        <View style={[styles.grid, { gap: CARD_GAP }]}>
          {platforms.map((platform) => {
            const cardSurface = {
              width: cardWidth,
              backgroundColor: colors.card,
              borderColor: colors.border,
            };

            if (platform.disabled) {
              return (
                <View
                  key={platform.title}
                  accessible
                  accessibilityState={{ disabled: true }}
                  accessibilityLabel={`${platform.title}: No disponible por el momento`}
                  style={[styles.card, cardSurface, cardElevation, styles.cardDisabled]}>
                  <View style={styles.cardHeader}>
                    <Ionicons name={platform.icon} size={28} color={colors.muted} accessible={false} />
                    <View style={styles.lockRow}>
                      <Ionicons name="lock-closed-outline" size={16} color={colors.muted} accessible={false} />
                      <Text style={[styles.lockText, { color: colors.muted }]}>Bloqueado</Text>
                    </View>
                  </View>
                  <Text style={[styles.cardTitle, { color: colors.muted }]}>{platform.title}</Text>
                  <Text style={[styles.cardDescription, { color: colors.muted }]}>{platform.description}</Text>
                  <View style={styles.cardFooter}>
                    <Ionicons name="alert-circle-outline" size={16} color={colors.muted} accessible={false} />
                    <Text style={[styles.accessText, { color: colors.muted }]}>No disponible por el momento</Text>
                  </View>
                </View>
              );
            }

            return (
              <Pressable
                key={platform.title}
                accessibilityRole="link"
                accessibilityLabel={`${platform.title}: ${platform.description}`}
                accessibilityHint="Abre el aula virtual en un navegador externo"
                onPress={() => {
                  void openClassroom(platform.href);
                }}
                style={({ pressed }) => [
                  styles.card,
                  cardSurface,
                  cardElevation,
                  pressed && styles.cardPressed,
                ]}>
                <View style={styles.cardHeader}>
                  <Ionicons name={platform.icon} size={28} color={colors.accent} accessible={false} />
                  <Ionicons name="chevron-forward" size={18} color={colors.accent} accessible={false} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{platform.title}</Text>
                <Text style={[styles.cardDescription, { color: colors.muted }]}>{platform.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={[styles.indicator, { backgroundColor: colors.accent }]} />
                  <Text style={[styles.accessText, { color: colors.accent }]}>Ingresar al aula virtual</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingVertical: 32, alignItems: 'center' },
  content: { width: '100%', alignSelf: 'center' },
  banner: {
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: CARD_GAP,
    minHeight: 190,
    paddingVertical: 32,
    paddingHorizontal: 26,
    borderRadius: 26,
    borderWidth: 1,
  },
  bannerGlow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -140,
    right: -70,
  },
  bannerGlowSoft: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    bottom: -130,
    left: -70,
  },
  bannerCopy: { flexShrink: 1, maxWidth: 540, paddingRight: 72 },
  bannerRule: { width: 46, height: 4, borderRadius: 2, marginBottom: 16 },
  bannerTitle: { fontSize: 32, fontWeight: '800', lineHeight: 38, letterSpacing: -0.8, marginBottom: 8 },
  bannerSubtitle: { fontSize: 15, lineHeight: 23 },
  bannerWatermark: { position: 'absolute', right: 12, bottom: 0 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' },
  card: {
    minHeight: 190,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  cardPressed: { opacity: 0.9 },
  cardDisabled: { opacity: 0.7 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 28,
    marginBottom: 18,
  },
  lockRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  lockText: { fontSize: 12, fontWeight: '600' },
  cardTitle: { fontSize: 20, fontWeight: '700', lineHeight: 26, marginBottom: 4 },
  cardDescription: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 'auto' },
  indicator: { width: 8, height: 8, borderRadius: 4 },
  accessText: { fontSize: 13, fontWeight: '600', flexShrink: 1 },
});

export default HomeScreen;
