# Plataformas UEArgentina

Aplicación de la Unidad Educativa a Distancia República de Argentina. Reúne accesos a Sierra, Costa, Semipresencial y Europa, los contactos institucionales y los ajustes de permisos. Las plataformas se abren con el navegador del sistema; la autenticación y el contenido educativo pertenecen a esos sitios.

La actualización parte del tag `v1.0.3` y conserva sus pantallas. Utiliza Expo SDK 58, React Native y TypeScript. No incorpora un backend de mensajería, calendario o envío de notificaciones.

Versión actual: `1.2.0` (Android `versionCode` 6, `versionName` 1.2.0).

## Qué es y qué no es la app

**Sí es:**

- Un lanzador (launcher) con tres pestañas: accesos a las plataformas educativas (Régimen Sierra, Régimen Costa, Semi Presencial y Europa), contactos institucionales (sitio web, redes sociales, teléfono y correo) y ajustes.
- Una app cliente 100% frontend: sin backend propio, sin base de datos y sin servicios de terceros propios.
- Una app que abre las plataformas en el navegador del sistema mediante enlaces HTTPS validados.
- Una app con tema claro/oscuro, haptics en las pestañas e iconos nativos (iOS/Android).

**No es:**

- No es la plataforma educativa: no aloja cursos, aulas, calificaciones ni contenido académico; sólo enlaza a ellas.
- No gestiona usuarios ni credenciales: el login ocurre en el sitio de destino.
- No envía notificaciones remotas (push): el ajuste sólo consulta y solicita el permiso del dispositivo. Ver la sección [Notificaciones](#notificaciones).
- No incluye backend, mensajería, calendario, sincronización de datos ni analítica.

## Stack tecnológico

Versiones instaladas (verificadas en `node_modules`, expo SDK 58):

| Componente | Versión |
| --- | --- |
| Expo | 58.0.19 |
| React Native | 0.88.0 |
| React | 19.3.0 |
| TypeScript | 6.0.3 |
| ESLint | 9.39.5 (`eslint-config-expo`) |
| Expo Router | ~58.0.27 (rutas con `typedRoutes`) |
| Jest | ^30.5.2 (`jest-expo`) |

Otras dependencias destacadas: `expo-notifications`, `expo-web-browser`, `expo-haptics`, `react-native-reanimated`, `react-native-gesture-handler`, `@expo/vector-icons` y `react-native-web`.

## Desarrollo

Utiliza Node.js 24 LTS (`.nvmrc`) y npm. Instala las versiones del archivo de bloqueo:

```sh
npm ci
npm start
```

Para web: `npm run web`. Para generar e iniciar una compilación de desarrollo: `npm run android` o `npm run ios` (iOS requiere macOS y Xcode). Configura previamente Android Studio/JDK o Xcode.

Después de cambiar de SDK, genera una nueva compilación de desarrollo. Un cliente nativo compilado con otro SDK no es compatible. Consulta las [notas de SDK 58](https://expo.dev/changelog/sdk-58) para conocer la disponibilidad de Expo Go.

### Scripts de `package.json`

| Comando | Qué hace |
| --- | --- |
| `npm start` | Inicia el servidor de Expo en localhost (`expo start --localhost`) |
| `npm run web` | Inicia la app en el navegador (`expo start --web --localhost`) |
| `npm run android` | Compila e instala una build de desarrollo en Android (`expo run:android`) |
| `npm run ios` | Compila e instala una build de desarrollo en iOS (`expo run:ios`) |
| `npm test` | Ejecuta Jest en serie (`jest --runInBand`) |
| `npm run test:watch` | Jest en modo observador (`jest --watchAll`) |
| `npm run typecheck` | Comprobación de tipos (`tsc --noEmit`) |
| `npm run lint` | Lint con ESLint 9 (`eslint .`) |
| `npm run doctor` | Diagnóstico de Expo (`expo-doctor`) |
| `npm run audit:security` | Auditoría de dependencias (`npm audit --audit-level=high`) |
| `npm run reset-project` | Restablece el proyecto a un estado vacío (script heredado de la plantilla) |

## Estructura del proyecto

```
.
├── app/                    # Pantallas (Expo Router)
│   ├── _layout.tsx         #   Raíz de la navegación
│   ├── +not-found.tsx      #   Ruta 404
│   └── (tabs)/
│       ├── _layout.tsx     #   Layout de las 3 pestañas
│       ├── index.tsx       #   Inicio: tarjetas de plataformas (Sierra, Costa, Semipresencial, Europa)
│       ├── contacts.tsx    #   Contactos institucionales (web, redes, teléfono, correo)
│       └── settings.tsx    #   Ajustes: permiso de notificaciones y versión
├── components/             # Componentes reutilizables
│   ├── ExternalLink.tsx    #   Apertura de enlaces externos con validación
│   ├── HapticTab.tsx       #   Retroalimentación háptica en pestañas
│   ├── ThemedText.tsx / ThemedView.tsx
│   ├── ParallaxScrollView.tsx
│   ├── ui/                 #   IconSymbol y TabBarBackground (variantes iOS)
│   └── __tests__/          #   Prueba de ThemedText (+ snapshot)
├── hooks/                  # useColorScheme, useThemeColor (web y nativo)
├── constants/Colors.ts     # Paleta de colores por esquema
├── utils/
│   ├── webUrls.ts          # isSafeWebUrl(): sólo HTTPS
│   └── __tests__/webUrls.test.ts
├── scripts/reset-project.js
├── docs/SECURITY-REVIEW.md # Revisión de seguridad y de la migración
├── assets/                 # fonts/ (SpaceMono) e images/ (iconos, splash, capturas)
├── android/                # Proyecto nativo generado (prebuild)
├── .github/dependabot.yml  # Actualizaciones semanales de npm
├── app.json / eas.json     # Configuración de Expo y perfiles EAS
├── eslint.config.js / tsconfig.json
└── .upgrade-backup/        # Respaldos locales ignorados por Git
```

`android/` (e `ios/` si se genera), `dist/`, `.upgrade-backup/` y `node_modules/` están excluidos de TypeScript y ESLint; `dist/` y `.upgrade-backup/` también de Jest (`modulePathIgnorePatterns`).

## Validación

```sh
npm run typecheck
npm run lint
npm test
npm run doctor
npm run audit:security
npx expo export --platform all
```

Los tests son 12 pruebas en 2 suites: `utils/__tests__/webUrls.test.ts` (11 casos de `isSafeWebUrl`, que sólo permite HTTPS con host no vacío y sin credenciales incrustadas) y `components/__tests__/ThemedText-test.tsx`.

No uses `npm audit fix --force`: puede instalar versiones nativas incompatibles con Expo. Para actualizar, revisa el [procedimiento oficial](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/), alinea las dependencias con `npx expo install --fix` y repite las comprobaciones.

## Notificaciones

El ajuste consulta y solicita el permiso del dispositivo en compilaciones nativas. En Android crea el canal antes de solicitarlo. Para revocar el permiso abre los ajustes del sistema y vuelve a consultar su estado al regresar. En web y Expo Go el interruptor está deshabilitado. Esto no configura un servicio de notificaciones remotas: requiere credenciales FCM/APNs y un emisor.

## Seguridad

Resumen de [docs/SECURITY-REVIEW.md](docs/SECURITY-REVIEW.md) (revisión del 23 de octubre de 2026, base tag `v1.0.3`):

- **Validación de enlaces**: `isSafeWebUrl` (usado por `ExternalLink`) rechaza HTTP, `javascript:`, `data:`, `file:`, rutas locales y credenciales incrustadas; en web añade `noopener noreferrer`. La validación sólo cubre la URL inicial: las redirecciones y el contenido son responsabilidad del sitio y del navegador.
- **Dependencias**: se retiraron dependencias sin uso (React Navigation externo y WebView), se añadió un lock reproducible, scripts de comprobación y Dependabot semanal. La auditoría final quedó en 4 avisos de nivel alto, todos de la misma causa (`node-forge@1.4.0`, sin versión corregida); por eso `npm run audit:security` sigue fallando con código distinto de cero. No se aplicó `npm audit fix --force`.
- **Permisos**: el permiso de notificaciones se consulta al montar y al regresar a la app, y el canal de Android se crea antes de solicitarlo; no se simula una revocación cambiando sólo el estado visual.
- **Servidor de desarrollo**: arranca en localhost por defecto para reducir su exposición.
- **Limitaciones**: ESLint 9 se mantiene porque `eslint-config-expo` no declara compatibilidad con ESLint 10; el acceso a Europa devuelve HTTP 404 y requiere una dirección válida de la institución; la auditoría npm no sustituye el análisis de Gradle/CocoaPods ni una prueba en dispositivo; push requiere credenciales y development build.
- **Antes de publicar**: probar arranque, navegación, regreso desde el navegador, login de las aulas, llamadas/correo, tema oscuro y permisos en un Android físico (y en iOS si se distribuye allí).

## Publicación

El identificador Android se mantiene en `com.ueargentina.plataformas`. `eas.json` contiene perfiles development, preview (APK) y production. Antes de publicar, acuerda el número de versión comercial y comprueba el `versionCode` remoto de EAS/Play Console; el tag original declara `1.0.0` aunque se llama `v1.0.3`.

Consulta [la revisión de seguridad](docs/SECURITY-REVIEW.md) para conocer las comprobaciones y sus límites.
