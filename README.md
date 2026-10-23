# Plataformas UEArgentina

Aplicación de la Unidad Educativa a Distancia República de Argentina. Reúne accesos a Sierra, Costa, Semipresencial y Europa, los contactos institucionales y los ajustes de permisos. Las plataformas se abren con el navegador del sistema; la autenticación y el contenido educativo pertenecen a esos sitios.

La actualización parte del tag `v1.0.3` y conserva sus pantallas. Utiliza Expo SDK 58, React Native y TypeScript. No incorpora un backend de mensajería, calendario o envío de notificaciones.

## Desarrollo

Utiliza Node.js 24 LTS (`.nvmrc`) y npm. Instala las versiones del archivo de bloqueo:

```sh
npm ci
npm start
```

Para web: `npm run web`. Para generar e iniciar una compilación de desarrollo: `npm run android` o `npm run ios` (iOS requiere macOS y Xcode). Configura previamente Android Studio/JDK o Xcode.

Después de cambiar de SDK, genera una nueva compilación de desarrollo. Un cliente nativo compilado con otro SDK no es compatible. Consulta las [notas de SDK 58](https://expo.dev/changelog/sdk-58) para conocer la disponibilidad de Expo Go.

## Validación

```sh
npm run typecheck
npm run lint
npm test
npm run doctor
npm run audit:security
npx expo export --platform all
```

No uses `npm audit fix --force`: puede instalar versiones nativas incompatibles con Expo. Para actualizar, revisa el [procedimiento oficial](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/), alinea las dependencias con `npx expo install --fix` y repite las comprobaciones.

## Notificaciones

El ajuste consulta y solicita el permiso del dispositivo en compilaciones nativas. En Android crea el canal antes de solicitarlo. Para revocar el permiso abre los ajustes del sistema y vuelve a consultar su estado al regresar. En web y Expo Go el interruptor está deshabilitado. Esto no configura un servicio de notificaciones remotas: requiere credenciales FCM/APNs y un emisor.

## Publicación

El identificador Android se mantiene en `com.ueargentina.plataformas`. `eas.json` contiene perfiles development, preview (APK) y production. Antes de publicar, acuerda el número de versión comercial y comprueba el `versionCode` remoto de EAS/Play Console; el tag original declara `1.0.0` aunque se llama `v1.0.3`.

Consulta [la revisión de seguridad](docs/SECURITY-REVIEW.md) para conocer las comprobaciones y sus límites.
