import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Alert, Platform } from 'react-native';
import { isSafeWebUrl } from '@/utils/webUrls';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={isSafeWebUrl(href) ? href : '/'}
      rel="noopener noreferrer"
      onPress={async (event) => {
        if (!isSafeWebUrl(href)) {
          event.preventDefault();
          Alert.alert('Enlace no disponible', 'Solo se permiten enlaces web HTTPS sin credenciales.');
          return;
        }
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          try {
            await openBrowserAsync(href);
          } catch {
            Alert.alert('No se pudo abrir el enlace', 'Comprueba tu conexión e inténtalo de nuevo.');
          }
        }
      }}
    />
  );
}
