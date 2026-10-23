# Actualización y revisión de seguridad

Fecha de revisión: 23 de octubre de 2026. Base: tag `v1.0.3` (`802da9b`).

## Criterio de actualización

Se seleccionó Expo SDK 58 estable, confirmado mediante las notas oficiales y el dist-tag `latest` de npm (`58.0.17`). Las versiones de React, React Native y módulos nativos proceden de `expo/bundledNativeModules.json`, en lugar de actualizar cada módulo nativo de forma independiente. No se activaron Expo Modules 2.0 beta, App Intents alpha ni transformadores experimentales.

El salto desde SDK 52 requiere revisión de las migraciones intermedias: nueva arquitectura, Reanimated/Worklets, notificaciones de Android y los cambios de Expo Router en SDK 56 y 58. Se adaptaron los imports de navegación a los puntos de entrada de Router. Esta migración directa no sustituye una prueba de regresión en dispositivos; Expo recomienda avanzar un SDK a la vez para aislar fallos.

## Auditoría inicial

`npm audit --json` sobre el archivo de bloqueo heredado informó 60 paquetes afectados: 4 críticos, 27 altos, 23 moderados y 6 bajos. El lock estaba desactualizado respecto a `package.json`; este resultado describe el árbol registrado en ese lock, no una reproducción exacta del binario de Google Play ni las dependencias instaladas temporalmente para ejecutar SDK 52.

Entre los avisos críticos aparecían `form-data` (generación de límites multipart), `shell-quote` (inyección de comandos), `tar` (denegación de servicio) y `@remix-run/node` (traversal en almacenamiento de sesiones). Muchos pertenecen a herramientas o funciones de servidor que esta app no utiliza. La gravedad del aviso no demuestra que exista una ruta explotable en la app móvil.

## Cambios preventivos

- Se retiraron dependencias directas sin uso: React Navigation externo y WebView. Se conserva la apertura de plataformas mediante el navegador del sistema.
- Los accesos Sierra, Costa y Semipresencial usan HTTPS. Las peticiones HEAD devolvieron 200 y terminaron en HTTPS: Sierra/Semipresencial en `colegioargentina.net/aulavirtual/login/index.php` y Costa en `colegioargentina.com/costa/login/index.php`.
- `ExternalLink` rechaza HTTP, esquemas ejecutables, rutas locales y credenciales incrustadas. En web añade `noopener noreferrer`. Esta validación solo cubre la URL inicial; las redirecciones y el contenido del sitio son responsabilidad de su servidor y del navegador.
- El permiso de notificaciones se consulta en compilaciones nativas, se vuelve a consultar al regresar a la app y se crea el canal de Android antes de solicitarlo. Revocar permisos abre los ajustes del sistema; no se simula una revocación cambiando solo el estado visual.
- Se incorpora un lock reproducible, scripts de comprobación y Dependabot semanal. La configuración de Dependabot tendrá efecto al publicarse en la rama que GitHub utiliza para sus actualizaciones.
- No se aplicó `npm audit fix --force` ni se desactivaron las comprobaciones de compatibilidad de Expo.

## Resultado del árbol actualizado

La auditoría final informa **4 paquetes afectados, todos de nivel alto y ninguno crítico**, por una única causa: `node-forge@1.4.0`, propagada a `@expo/code-signing-certificates`, `@expo/cli` y `expo`. Son cuatro entradas del informe, no cuatro fallos independientes. El aviso [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv) describe una validación incorrecta de firmas RSA PKCS#1 v1.5 y declara que no hay versión corregida; npm confirma `1.4.0` como última versión publicada.

El paquete se utiliza desde las herramientas Node de Expo y certificados. No se encontraron referencias a `node-forge` ni a `code-signing-certificates` en los bundles exportados. Esta búsqueda no equivale a una prueba formal de ausencia. No se instaló una versión no publicada ni se modificó criptografía de terceros. `npm run audit:security` continúa fallando con código distinto de cero para mantener visible este pendiente; la sugerencia automática de degradar Expo a SDK 44 se descartó por incompatibilidad.

El servidor de desarrollo se inicia en localhost por defecto para reducir su exposición. Esto no corrige la validación criptográfica de `node-forge`. No usar certificados o material de firma de procedencia desconocida; revisar el aviso cuando se publique una corrección y volver a ejecutar auditoría, pruebas y diagnóstico.

Comprobaciones completadas: TypeScript sin errores, ESLint sin errores ni advertencias, 12 pruebas aprobadas en 2 suites, `expo install --check` compatible y Expo Doctor con 20/20 comprobaciones. Se generaron bundles de producción para Android, iOS y web. La generación de bundles no produce un APK/AAB firmado ni valida el arranque del binario en un dispositivo.

Además, `npm ci --dry-run --ignore-scripts` aceptó el lock sin modificar dependencias, y `expo prebuild --platform android --no-install` generó correctamente el proyecto Android. La carpeta Android previa se conserva en `.upgrade-backup/android-before-sdk58/`. Los respaldos locales están ignorados por Git y excluidos de TypeScript, lint y Jest. La vista web actualizada respondió HTTP 200 y su HTML contiene las tarjetas de plataformas.

## Limitaciones y publicación

- ESLint 9 sigue siendo la versión admitida por los peers de `eslint-plugin-import` y `eslint-plugin-react` usados por `eslint-config-expo`. Aunque ESLint 10 es la versión actual, no se forzó su instalación sobre plugins que no declaran compatibilidad. ESLint 9 ya emite aviso de fin de soporte; queda como limitación de las herramientas de desarrollo hasta que el ecosistema de Expo admita ESLint 10.
- Europa devuelve HTTP 404 tanto en la URL anterior como en el acceso `/plataforma/europa`. Se conserva su enlace anterior para no sustituirlo por otro que también falla. Requiere una dirección válida proporcionada por la institución.
- El ajuste de notificaciones no implementa un emisor remoto ni registra tokens push en un servidor. Para probar push se necesitan credenciales y una development build; no basta Expo Go.
- La auditoría npm revisa avisos conocidos del árbol JavaScript. No certifica ausencia de vulnerabilidades ni sustituye el análisis de Gradle/CocoaPods, del servidor educativo o de un AAB firmado.
- Antes de publicar hay que comprobar arranque, navegación, regreso desde el navegador, login de las aulas, llamadas/correo, tema oscuro y permisos en un Android físico. Repetir también en iOS si se distribuirá allí.
- La versión comercial permanece como en el tag. Para el siguiente envío hay que escoger una versión y consultar el `versionCode` ya utilizado en Play Console/EAS antes de generarlo.

## Fuentes primarias

- [Expo SDK 58](https://expo.dev/changelog/sdk-58).
- [Actualización de SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/).
- [Migración Router SDK 55 a 56](https://docs.expo.dev/router/migrate/sdk-55-to-56/).
- [Migración Router SDK 57 a 58](https://docs.expo.dev/router/migrate/sdk-57-to-58/).
- [Notificaciones](https://docs.expo.dev/versions/latest/sdk/notifications/).
- [GHSA de form-data](https://github.com/advisories/GHSA-fjxv-7rqg-78g4).
- [GHSA de shell-quote](https://github.com/advisories/GHSA-w7jw-789q-3m8p).
- [GHSA de tar](https://github.com/advisories/GHSA-23hp-3jrh-7fpw).
- [GHSA de almacenamiento de sesiones](https://github.com/advisories/GHSA-9583-h5hc-x8cw).
