# RELICS 10.0 | Exploradores del Olvido

## Entrega conjunta ampliada — 9 videos + laboratorio 3D

Esta edición conserva RELICS 10.0 y **agrega** dos complementos sin eliminar contenido:

1. Los **nueve videos MP4 locales**, uno para cada módulo original. La web y el proyecto Android incluyen sus copias; consulta `docs/CREDITOS_Y_PERMISOS_VIDEOS.md` antes de publicarlos.
2. Un nuevo botón **🧩 LAB 3D** y una tarjeta de portada para entrar en un **visor tridimensional integrado**. Incluye cuatro modelos educativos (**sonda, lanzador, rover y módulo lunar Eagle de Apolo 11**) con separación de piezas, árbol de componentes, zoom, rotación, visibilidad, interacción educativa y retorno inmediato a la portada. El satélite CAD real de la versión anterior **se conserva como archivo fuente**, pero ya no ocupa la cuarta pestaña. Más detalles y créditos en `docs/LABORATORIO_3D_Y_DERECHOS.md`.

**Importante:** aunque el juego base contenía un HTML autónomo, esta edición ampliada **requiere conservar las carpetas `web/assets/`, `web/videos/` y demás archivos del ZIP** al extraerlo. No copies solamente `index.html`. El visor CAD funciona localmente sin consultar GrabCAD ni descargar Three.js de un CDN. No se incluye una APK binaria: se entrega el proyecto Android listo para compilar.

**Prototipo educativo independiente para NASA Space Apps Challenge Sangolquí 2026**. Responde al reto **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars**. El producto combina narrativa de nueve artefactos con decisiones de ingeniería, micro-simuladores, preguntas con explicaciones, fuentes NASA y competición amistosa.

## Empezar

- **Sin instalar nada:** abre `index.html` en Chrome/Edge/Safari moderno, o `web/index.html`. Si el navegador de Android no permite abrir HTML desde Descargas, usa un servidor HTTP o publica el sitio. El archivo `index.html` es autónomo, con los datos, nueve simuladores y el arcade 9.0 incrustados.
- **En equipo o LAN:** instala Node.js 18+, desde esta carpeta ejecuta `node servidor/server.js`. Abre `http://localhost:8787` o `http://DIRECCION-LAN:8787` en otros dispositivos conectados a la misma red. En **Ranking**, indica `ws://DIRECCION-LAN:8787/ws`, crea sala y comparte el código. El número máximo de jugadores por sala es **12**. Se comparten puntajes y presencia, **NO movimientos simultáneos sobre el mismo tablero**. En Internet, el servidor requiere hosting con TLS y `wss://`.
- **Android:** `android/RELICS-Android` contiene el proyecto fuente con WebView y el mismo índice HTML actualizado. Genera APK en Android Studio, usando API 35. **No hay APK binaria compilada en esta entrega**. Comprueba además WebView y el comportamiento del botón Atrás del teléfono.
- **Volver / Salir:** barra superior permanente; cada simulador, pregunta, pantalla final y arcade tiene botón de inicio o salida. En la web, “Salir” retorna a la portada, no intenta cerrar la aplicación desde JavaScript.

## 9 simuladores nativos HTML/JavaScript

1. **Eagle (Apollo 11)**: descenso controlado por potencia y corrección lateral; energía, altura y velocidad simplificadas.
2. **LRV-3 (Apollo 17)**: rover por cuadrícula, obstáculos, muestras y retorno a base.
3. **ALSEP**: ensayos sísmicos, térmicos y de telemetría; el experimento de radio usa frecuencias reales de la tabla NASA curada.
4. **Sojourner / Pathfinder**: desplazamiento sobre Marte, inspección de rocas y regreso a estación de comunicaciones.
5. **Opportunity**: recorrido geológico con gestión de batería y panel solar afectado por polvo simulado.
6. **InSight**: identificación interactiva de martemotos versus viento/ruido con filtros y ganancias ilustrativos.
7. **Ingenuity**: maniobras de vuelo basadas en balance conceptual de sustentación, viento y batería.
8. **Dawn**: cartografía orbital y maniobras de propulsión iónica, no cálculo orbital de precisión.
9. **Pioneer 10**: enlace de radio de largo alcance con apuntamiento, potencia y tasa de datos.

**AVISO CIENTÍFICO:** Las magnitudes de los simuladores son modelos ilustrativos inventados salvo las cifras etiquetadas “NASA”. No son telemetría reconstruida ni certificación de ingeniería. Los efectos audiovisuales son ilustraciones programadas, no fotografías. El archivo anterior de las tres experiencias de una compañera se conserva en `web/modulos_originales/` y el arcade 9.0 está disponible como opción.

## Preguntas y aprendizaje

Banco JSON: `docs/BANCO_PREGUNTAS_675.json`, **9 misiones × 3 niveles × 25 preguntas = 675**. Cada pregunta registra opciones, respuesta, retroalimentación y referencia. Las 225 preguntas de las tres primeras misiones fueron conservadas de la versión anterior. Las demás combinan datos y conceptos de NASA con ejercicios numéricos hipotéticos. Hay repetición metodológica en las preguntas de cálculo: **el número 675 expresa cantidad, no 675 hechos NASA independientes**. Debe hacerse revisión docente adicional antes de uso curricular formal.

## Datos verificables y reproducibilidad

- `datos/nasa_alsep_curado.csv`: transcripción manual documentada de la tabla NASA *Lunar Surface Experiments Package Arrays and Status*.
- `datos/pipeline_alsep.py`: calcula fechas, duraciones de calendario y razón respecto a vida de diseño, dejando nulo el fin exacto de Apollo 14 porque NASA solo señala enero de 1976.
- `datos/alsep_derivado.json`: resultado auditable y usado en la pestaña **Datos NASA** y en la simulación ALSEP. No existe descarga automática ni API viva.
- Los demás registros históricos están referenciados en cada misión; usar la web de NASA para contrastar.

## Alcance científico del reto

Las **7 misiones principales** de RELICS tratan equipos que permanecieron en **Luna y Marte**. **Dawn y Pioneer 10** son contenido complementario de patrimonio de exploración espacial y no deben eclipsar el reto oficial al presentar el pitch.

## Verificación / estado del proyecto

- Validado con Python y JavaScript: integridad del banco 675, frecuencia ALSEP, render y navegación de nueve misiones, salida desde quiz, 25 preguntas consecutivas, ranking y modos escritorio/móvil mediante navegador automatizado.
- Probado con dos clientes WebSocket **en servidor local**, no Internet público.
- Pendiente: prueba real en Android/WebView, compilación APK, auditoría de fuentes multimedia externas, publicación de repositorio y aplicación, pruebas de incógnito, y evaluación de aprendizaje con escolares.
- La auditoría detallada, basada en los dos documentos facilitados, está en `docs/AUDITORIA_RUBRICA.md`. La presentación para jurados tiene como máximo **7 diapositivas**.

## Transparencia y propiedad intelectual

- **IA:** usada para asistencia en diseño, código, documentación y redacción; esta declaración debe replicarse en el formulario de entrega. No se incluye imagen sintética que se haga pasar por fotografía NASA. Gráficos de simulación son vectoriales programados e identificados.
- **NASA:** referencias históricas, datos y enlaces citados; no se afirma afiliación ni patrocinio de NASA.
- **Colaboración:** los tres módulos HTML anteriores de una compañera se preservan y atribuyen en `CREDITOS_COLABORACION.md`. Antes de publicar el repositorio público, confirmar su autorización para publicación bajo licencia MIT si procede; en caso contrario excluir o licenciar por separado sus contribuciones.
- **Licencia**: MIT para el código autoral propio, con la reserva sobre archivos de terceros. El dataset NASA conserva su atribución.
