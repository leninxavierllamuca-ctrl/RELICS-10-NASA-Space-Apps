# RELICS 10 — Complemento de 9 videos sin eliminar nada

El ZIP con videos es **un complemento del proyecto RELICS 10, no un reemplazo de la aplicación**. No se disponía de los archivos completos originales del proyecto en esta sesión, por lo que el instalador aplica los cambios directamente sobre una COPIA de tu proyecto anterior. Todos los simuladores, puntuaciones, preguntas, menú y botones continúan intactos.

## Instalación en Windows

1. Descarga el complemento completo `RELICS_10_COMPLEMENTO_9_VIDEOS_MOVIL.zip` y extrae su carpeta.
2. Descarga la versión que ya tenías: `RELICS_10_0_WORKSPACE_COMPLETO.zip` desde el mensaje anterior. **Coloca ambos en la misma carpeta** (por ejemplo, Descargas). Si ya la extrajiste, deja la carpeta `RELICS_10_0_WORKSPACE_COMPETENCIA` junto al complemento.
3. Abre la carpeta `RELICS10_VIDEO_ADDON` y ejecuta **`INTEGRAR_VIDEOS_WINDOWS.bat`**. Requiere Python 3.10+.
4. Se genera la carpeta NUEVA `RELICS_10_0_CON_VIDEOS`. El proyecto original no se edita ni se borra.
5. Abre `RELICS_10_0_CON_VIDEOS/index.html` con Chrome, Edge o un navegador Android compatible. Los videos están en `web/videos/` o `videos/`, según cómo estaba organizado el original.

También puedes pasar la ruta del ZIP original: `python INTEGRAR_VIDEOS.py "C:\\Users\\tuusuario\\Downloads\\RELICS_10_0_WORKSPACE_COMPLETO.zip"`.

Si únicamente tienes el archivo HTML de RELICS 10, colócalo junto al complemento con el nombre `RELICS_10_0_CELULAR_INDEX.html` y ejecuta el mismo instalador: mantendrá ese HTML y añadirá una carpeta videos y sus reproductores.

## Qué se añade (solo videos)

- 9 archivos MP4 H.264/AAC móviles, **sin cortes**, reprocesados para menor peso, con imágenes de portada capturadas del video original (no generadas por IA).
- Un reproductor **dentro de la pantalla de configuración de cada módulo** y otro **debajo del simulador**, con controles nativos, pantalla completa, audio, pausa y reproducción a demanda. No se reproducen automáticamente ni se descarga todo el video hasta pulsar reproducir.
- Créditos y aviso de derechos de autor en los nueve reproductores.
- Al salir o volver al inicio, se pausa el video y se libera su recurso para evitar que siga sonando.
- No se modifican el motor de simulación, los cuestionarios, la puntuación, el ranking, el contenido científico ni la navegación ya existente.

**Tamaño:** los archivos originales subidos suman casi 650 MB. El complemento trae copias comprimidas compatibles con celular para facilitar descarga. Los originales que compartiste NO se borran ni se modifican. La carpeta final Android Studio incorporará videos optimizados y podrá crear una APK grande; esta entrega no incluye una APK compilada.

## Copyright y competición

**Importante: esta no es una licencia de redistribución.** Los nueve archivos tienen titulares de derechos todavía sin verificar. Aun cuando se hayan compartido para un trabajo de aula, pueden estar protegidos por derechos de autor. **No subas los MP4 al repositorio público, a GitHub Pages ni a la entrega de NASA Space Apps sin autorización escrita/licencia válida**. Para la entrega pública, sustituye por materiales NASA propios conforme a sus guías o enlaces incrustados que permitan su uso. La atribución, el uso educativo o la ausencia de fines comerciales NO garantizan permiso.

Reglas NASA Space Apps 2026: https://www.spaceappschallenge.org/legal/

Normas de medios NASA (no necesariamente aplican a producciones de terceros): https://www.nasa.gov/nasa-brand-center/images-and-media/

Consulta `CREDITOS_Y_PERMISOS_VIDEOS.md` para la lista de los nueve títulos y los derechos pendientes.
