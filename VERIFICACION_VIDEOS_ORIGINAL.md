# Verificación realizada del complemento

- **9/9** MP4 derivados de los archivos proporcionados sin eliminar fragmentos por decisión editorial; duración conservada (variación máxima <1,5 s de re-encodificación). H.264 + AAC, moov atoms adelantados para inicio progresivo.
- **9/9** miniaturas JPG: fotogramas reales extraídos de cada video, no generados por IA.
- **9/9** correspondencias exactas de ID de misión según la estructura `RELICS10.getState()`.
- Pruebas de navegador automatizado en **390 px (móvil)** y **1366 px (escritorio)**: aparecen reproductores en configuración y simulación, muestra atribución, navegación a Inicio detiene fuente.
- Prueba de integración no destructiva sobre ZIP de prueba estructurado como workspace RELICS 10: originales inalterados, nueva carpeta y backups, `index.html` raíz + `web/index.html` extendidos y nueve archivos MP4 preservados.
- **No verificado:** proyecto real de RELICS 10 en esta sesión (el ZIP anterior no está disponible aquí), publicación HTTP/HTTPS, compatibilidad real en Android WebView, derechos/licencias de videos de terceros, reproducción de todos los videos en teléfono físico.

**IMPORTANTE:** Las pruebas de HTML usaron una plantilla que reproduce los IDs reales descritos anteriormente; para verificar la integración sobre tus archivos exactos hace falta ejecutar el instalador en el ZIP anterior o subir ese ZIP al chat.

Datos técnicos de las codificaciones en `validacion_videos.json`.
