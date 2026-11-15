# Auditoría de cumplimiento — RELICS 10.0 (14 noviembre 2026)

**Documentos de referencia suministrados por el equipo:**

1. `GUIA PARTICIPANTES Y RUBRICA (1).pdf`, 19 páginas. Capítulos de entregables, penalizaciones y jurado.
2. `Guía Integral de Calificación y Juzgamiento - NASA Space Apps Sangolquí 2026 FINAL.pdf`, 14 páginas. Cuatro áreas con cinco preguntas cada una, matriz dinámica de ponderaciones y nominaciones.

**Alcance:** revisión técnica documental y pruebas locales de software, NO certificación del staff ni evaluación definitiva por jurado. Estado: **OK local**, **PARCIAL**, **PENDIENTE** o **NO DISPONIBLE**. No se asigna una calificación oficial ni se promete ganar.

## Auditoría de penalizaciones

| Exigencia de la guía | Estado | Evidencia / qué falta | Deducción prevista si falla |
|---|---|---|---:|
| Datos oficiales NASA explícitos | **OK local; PARCIAL en alcance** | Hay fuentes NASA por misión y CSV original curado/transformado para 6 estaciones ALSEP. Debe mostrarse **Datos NASA** en el pitch. El contenido histórico de otras misiones es curado, no un dataset instrumental descargado. | −2 |
| Repositorio público + licencia abierta en raíz | **PENDIENTE** | `LICENSE` está en la raíz del paquete. Falta repositorio público real y enlace probado. Confirmar consentimiento/licencia de archivos de la compañera. | −2 |
| Todos los enlaces públicos y sin 404 en incógnito | **PENDIENTE** | No existe URL pública desplegada del juego en esta entrega. Verificar fuentes NASA, demo, video y repo en incógnito. | −1 |
| PDF de máximo 7 diapositivas o demo de hasta 35 s | **OK local para PDF** | Los pitches ES/EN en `docs/` tienen exactamente 7 páginas. Video de 30–35 s no generado, opcional según guía. | −1 |
| Declaración de IA y uso de logos / marcas | **PARCIAL** | Declaración incluida en README, créditos y pitch. Falta llenar casilla de IA en plataforma; ninguna pantalla debe representar patrocinio NASA. Revisar y acreditar materiales de terceros. | −1 |
| Ficha y entregables ES/EN | **PARCIAL** | README y pitch ES/EN entregados. UI de juego sigue principalmente en español; la guía exige documentación bilingüe y fichas subidas en ambos idiomas. Falta verificar carga de plataforma global. | −1 |

**Fecha límite indicada por ambos documentos:** domingo **15 de noviembre de 2026, 09:00 hora Ecuador**. La guía señala auditoría staff 09:30–10:45 y exposición desde 11:00. No confundir archivos locales con envío formal.

## Evaluación por los 20 criterios, sin asignar notas del jurado

| Criterio | Estado local | Evidencia o tarea |
|---|---|---|
| **1.1 Uso evidente de datos NASA** | OK local/PARCIAL | Tabla de frecuencias/duraciones ALSEP y citas; añadir pantalla al pitch. |
| **1.2 Sustento científico** | PARCIAL | Separación explícita entre hechos y modelos ficticios; revisión académica de algunos ejercicios matemáticos pendiente. |
| **1.3 Procesamiento de datos** | OK local limitado | `pipeline_alsep.py`, CSV y JSON derivados; no se presenta procesamiento de todas las misiones. |
| **1.4 Dominio en Q&A** | PENDIENTE | Ensayo de respuestas frente a expertos científicos. |
| **1.5 Transparencia y atribución** | PARCIAL | Créditos, fuentes, declaración de IA; confirmar autorización de compañera. |
| **2.1 MVP funcionando en vivo** | OK local/PENDIENTE demo externa | Pruebas con navegador automatizado; falta ejecutar en dispositivo real e Internet público. |
| **2.2 Arquitectura técnica** | OK local | HTML/CSS/JS sin frameworks, servidor Node WebSocket, Python de datos, fuentes Android WebView. |
| **2.3 Originalidad/ingenio** | PARCIAL (criterio subjetivo) | 9 escenarios, banco de conocimiento, modos de juego y archivo patrimonial; corresponde al jurado decidir. |
| **2.4 Defensa de ingeniería en Q&A** | PENDIENTE | Explicar state machines, trazabilidad de preguntas, límites del sistema de puntajes, modelo docente. |
| **2.5 Factibilidad/reproducibilidad** | PARCIAL | Códigos y pruebas reproducibles; APK no compilada, URL pública no disponible, métricas anti-trampas no garantizadas. |
| **3.1 Alineación con el reto oficial** | PARCIAL/ALTA | Siete misiones centrales Luna/Marte; Dawn y Pioneer 10 son extras, no centrar pitch en ellos. |
| **3.2 Magnitud de impacto** | PENDIENTE métrica | Definir muestra piloto y pretest/postest, p.ej. 10–20 estudiantes; no inventar resultados. |
| **3.3 Adopción y escalabilidad** | PARCIAL | Plan propuesto: web pública estática + servidor de salas + validación escolar + futura app compilada. |
| **3.4 Pertinencia territorial/misión** | PARCIAL | Escuela y museos de Ecuador, soporte móvil, material STEM sin hardware especializado. |
| **3.5 Accesibilidad/usabilidad** | PARCIAL | Diseño móvil, botones táctiles, teclado parcial; falta lectores de pantalla, auditoría WCAG y usuarios reales. |
| **4.1 Narrativa del pitch** | PARCIAL | Apertura sobre huellas científicas y legado; ensayar en voz alta. |
| **4.2 Interfaz/calidad visual** | OK local/PARCIAL | Capturas de pantalla, nueve escenas estilizadas; fotos históricas remotas solo donde se tengan URLs verificadas. |
| **4.3 Gestión del tiempo/síntesis** | OK formato/PENDIENTE actuación | PDF siete diapositivas; cronometraje real del pitch pendiente. |
| **4.4 Expresión oral/seguridad** | PENDIENTE | Solo se puede evaluar con el equipo exponiendo. |
| **4.5 Cohesión de equipo en Q&A** | PENDIENTE | Completar nombres/roles, asignar secciones y practicar respuestas. |

## Pruebas ejecutadas

- `python create_bank.py`: 675 preguntas; 25 por nivel en cada una de nueve misiones; opciones únicas, índice correcto, explicación y enlace.
- `python datos/pipeline_alsep.py`: seis registros reales curados; cinco intervalos con fecha exacta y un estado final sin fecha precisa.
- `python tests/test_ui.py`: escritorio 1360 × 860 y móvil 390 × 844; 9 tarjetas, 9 simuladores, botón Salir/Inicio, pregunta y regreso, 25 consecutivas, ranking. Se usa `page.set_content` por una restricción local del navegador automatizado contra abrir archivos/localhost; esto **no equivale a instalar en teléfono real**.
- `node tests/test_online.cjs` ante `servidor/server.js`: dos jugadores simultáneos en una sala y una actualización de puntuación de una misión añadida. **Servidor local únicamente**.
- `node --check web/app.js` y estructura HTML autocontenida.

## Riesgos prioritarios antes de entregar

1. **Publicación real:** repositorio GitHub/GitLab público, licencia en raíz, URL web pública con prueba incógnito, acceso del formulario.
2. **Permisos/atribución:** confirmar licencia de contribuciones de compañera y referencias de fotos; sustituir/retirar material sin permiso.
3. **Demo validada:** probar celular físico, Chrome Android, botones táctiles, flujos de 25 preguntas, Internet y modo offline.
4. **Científico:** presentar el CSV NASA y el pipeline, no declarar que los parámetros del videojuego son telemetría histórica. Ampliar datasets para otros módulos solo si pueden procesarse y defenderse.
5. **Público real:** realizar piloto corto con estudiantes y documentar cambios observables (no fabricar métricas).
6. **Rondas competitivas:** el WebSocket actual permite reportar puntos desde el cliente; **no hay servidor autoritativo antitrampas**. Para competiciones oficiales hace falta validar jugadas y puntaje en servidor.
7. **Presentación:** integrar nombres reales, funciones del equipo, consentimiento y enlaces públicos; ensayar pitch y Q&A, verificar envío antes de las 09:00.

## Cálculo de nominaciones

La guía describe las cuatro áreas RCD, IET, IR y STP con pesos variables según nominación; la nota base se pondera, se suman **+3 puntos por voto de juez para esa nominación específica** y se descuentan las penalizaciones. No se extrapola una nota de ganador de los tests automatizados.
