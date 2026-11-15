from pathlib import Path
import json,random,math
root=Path(__file__).parent
old=json.loads((root/'docs/BANCO_ANTERIOR_225.json').read_text())
SOURCES={
'sojourner':'https://science.nasa.gov/mission/mars-pathfinder/',
'opportunity':'https://science.nasa.gov/mission/mer-opportunity/',
'insight':'https://science.nasa.gov/mission/insight/',
'ingenuity':'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
'dawn':'https://science.nasa.gov/mission/dawn/toolkit/quick-facts/',
'pioneer':'https://science.nasa.gov/mission/pioneer-10/'
}
# Cada tupla: pregunta, respuesta correcta, tres distractores, explicación.
FACTS={
'sojourner':[
('¿En qué planeta trabajó Sojourner?','Marte','Venus','La Luna','Mercurio','Sojourner fue desplegado en la superficie de Marte en 1997.'),
('¿Cuál fue la misión que llevó a Sojourner?','Mars Pathfinder','Viking 1','Mars Odyssey','Mars Express','La sonda Mars Pathfinder transportó el pequeño rover Sojourner.'),
('¿En qué año aterrizó Mars Pathfinder?','1997','1999','2001','1992','Mars Pathfinder aterrizó el 4 de julio de 1997.'),
('¿Qué tipo de vehículo era Sojourner?','Rover robótico','Orbitador','Helicóptero','Sonda de impacto','Sojourner era un vehículo móvil de seis ruedas.'),
('¿Para qué se empleó el instrumento APXS?','Estudiar composición química','Medir órbitas lunares','Tomar muestras de aire terrestre','Transmitir video desde Júpiter','El espectrómetro APXS examinaba la composición elemental de materiales.'),
('¿Cómo recibía soporte de comunicaciones Sojourner?','A través del módulo Pathfinder','A través del módulo lunar Eagle','Por un submarino terrestre','Mediante un satélite lunar Apollo','El módulo de aterrizaje Pathfinder servía de enlace principal.'),
('¿Qué fuente de energía usaba el pequeño rover?','Paneles solares','Gasolina','Energía hidráulica','Motor de combustión','Sojourner funcionaba principalmente con paneles solares y batería.'),
('¿Qué fecha corresponde al aterrizaje de Pathfinder?','4 de julio de 1997','20 de julio de 1969','18 de febrero de 2021','6 de marzo de 2015','La misión aterrizó en Marte el 4 de julio de 1997.'),
('¿Qué demostró Sojourner para misiones futuras?','Movilidad robótica marciana','Vuelo atmosférico humano','Aterrizaje submarino','Propulsión de fusión','Demostró que un pequeño rover podía explorar terrenos marcianos.'),
('¿Cuál era el objetivo de acercarse a las rocas?','Medir sus propiedades','Hacerlas despegar','Crear agua','Llevarlas a la Tierra en el acto','El rover estudió rocas y suelo para obtener información geológica.'),
('¿Qué componente de Pathfinder permanecía fijo?','El módulo de aterrizaje','El rover Sojourner','Su brazo móvil','Sus ruedas','El lander transmitía imágenes y servía de estación fija.'),
('¿Qué mecanismo ayudó a amortiguar el aterrizaje de Pathfinder?','Airbags','Aletas de avión','Patines de agua','Paracaídas solares abiertos en el suelo','El sistema de entrada, descenso y aterrizaje incluyó airbags.'),
('¿Qué fotografía aportaba contexto de las rocas estudiadas?','Imágenes del módulo Pathfinder','Imágenes de Voyager en Saturno','Imágenes de Hubble en Mercurio','Imágenes de Cassini en Titán','El lander fotografió el terreno y observó al rover trabajando.'),
('¿Qué dato NO prueba por sí solo la existencia de vida pasada?','El color aparente de una roca','Un conjunto de análisis geológicos','Una medición espectral con contexto','Evidencias independientes replicadas','La apariencia de una roca, aislada, no permite afirmar vida pasada.'),
('¿En qué misión estaba integrado el explorador móvil que estudió la roca Yogi?','Mars Pathfinder','Apollo 17','Dawn','Pioneer 10','Sojourner inspeccionó terrenos y rocas cerca de Pathfinder.'),
('¿Qué capacidad era novedosa al controlar al rover?','Evadir obstáculos localmente','Teletransportarse','Volar en la atmósfera','Navegar por un océano','La movilidad autónoma relativa y evitación de obstáculos fueron parte de su demostración tecnológica.')],
'opportunity':[
('¿En qué planeta exploró Opportunity?','Marte','Venus','La Luna','Ceres','Opportunity fue un rover marciano.'),
('¿Cuál era el rover gemelo de Opportunity?','Spirit','Curiosity','Sojourner','Perseverance','Spirit y Opportunity formaron la misión Mars Exploration Rovers.'),
('¿En qué año llegó Opportunity a Marte?','2004','1997','2012','2021','Opportunity aterrizó en enero de 2004.'),
('¿Cuál fue el objetivo científico central de Spirit y Opportunity?','Buscar indicios de agua pasada','Buscar vida marina actual','Colocar sismómetros lunares','Volar sobre Venus','Los rovers estudiaban ambientes que pudieron haber tenido agua líquida.'),
('¿Qué fuente de energía principal usaba Opportunity?','Paneles solares','Reactor de fisión','Gasolina','Viento terrestre','Opportunity operaba mediante arreglos de paneles solares.'),
('¿Qué evento redujo la energía de Opportunity en 2018?','Una gran tormenta de polvo','Un eclipse lunar','Un choque con un satélite','Una erupción oceánica','Una tormenta global de polvo oscureció el Sol y afectó su energía.'),
('¿Cuándo fue la última comunicación de Opportunity?','2018','2004','1997','2024','El último contacto fue en junio de 2018.'),
('¿En qué año se declaró oficialmente finalizada su misión?','2019','2005','2010','2022','NASA declaró la misión concluida en febrero de 2019.'),
('¿Qué distancia total aproximada recorrió Opportunity?','45 km','5 km','450 km','0,5 km','Recorrió aproximadamente 45 km por el suelo marciano.'),
('¿Qué es Meridiani Planum para Opportunity?','Región de su aterrizaje','Luna de Júpiter','Órbita de Ceres','Nombre de su motor','Opportunity llegó a la región Meridiani Planum de Marte.'),
('¿Qué pequeñas formaciones estudió como pistas geológicas?','Esférulas ricas en hematita','Corales vivos','Estalactitas de hielo terrestre','Semillas espaciales','Las concreciones ricas en hematita ayudaron a reconstruir la historia del agua.'),
('¿Para qué servía la herramienta de abrasión de roca?','Retirar una capa superficial','Propulsar el vehículo','Crear oxígeno','Recoger señales de radio','La herramienta RAT exponía material más fresco de una roca.'),
('¿Qué podía revelar una imagen microscópica?','Textura de la roca','Temperatura del núcleo del Sol','Edad exacta sin análisis','Composición completa de un océano','El microscopio de imágenes examinaba detalles superficiales.'),
('¿Qué comparación revela la longevidad de Opportunity?','Operó mucho más de 90 soles','Finalizó antes del primer sol','Solo duró una hora','Solo viajó una semana','La misión primaria estaba prevista para unos 90 soles y duró casi 15 años.'),
('¿Qué tipo de vehículo era Opportunity?','Rover de seis ruedas','Helicóptero','Lander fijo','Sonda de impacto','Opportunity desplazaba instrumental científico sobre seis ruedas.'),
('¿Por qué una ruta robótica debe considerar el relieve?','Para evitar terreno peligroso','Para medir viento de la Tierra','Para generar agua','Para impedir toda telemetría','La elección de rutas protege ruedas, tiempo y energía del vehículo.')],
'insight':[
('¿Qué tipo de nave era InSight?','Módulo fijo de aterrizaje','Rover de seis ruedas','Helicóptero','Orbitador','InSight realizaba ciencia desde una ubicación fija en Marte.'),
('¿En qué planeta operó InSight?','Marte','Venus','La Luna','Mercurio','InSight fue una misión geofísica marciana.'),
('¿En qué año aterrizó InSight?','2018','2004','1997','2023','InSight aterrizó en noviembre de 2018.'),
('¿Qué instrumento registraba martemotos?','Sismómetro SEIS','Cámara de Hubble','Rueda del LRV','Radar meteorológico de Júpiter','SEIS detectó vibraciones del terreno marciano.'),
('¿Qué estudian las ondas sísmicas del interior de Marte?','Estructura interna','Distancia a Plutón','Composición del océano terrestre','Altura de los anillos de Saturno','Las ondas ayudan a inferir capas y propiedades del interior del planeta.'),
('¿Por qué se cubrió el sismómetro con un escudo?','Reducir perturbaciones de viento y temperatura','Capturar luz solar','Conducir el rover','Aumentar el ruido mecánico','Un escudo protegía el sensible instrumento de condiciones superficiales.'),
('¿En qué región de Marte aterrizó InSight?','Elysium Planitia','Taurus-Littrow','Mare Tranquillitatis','Jezero','InSight aterrizó en una llanura de Elysium Planitia.'),
('¿Qué fuente de electricidad utilizaba InSight?','Paneles solares','Motor de gasolina','Turbina eólica','Pilas de combustible marino','La energía solar disminuyó por la acumulación de polvo.'),
('¿En qué año concluyó la misión InSight?','2022','2010','2000','2026','NASA declaró el fin de la misión en diciembre de 2022.'),
('¿Qué es un martemoto?','Sismo en Marte','Lluvia terrestre','Tormenta de Júpiter','Eclipse solar','Es una vibración sísmica detectada en el planeta Marte.'),
('¿Qué objetivo tenía el experimento HP³?','Investigar flujo de calor del subsuelo','Observar satélites de Saturno','Medir fotos de Hubble','Dar impulso al rover','HP³ buscaba investigar el calor del interior; su penetrador tuvo dificultades.'),
('¿Qué medición podía interferir con el sismómetro?','Vibración del viento','Imagen de Europa','Distancia Sol-Júpiter','Tiempo de vuelo a Ceres','El ruido ambiental puede contaminar una señal sísmica.'),
('¿Qué característica ayuda a interpretar un sismograma?','Tiempo y amplitud de señal','Color del rover','Número de ruedas','Color del cielo en la Luna','La evolución temporal de una señal permite distinguir eventos.'),
('¿Qué estudia la geodesia con señales de radio?','Movimientos y orientación planetarios','Mineralogía de una roca directamente','Chorros de cohete','Vida marina','Seguimiento de radio puede aportar información sobre rotación y estructura.'),
('¿Por qué era importante ubicar bien el sismómetro?','Para disminuir vibraciones ajenas al suelo','Para generar viento','Para aumentar consumo eléctrico','Para poder conducirlo','El instrumento se colocó cuidadosamente sobre la superficie.'),
('¿Qué evidencia es preferible para afirmar un sismo?','Señal y análisis de ruido contextual','Una suposición visual','Una fotografía aislada','El color del cielo','La separación de señal sísmica y ruido ambiental requiere análisis.')],
'ingenuity':[
('¿Qué tipo de vehículo era Ingenuity?','Helicóptero robótico','Rover de seis ruedas','Lander fijo','Orbitador de Saturno','Ingenuity fue un pequeño helicóptero tecnológico.'),
('¿En qué planeta realizó sus vuelos?','Marte','Venus','La Luna','Júpiter','Ingenuity voló sobre Marte.'),
('¿Cuál fue su fecha de primer vuelo?','19 de abril de 2021','20 de julio de 1969','4 de diciembre de 1973','6 de marzo de 2015','El primer vuelo controlado tuvo lugar el 19 de abril de 2021.'),
('¿Con qué rover llegó Ingenuity a Marte?','Perseverance','Opportunity','Sojourner','Spirit','Fue transportado debajo del rover Perseverance.'),
('¿Cuántos vuelos completó Ingenuity?','72','5','12','120','Ingenuity terminó con 72 vuelos históricos.'),
('¿Cuántos vuelos estaban previstos en su demostración inicial?','Hasta cinco','Hasta cincuenta','Solo uno orbital','Cien despegues','La demostración tecnológica inicial contemplaba hasta cinco vuelos.'),
('¿En qué cráter voló Ingenuity?','Jezero','Gale','Endeavour','Tycho','Ingenuity operó en Jezero, Marte.'),
('¿Qué característica de la atmósfera marciana dificulta el vuelo?','Baja densidad','Exceso de oxígeno','Agua líquida abundante','Aire más denso que en la Tierra','La atmósfera tenue proporciona menos sustentación a los rotores.'),
('¿Qué permiten las palas de rotor?','Generar sustentación aerodinámica','Registrar sismos','Medir química de rocas','Excavar un cráter','Las palas desplazan gas atmosférico y crean fuerzas aerodinámicas.'),
('¿Cuándo realizó Ingenuity su vuelo final?','18 de enero de 2024','3 de diciembre de 1973','24 de enero de 2004','26 de noviembre de 2018','Ingenuity voló por última vez el 18 de enero de 2024.'),
('¿Qué daño contribuyó al fin de sus vuelos?','Daño en palas de rotor','Pérdida de una rueda','Ruptura de un panel del LRV','Rotura de una hélice marina','Se identificaron daños en las palas tras el vuelo final.'),
('¿Qué demostración realizó por primera vez?','Vuelo motorizado controlado en otro planeta','Primer vuelo tripulado lunar','Primer submarino marciano','Primer vuelo interestelar','Ingenuity fue la primera aeronave con vuelo motorizado controlado en otro planeta.'),
('¿Por qué se usaba navegación autónoma?','El retardo de radio impide pilotaje continuo','No existía cámara','No había batería','El aire terrestre lo impedía','La distancia a Marte impide control continuo en tiempo real desde Tierra.'),
('¿Qué energía recargaba la batería?','Luz solar','Petróleo','Carbón','Hidroelectricidad','Un panel solar cargaba su batería entre vuelos.'),
('¿Qué rol adicional cumplió tras sus pruebas iniciales?','Reconocimiento aéreo','Construir estaciones lunares','Trasladar astronautas','Llevar tripulación a Júpiter','Sus vuelos exploraron entornos y probaron operaciones de reconocimiento.'),
('¿Qué representa un aterrizaje seguro de helicóptero?','Controlar velocidad y estabilidad','Aumentar caída al máximo','Agotar energía antes del contacto','Apagar sensores siempre','El aterrizaje depende de reducir velocidades y controlar actitud.')],
'dawn':[
('¿A qué planeta enano llegó Dawn en 2015?','Ceres','Plutón','Eris','Haumea','Dawn entró en órbita alrededor de Ceres en marzo de 2015.'),
('¿Qué gran asteroide visitó antes Dawn?','Vesta','Eros','Bennu','Psyche','Dawn orbitó Vesta antes de continuar hasta Ceres.'),
('¿En qué año se lanzó Dawn?','2007','1997','1972','2021','Dawn fue lanzada el 27 de septiembre de 2007.'),
('¿Qué tecnología principal impulsó sus largas maniobras?','Propulsión iónica','Velas oceánicas','Motores diésel','Hélices de aire','Dawn utilizó motores iónicos para cambios graduales de velocidad.'),
('¿Qué gas emplean los propulsores iónicos de Dawn?','Xenón','Oxígeno atmosférico','Metano terrestre','Aire comprimido','Los motores iónicos aceleran iones de xenón.'),
('¿Dónde se encuentran Vesta y Ceres?','Cinturón principal de asteroides','Nube de Oort','Anillos de Saturno','Superficie de Venus','Ambos cuerpos orbitan en el cinturón principal de asteroides.'),
('¿Qué convierte a Dawn en misión pionera?','Orbitó dos cuerpos extraterrestres distintos','Visitó el Sol físicamente','Aterrizó en Marte','Voló en atmósfera de Venus','Dawn fue la primera nave en orbitar dos objetivos extraterrestres separados.'),
('¿Qué beneficio presenta un motor iónico?','Empuje pequeño durante mucho tiempo','Empuje infinito instantáneo','No necesitar ninguna energía','Acelerar sin expulsar masa','La baja fuerza aplicada durante largos periodos permite grandes cambios acumulados.'),
('¿Qué alimentaba eléctricamente su sistema de propulsión?','Paneles solares','Gasolina','Combustible nuclear de fisión','Viento marciano','Dawn tenía grandes paneles solares para generar electricidad.'),
('¿En qué año se declaró terminada la misión Dawn?','2018','2010','2024','1999','NASA declaró concluida la misión en noviembre de 2018.'),
('¿Qué sustancia se agotó afectando su control de orientación?','Hidrazina','Agua líquida','Oxígeno de la atmósfera','Helio de un globo','La pérdida de hidrazina impidió orientar la nave para comunicarse.'),
('¿Cuál era el tipo de misión de Dawn?','Orbitador científico','Rover','Helicóptero','Módulo lunar tripulado','Dawn exploró Vesta y Ceres desde órbita.'),
('¿Qué instrumento sirve para cartografiar la superficie desde órbita?','Cámara de encuadre','Rueda de rover','Seismómetro de superficie','Escudo térmico terrestre','Las cámaras de Dawn aportaron imágenes para mapas detallados.'),
('¿Qué puede inferirse a partir de la gravedad orbital?','Distribución interna de masa','Presión atmosférica terrestre','Sonido ambiente de Ceres','Edad exacta de una roca sin análisis','El seguimiento orbital permite estimar propiedades gravitatorias.'),
('¿Qué propiedad del xenón hace útil su ionización?','Permite expulsar masa acelerada eléctricamente','Produce aire respirable','Es combustible de combustión común','Genera agua por fotosíntesis','Un campo eléctrico acelera los iones para obtener empuje.'),
('¿Por qué son importantes los metadatos orbitales?','Relacionan mediciones con posición y tiempo','Eliminan el ruido automáticamente','Sustituyen sensores','Cambian la gravedad real','La geometría de observación contextualiza los datos de una sonda.')],
'pioneer':[
('¿Qué planeta visitó Pioneer 10?','Júpiter','Saturno','Marte','Neptuno','Pioneer 10 realizó el primer sobrevuelo cercano de Júpiter.'),
('¿En qué año se lanzó Pioneer 10?','1972','1969','1981','1997','Fue lanzada el 2 de marzo de 1972.'),
('¿En qué año ocurrió su encuentro con Júpiter?','1973','1977','1989','2003','Su máxima aproximación fue el 4 de diciembre de 1973.'),
('¿Qué región cruzó antes de llegar a Júpiter?','Cinturón de asteroides','Cinturón de Kuiper','Anillos de Neptuno','Océanos terrestres','Pioneer 10 abrió camino al atravesar el cinturón principal de asteroides.'),
('¿Cuál era su fuente principal de electricidad?','Generadores radioisotópicos','Grandes paneles solares','Motores diésel','Energía eólica','Pioneer 10 utilizó generadores termoeléctricos de radioisótopos.'),
('¿Qué clase de exploración hizo en Júpiter?','Sobrevuelo','Alunizaje','Aterrizaje marciano','Ingreso en órbita lunar','Pioneer 10 sobrevoló Júpiter sin aterrizar.'),
('¿Qué campo podía estudiar un magnetómetro?','Campo magnético joviano','Edad biológica','Color de una roca','Altura de olas oceánicas','Los magnetómetros miden características de campos magnéticos.'),
('¿Qué medio transmitía la información a Tierra?','Señales de radio','Cables de fibra óptica','Correo físico','Ondas sonoras en vacío','La nave transmitió telemetría mediante radio de espacio profundo.'),
('¿Cuál es la causa principal del retardo en comunicaciones?','Distancia recorrida por la señal','Color de Júpiter','Peso de la antena terrestre','Tipo de letra en una pantalla','Las señales electromagnéticas viajan a velocidad finita.'),
('¿Qué elemento simbólico llevaba Pioneer 10?','Placa con mensaje','Bandera en superficie marciana','Un rover humano','Paracaídas de titanio','Pioneer 10 transportaba una placa con información sobre su origen.'),
('¿Cuándo se recibió su última señal?','2003','1973','2018','2026','El último contacto con Pioneer 10 fue en enero de 2003.'),
('¿Qué planeta gaseoso permitió estudiar directamente por primera vez?','Júpiter','Urano','Neptuno','Saturno','Pioneer 10 produjo observaciones cercanas de Júpiter.'),
('¿Qué propiedad de Júpiter planteaba riesgo para la sonda?','Radiación intensa','Oleaje líquido superficial','Temperatura de un océano terrestre','Vientos en la Luna','El entorno radiactivo joviano era un gran reto para su electrónica.'),
('¿Qué instrumento registra partículas cargadas?','Detector de partículas','Regla de madera','Medidor de sonido en vacío','Cámara de una rueda','Instrumentos de plasma y radiación miden partículas energéticas.'),
('¿Qué geometría importa para enlazar radio a larga distancia?','Apuntar la antena hacia la Tierra','Apuntar hacia cualquier estrella','Ocultar toda la antena','Alinear ruedas de rover','La alta ganancia de antena requiere orientación apropiada.'),
('¿Qué propiedad disminuye al alejarse la nave con la misma antena y potencia?','Potencia de señal recibida','Velocidad de la luz','Número de bits del alfabeto','Frecuencia natural de un sismómetro','El enlace sufre pérdidas espaciales crecientes con la distancia.')]
}
COMMON=[
('¿Cuál es la forma responsable de presentar una escena recreada de {name}?','Rotularla como simulación','Llamarla foto histórica original','Ocultar cómo se creó','Presentarla como medición real','Un gráfico didáctico debe distinguirse explícitamente de un registro histórico.'),
('¿Qué significa telemetría en una misión como {name}?','Datos medidos y enviados a distancia','Combustible sólido','Una órbita circular fija','Una roca lunar','La telemetría permite recibir mediciones desde una nave remota.'),
('¿Por qué registrar unidades en las mediciones de {name}?','Permite interpretar y comparar magnitudes','Aumenta la batería','Mejora la foto sin calibración','Sustituye la fecha de la muestra','Una medición sin unidad carece de interpretación física completa.'),
('¿Cómo se presenta científicamente la incertidumbre en datos de {name}?','Indicando márgenes y limitaciones','Borrando valores que no gustan','Dando precisión ilimitada','Afirmando certeza en todo','La incertidumbre comunica qué tan preciso es un resultado.'),
('¿Por qué preservar registros del equipo {name} después de terminar la misión?','Permite reanalizar información histórica','Aumenta velocidad de un cohete apagado','Reinicia sensores sin energía','Cambia la órbita automáticamente','Los archivos permiten investigaciones posteriores y trazabilidad científica.'),
('¿Qué medida ayuda a diferenciar señal y ruido de instrumentos de {name}?','Analizar contexto y calibración','Mirar solo el color del gráfico','Omitir metadatos','Modificar datos para obtener la hipótesis','El análisis requiere contexto instrumental y tratamiento de ruido.'),
('¿Qué referencia ofrece mejor trazabilidad de la misión {name}?','Una fuente primaria NASA vinculada','Una imagen anónima sin fecha','Un rumor no verificable','Una frase sin procedencia','Fuentes oficiales y metadatos facilitan la verificación.'),
('¿Qué cambia el científico en un experimento controlado relacionado con {name}?','Una variable independiente','La velocidad de la luz','El pasado histórico','Todas las variables a la vez sin registrar','Se manipula una variable y se observan efectos sobre otras.'),
('¿Qué diferencia a una simulación de {name} de una observación NASA?','La simulación calcula escenarios hipotéticos','La simulación es siempre histórica','Una observación no usa instrumentos','Ambas son necesariamente mediciones directas','El modelo se debe contrastar con observaciones y límites conocidos.')]
DISPLAY={'sojourner':'Sojourner','opportunity':'Opportunity','insight':'InSight','ingenuity':'Ingenuity','dawn':'Dawn','pioneer':'Pioneer 10'}
BANK=old.copy()

def add(m,lev,stem,good,wrong,why):
 opts=[good]+list(wrong)
 assert len(opts)==4 and len(set(opts))==4, (m,lev,stem,opts)
 i=len(BANK[m][lev]);random.Random(f'v10-{m}-{lev}-{i}').shuffle(opts)
 BANK[m][lev].append({'id':f'{m}-{lev}-{i+1:02}', 'q':stem,'o':opts,'a':opts.index(good),'why':why,'source':SOURCES[m]})

for m in SOURCES:
 BANK[m]={d:[] for d in ('facil','normal','dificil')}
 assert len(FACTS[m])==16
 for stem,good,a,b,c,why in FACTS[m]:add(m,'facil',stem,good,(a,b,c),why)
 for stem,good,a,b,c,why in COMMON:add(m,'facil',stem.format(name=DISPLAY[m]),good,(a,b,c),why)

def num(m,lev,stem,value,unit,why):
 # Todos son números enteros; no distractores equivalentes.
 assert isinstance(value,int)
 v=[value,value+5+value%5,value+11+value%7,max(0,value-7-value%5)]
 if len(set(v))<4:v=[value,value+7,value+13,value+19]
 opts=[f'{n} {unit}' for n in v]
 add(m,lev,stem,opts[0],opts[1:],why)

# 25 ejercicios cuantitativos por misión y nivel, con valores sintéticos rotulados.
for m in SOURCES:
 for i in range(25):
  k=i//5; j=i%5
  name=DISPLAY[m]
  if k==0:
   samples=15+7*i;bits=8+8*(i%3);v=samples*bits
   num(m,'normal',f'Escenario didáctico {i+1} de {name}: se transmiten {samples} mediciones de {bits} bits. ¿Cuántos bits útiles son, sin cabeceras?',v,'bits',f'{samples} mediciones × {bits} bits/medición = {v} bits. Valores inventados para practicar telemetría.')
  elif k==1:
   total=150+13*i;used=28+4*i;v=total-used
   num(m,'normal',f'Presupuesto de energía ficticio {i+1} de {name}: dispones de {total} unidades y gastas {used}. ¿Qué reserva queda?',v,'unid.',f'{total} − {used} = {v} unidades. No son valores históricos de la nave.')
  elif k==2:
   dist=6+2*i;speed=2+(i%4);v=dist*speed
   num(m,'normal',f'Ensayo virtual {i+1} de {name}: viajas a {speed} km/h durante {dist} horas. ¿Qué distancia se recorrería a velocidad constante?',v,'km',f'Distancia = {speed} km/h × {dist} h = {v} km; es un ejemplo matemático, no un registro NASA.')
  elif k==3:
   power=14+i*2;sec=20+i*3;v=power*sec
   num(m,'normal',f'En una instrumentación hipotética de {name}, el consumo es {power} W durante {sec} s. ¿Cuánta energía utiliza?',v,'J',f'Energía = potencia × tiempo = {power} × {sec} = {v} J. Valores educativos hipotéticos.')
  else:
   freq=10+(i-20)*5;time=8+i;v=freq*time
   num(m,'normal',f'El sistema experimental de {name} obtiene {freq} muestras/s durante {time} s. ¿Cuántas muestras registra?',v,'muestras',f'{freq} muestras/s × {time} s = {v} muestras. Ejercicio inventado, no telemetría real.')
  if k==0:
   rate=8+2*i;time=30+5*i;bits=rate*time*8
   num(m,'dificil',f'Telemetría virtual de {name} {i+1}: {rate} bytes/s durante {time} s. ¿Cuál es el total en bits? (1 byte = 8 bits)',bits,'bits',f'{rate} × {time} × 8 = {bits} bits. Modelo de transmisión ficticio.')
  elif k==1:
   power=45+3*i;time=120+20*i;energy=power*time
   num(m,'dificil',f'Presupuesto de {name} {i+1}: potencia de {power} W durante {time} segundos. ¿Cuántos julios consume el equipo?',energy,'J',f'E = P·t = {power} × {time} = {energy} J. No representa consumo histórico NASA.')
  elif k==2:
   distance=30_000_000+10_000_000*i
   # radio en vacío a 300000 km/s; integer distance
   seconds=round(distance/300000)
   num(m,'dificil',f'Enlace hipotético a {name} {i+1}: la señal cruza {distance:,} km a 300.000 km/s. ¿Qué tiempo tarda solo la ida? Redondea al segundo más cercano.',seconds,'s',f'Tiempo = distancia / velocidad = {distance:,} / 300.000 ≈ {seconds} s. La distancia es inventada, no una efeméride.')
  elif k==3:
   x=8+i; y=3+i%5; n=2+i%4; val=x*y*n
   num(m,'dificil',f'Datos científicos simulados de {name} {i+1}: {x} sensores, {y} lecturas/s por sensor durante {n} segundos. ¿Cuántas lecturas combinadas?',val,'lecturas',f'{x} × {y} × {n} = {val} lecturas, suponiendo muestreo uniforme.')
  else:
   gross=1000+80*i; loss=8+i%6; v=gross*(100-loss)//100
   # guaranteed div? use whole integer % (by choice, simplified floor)
   num(m,'dificil',f'Plan de datos de {name} {i+1}: hay {gross} paquetes; se pierde un {loss}% y se trunca el resultado a paquetes enteros. ¿Cuántos paquetes completos llegan?',v,'paquetes',f'Paquetes recibidos = ⌊{gross} × (1 − {loss}/100)⌋ = {v}; las pérdidas son ficticias.')

for m in BANK:
 assert set(BANK[m])=={'facil','normal','dificil'}
 for d in BANK[m]:
  x=BANK[m][d];assert len(x)==25,(m,d,len(x));assert len({a['q'] for a in x})==25,(m,d,'duplicate')
  for a in x:
   assert len(a['o'])==4 and len(set(a['o']))==4 and 0<=a['a']<4 and a['why'] and a['source'].startswith('https://')
(root/'docs/BANCO_PREGUNTAS_675.json').write_text(json.dumps(BANK,indent=2,ensure_ascii=False),encoding='utf-8')
print('Banco 675 validado: ',{m:{d:len(BANK[m][d]) for d in BANK[m]} for m in BANK})
