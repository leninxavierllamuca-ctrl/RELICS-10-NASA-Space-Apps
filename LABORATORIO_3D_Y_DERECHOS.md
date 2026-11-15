# RELICS 10 · Laboratorio 3D, procedencia y derechos

## Qué se incorporó

Se agregó **una sección independiente**, disponible desde **🧩 LAB 3D** en el menú y desde una tarjeta en la portada. No sustituye, reescribe ni quita los nueve módulos, su banco de preguntas, sus minijuegos, sus simuladores, los nueve MP4 de cada módulo, el servidor de puntajes ni el proyecto Android.

El visor 3D se ejecuta **en una ventana superpuesta dentro de RELICS** y tiene:

- Rotación con mouse o dedo, desplazamiento de cámara y zoom.
- **Separación animable del ensamblaje** por deslizador 0–100 %.
- Árbol de piezas con visibilidad individual, botón **Solo** y **Mostrar todas**.
- Reunir piezas, centrar, giro automático y modo alambre.
- Explicaciones científicas al seleccionar piezas y pregunta interactiva con puntos locales del laboratorio.
- Botón permanente **⌂ VOLVER A RELICS** y cierre con Escape.
- Función de **cargar archivos locales** `.glb`, `.obj` y `.stl`, sin subirlos a servidores.
- Cuatro pestañas: **SONDA**, **APOLO**, **ROVER** y **LUNAR** (módulo Eagle de Apolo 11).

## Procedencia geométrica

| Pestaña | Tipo | Procedencia y alcance |
| --- | --- | --- |
| SONDA | Reconstrucción educativa RELICS | Modelado geométrico procedimental con Three.js; **no** es el CAD de GrabCAD ni un vehículo NASA exacto. |
| APOLO | Reconstrucción educativa RELICS | Cohete multietapa y torre esquemáticos; no se deben presentar como reproducción exacta de Saturn V o Apollo 11. |
| ROVER | Reconstrucción educativa RELICS | Rover conceptual de seis ruedas con brazo y panel solar, inspirado en funciones de ingeniería; no es un rover NASA histórico específico. |
| LUNAR | Reconstrucción educativa RELICS | Módulo lunar Eagle de **Apolo 11**, con etapas de descenso y ascenso, patas de alunizaje, escotilla, ventanas y escalera. Modelado local interactivo y no plano NASA exacto. |

La geometría educativa fue diseñada para RELICS, con asistencia de IA; las imágenes de capturas de modelos de referencia fueron proporcionadas por el equipo y **no se generaron con IA**. La ausencia de los ensamblajes CAD originales del rover, del Apolo y de la sonda impide afirmar que sus reconstrucciones se correspondan con las geometrías de GrabCAD. Se incluyen el STEP del satélite y el GLB convertido **solo como archivos históricos del proyecto y recurso de importación opcional**, manteniendo los elementos anteriores sin eliminarlos. El satélite **ya no figura como una de las cuatro pestañas**.

**Precisión histórica importante:** Apolo 1 fue una misión tripulada que sufrió un accidente durante una prueba en tierra en 1967; **no llevó un módulo lunar a la Luna**. El módulo lunar que alunizó el 20 de julio de 1969 fue **Eagle, de Apolo 11**. Su etapa de descenso quedó en la superficie y su etapa de ascenso se separó para regresar a la órbita. Referencias: [NASA, Apollo 11 Mission Overview](https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/) y [NASA, Apollo Lunar Surface Journal](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html).

### Referencias GrabCAD suministradas

1. [Mars Rover Robot with Robotic Arm](https://grabcad.com/library/mars-rover-robot-with-robotic-arm-1)
2. [Apollo11, referencia 1](https://grabcad.com/library/apollo11-1)
3. [Apollo11, referencia 2](https://grabcad.com/library/apollo11-2)
4. [Sonda de exploración espacial NASA](https://grabcad.com/library/sonda-de-exploracion-espacial-nasa-1)
5. [Satellite Assembly](https://grabcad.com/library/satellite-assembly-1)

**Reconocimiento:** los autores de cada modelo son los titulares indicados en sus fichas individuales de GrabCAD; RELICS no se atribuye su autoría. Verificar los nombres y las condiciones específicas en cada ficha antes de distribuir el proyecto públicamente.

GrabCAD impide cargar sus fichas como páginas completas dentro de un `iframe` de terceros (`X-Frame-Options: SAMEORIGIN`). Por eso la sección integrada contiene un visor 3D **propio**, no una incrustación forzada del sitio. Los botones de referencia externos se incluyen únicamente para acreditar procedencia; el laboratorio no depende de ellos para funcionar.

### Obligaciones para la publicación

Los enlaces y créditos **no sustituyen una licencia**. Antes de lanzar RELICS en público, revisar las condiciones actuales y permisos de los autores de modelos, fotografías y los nueve videos. El contenido de terceros (por ejemplo, Discovery o Astrum) **no se convierte en uso libre simplemente por señalar sus créditos**. Si no hay autorización, reemplazar el MP4 específico por una versión de uso permitido o un video oficial incrustado conforme a sus condiciones. Ver `CREDITOS_Y_PERMISOS_VIDEOS.md` para el desglose de los nueve videos.

- [Condiciones de uso y difusión de modelos en GrabCAD](https://help.grabcad.com/article/246-how-can-models-be-used-and-shared)
- [NASA Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)
- [NASA Space Science / recursos educativos](https://science.nasa.gov/)

**Aviso:** proyecto didáctico independiente. NASA no patrocina ni avala RELICS ni GrabCAD; las reconstrucciones didácticas son aproximaciones y deben distinguirse de datos históricos de misión.

## Estructura del archivo final

- `index.html`: entrada de RELICS con el complemento 3D y de videos.
- `web/index.html`: variante web equivalente; `web/videos/` almacena **los nueve MP4**.
- `web/assets/relics10-lab3d.js`: motor Three.js ya compilado, **sin requerir CDN ni instalación de librerías**.
- `web/assets/relics10-lab3d.css`: interfaz del laboratorio.
- `web/assets/capturas3d/`: imágenes de referencia adjuntas.
- `web/models/satellite_grabcad.glb`: archivo CAD de satélite conservado de la versión anterior como material opcional.
- `cad_fuente/Product1.stp`: fuente CAD satelital conservada sin eliminación.
- `fuentes_lab3d/`: código legible del nuevo laboratorio.
- `android/RELICS-Android/`: fuentes para generar APK con el laboratorio y los mismos nueve videos.

## Prueba rápida

1. Extraer **el ZIP completo**, manteniendo carpetas.
2. Abrir `index.html` en Chrome o Edge. En móviles, también puede abrirse desde hosting estático que sirva todas las carpetas.
3. Pulsar **🧩 LAB 3D**, elegir modelo y arrastrar para girar.
4. Cambiar el deslizador **Separación del ensamblaje**, usar **Solo**, **Mostrar todas**, responder la pregunta y regresar con **⌂ VOLVER A RELICS**.
5. Ingresar en cualquiera de los **nueve módulos** y pulsar el video del módulo: es un MP4 local, no un enlace externo.

**Nota Android:** se proporciona el proyecto de Android Studio, no un `.apk` firmado e instalado. El visor se incluye en los activos del WebView y puede compilarse con el proyecto aportado.
