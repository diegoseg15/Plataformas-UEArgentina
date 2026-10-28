import { useEffect, useState } from 'react';
import {
  AppState,
  Platform,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useColorScheme } from '@/hooks/useColorScheme';

type AppearancePreference = 'system' | 'light' | 'dark';
type FontSizePreference = 'Pequeño' | 'Normal' | 'Grande' | 'Muy Grande';

export default function Settings() {
  const systemScheme = useColorScheme();
  const [appearance, setAppearance] = useState<AppearancePreference>('system');
  const [fontSizePreference, setFontSizePreference] = useState<FontSizePreference>('Normal');
  const [language, setLanguage] = useState('Español');
  const [openInApp, setOpenInApp] = useState(true); // Preferencia de apertura de moodle
  const [isEnabled, setIsEnabled] = useState(false); // Estado para el Switch de notificaciones

  const colorScheme = appearance === 'system' ? (systemScheme ?? 'light') : appearance;
  const isDarkMode = colorScheme === 'dark';

  const notificationsAvailable = Platform.OS !== 'web' &&
    Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  const colors = isDarkMode
    ? {
        background: '#101827',
        card: '#1B273B',
        divider: '#33445C',
        text: '#F3F6FC',
        muted: '#B7C5D9',
        accent: '#A7C7FF',
      }
    : {
        background: '#F5F7FB',
        card: '#FFFFFF',
        divider: '#E7EDF6',
        text: '#182944',
        muted: '#52647E',
        accent: '#2456A6',
      };

  const cardElevation = Platform.select({
    web: {
      boxShadow: isDarkMode
        ? '0 6px 18px rgba(0, 0, 0, 0.32)'
        : '0 6px 18px rgba(24, 41, 68, 0.08)',
    },
    default: {
      shadowColor: '#182944',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDarkMode ? 0.35 : 0.1,
      shadowRadius: 12,
      elevation: 3,
    },
  });

  const appearanceLabel =
    appearance === 'system' ? 'Sistema' : appearance === 'light' ? 'Claro' : 'Oscuro';

  useEffect(() => {
    // Función para verificar el estado de los permisos
    const checkNotificationPermissions = async () => {
      if (!notificationsAvailable) return;
      try {
        const Notifications = await import('expo-notifications');
        const { granted } = await Notifications.getPermissionsAsync();
        setIsEnabled(granted);
      } catch {
        setIsEnabled(false);
      }
    };

    checkNotificationPermissions(); // Verificar permisos al montar el componente
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void checkNotificationPermissions();
    });
    return () => subscription.remove();
  }, [notificationsAvailable]);

  // Función para solicitar permisos de notificación
  const requestNotificationPermission = async () => {
    try {
      const Notifications = await import('expo-notifications');
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'General',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
      const { granted, canAskAgain } = await Notifications.requestPermissionsAsync();
      setIsEnabled(granted);
      if (!granted) {
        Alert.alert('Permiso no concedido', canAskAgain
          ? 'No se han otorgado los permisos de notificación.'
          : 'Puedes cambiar los permisos desde los ajustes del dispositivo.');
      }
    } catch {
      Alert.alert('Notificaciones no disponibles', 'No se pudo consultar el permiso. Inténtalo de nuevo.');
    }
  };

  // Función para cambiar el valor del switch
  const toggleSwitch = async (value: boolean) => {
    if (!notificationsAvailable) return;
    if (value) {
      // Si el switch se activa, solicitamos permisos
      await requestNotificationPermission();
    } else {
      try {
        await Linking.openSettings();
      } catch {
        Alert.alert('Permisos', 'Cambia el permiso de notificaciones en los ajustes del dispositivo.');
      }
    }
  };

  const openFontSizePicker = () => {
    Alert.alert('Tamaño de la fuente', 'Selecciona el tamaño de la fuente', [
      { text: 'Pequeño', onPress: () => setFontSizePreference('Pequeño') },
      { text: 'Normal', onPress: () => setFontSizePreference('Normal') },
      { text: 'Grande', onPress: () => setFontSizePreference('Grande') },
      { text: 'Muy Grande', onPress: () => setFontSizePreference('Muy Grande') },
    ]);
  };

  const openSiteSettings = () => {
    Alert.alert('Configuraciones del sitio', 'Puedes configurar tu cuenta de moodle desde el menú de usuario, en Preferencias.');
  };

  const confirmClearBrowserData = () => {
    Alert.alert('Datos del navegador', '¿Deseas limpiar la caché y los datos del navegador integrado?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpiar',
        style: 'destructive',
        onPress: () => Alert.alert('Datos del navegador', 'La limpieza de datos todavía no está disponible.'),
      },
    ]);
  };

  // Función para cambiar la apariencia (tema)
  const openAppearancePicker = () => {
    Alert.alert('Apariencia', 'Elige el tema de la app', [
      { text: 'Sistema', onPress: () => setAppearance('system') },
      { text: 'Claro', onPress: () => setAppearance('light') },
      { text: 'Oscuro', onPress: () => setAppearance('dark') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  // Función para cambiar el idioma (estático por ahora)
  const openLanguagePicker = () => {
    Alert.alert('Idioma', 'Selecciona el idioma de la app', [
      { text: 'Español', onPress: () => setLanguage('Español') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  // Función para mostrar Ayuda
  const handleHelp = () => {
    Alert.alert(
      'Ayuda',
      'Bienvenido a la app de la Unidad Educativa A Distancia República de Argentina.\n\n' +
        'Aquí te damos algunos consejos para aprovechar al máximo la app:\n' +
        '1. En la pestaña "Inicio", accede fácilmente a las plataformas educativas del colegio.\n' +
        '2. Usa la sección "Contactos" para comunicarte con el equipo administrativo y docente.\n' +
        '3. Personaliza tu experiencia en "Configuración" activando o desactivando notificaciones y ajustando el tema de la app.\n\n' +
        'Si necesitas más ayuda, contáctanos escribiendo a administracion@ueargentina.edu.ec.'
    );
  };

  // Función para mostrar Acerca de
  const handleAbout = () => {
    Alert.alert(
      'Acerca de',
      'Unidad Educativa A Distancia República de Argentina\n\n' +
        'Descripción: Una aplicación diseñada para facilitar el acceso a las plataformas de estudio de nuestro colegio.\n\n' +
        'Características principales:\n' +
        '- Navegación intuitiva hacia plataformas educativas.\n' +
        '- Configuración personalizada para estudiantes.\n\n' +
        'Desarrollador: Diego Segovia (diegoseg_15 / diegoseg15)\n' +
        `Versión: ${appVersion}\n` +
        'Fecha de lanzamiento: Noviembre 2024\n\n' +
        'Derechos reservados © UEArgentina.'
    );
  };

  // Función para abrir la página de legalidad
  const handleLegal = () => {
    Linking.openURL('https://ueargentina.edu.ec/legalidad/');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 0,
    },
    scrollContent: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 960,
      alignSelf: 'center',
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 32,
    },
    section: {
      borderRadius: 16,
      paddingVertical: 8,
      marginVertical: 8,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      marginLeft: 16,
      marginTop: 12,
      marginBottom: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap: 12,
    },
    rowDivider: {
      borderTopWidth: 1,
    },
    rowText: {
      flex: 1,
      fontSize: 16,
    },
    rowValue: {
      fontSize: 16,
    },
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}>
      {/* Sección General */}
      <View style={[styles.section, { backgroundColor: colors.card }, cardElevation]}>
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>General</Text>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Notificaciones</Text>
          <Switch
            accessibilityLabel="Notificaciones"
            accessibilityRole="switch"
            disabled={!notificationsAvailable}
            trackColor={{ false: '#767577', true: colors.accent }}
            thumbColor="#f4f3f4"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity
          style={[styles.row, styles.rowDivider, { borderTopColor: colors.divider }]}
          onPress={openLanguagePicker}>
          <Ionicons name="language-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Idioma</Text>
          <Text style={[styles.rowValue, { color: colors.muted }]}>{language}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
      </View>

      {/* Sección Accesibilidad */}
      <View style={[styles.section, { backgroundColor: colors.card }, cardElevation]}>
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>Accesibilidad</Text>
        <TouchableOpacity style={styles.row} onPress={openFontSizePicker}>
          <Ionicons name="text-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Tamaño de la fuente</Text>
          <Text style={[styles.rowValue, { color: colors.muted }]}>{fontSizePreference}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, styles.rowDivider, { borderTopColor: colors.divider }]}
          onPress={openAppearancePicker}>
          <Ionicons name="contrast-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Modo oscuro/claro/sistema</Text>
          <Text style={[styles.rowValue, { color: colors.muted }]}>{appearanceLabel}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
      </View>

      {/* Sección Plataformas */}
      <View style={[styles.section, { backgroundColor: colors.card }, cardElevation]}>
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>Plataformas</Text>
        <View style={styles.row}>
          <Ionicons name="open-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Abrir moodle en la app</Text>
          <Switch
            accessibilityLabel="Abrir Moodle en la app"
            accessibilityRole="switch"
            trackColor={{ false: '#767577', true: colors.accent }}
            thumbColor="#f4f3f4"
            onValueChange={setOpenInApp}
            value={openInApp}
          />
        </View>
        <TouchableOpacity
          style={[styles.row, styles.rowDivider, { borderTopColor: colors.divider }]}
          onPress={openSiteSettings}>
          <Ionicons name="settings-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Configuraciones del sitio</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, styles.rowDivider, { borderTopColor: colors.divider }]}
          onPress={confirmClearBrowserData}>
          <Ionicons name="trash-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Datos del navegador</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
      </View>

      {/* Sección Legalidad */}
      <View style={[styles.section, { backgroundColor: colors.card }, cardElevation]}>
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>Legalidad</Text>
        <TouchableOpacity style={styles.row} onPress={handleLegal}>
          <Ionicons name="document-text-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>Ver Legalidad</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
      </View>

      {/* Sección Ayuda */}
      <View style={[styles.section, { backgroundColor: colors.card }, cardElevation]}>
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>Ayuda</Text>
        <TouchableOpacity style={styles.row} onPress={handleHelp}>
          <Ionicons name="help-circle-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>¿Necesitas ayuda?</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
      </View>

      {/* Sección Acerca de */}
      <View style={[styles.section, { backgroundColor: colors.card }, cardElevation]}>
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>Acerca de</Text>
        <TouchableOpacity style={styles.row} onPress={handleAbout}>
          <Ionicons name="information-circle-outline" size={22} color={colors.accent} accessible={false} />
          <Text style={[styles.rowText, { color: colors.text }]}>V{appVersion}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} accessible={false} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
