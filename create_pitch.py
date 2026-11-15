from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path
import json
root=Path(__file__).parent
try:
 pdfmetrics.registerFont(TTFont('DejaVu','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
 pdfmetrics.registerFont(TTFont('DejaVuB','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
except Exception: pass
W,H=960,540
BG=HexColor('#071021');PN=HexColor('#10243A');MINT=HexColor('#6de8d2');GOLD=HexColor('#edbb65');WHITE=HexColor('#f3f8ff');SUB=HexColor('#bbd0e0');LINE=HexColor('#35556a')
data=json.loads((root.parent/'datos/alsep_derivado.json').read_text())

ES=[
('01 / PROYECTO','RELICS · EXPLORADORES DEL OLVIDO','El legado de las máquinas espaciales se convierte en una experiencia científica jugable.',
 ['NASA Space Apps Challenge · Sangolquí 2026','Reto: Abandoned but not Forgotten','Equipo: [NOMBRE DEL EQUIPO] · ESPE']),
('02 / PROBLEMA','Los equipos quedaron. Las historias no deben perderse.','La historia de la exploración se suele mostrar como fechas e imágenes estáticas. Convertimos equipos abandonados de Luna y Marte en decisiones investigables.',
 ['7 historias centrales de Luna y Marte','Usuarios: escolares, profesores y museos','Dawn y Pioneer 10: material complementario de patrimonio espacial']),
('03 / SOLUCIÓN','Nueve simuladores. Aprender es parte del juego.','Un museo de decisiones: explorar, equivocarse, corregir y explicar el fenómeno antes de ganar XP.',
 ['Eagle, LRV-3, ALSEP, Sojourner, Opportunity, InSight, Ingenuity, Dawn y Pioneer 10','3 dificultades: Fácil, Normal y Difícil','675 preguntas = 9 misiones × 3 niveles × 25 ítems','Botones permanentes: Inicio, Volver y Salir']),
('04 / NASA DATA','Datos NASA usados para tomar decisiones','Tabla real de estaciones ALSEP/EASEP: fechas de operación, vida prevista y frecuencias de enlace descendente.',
 ['NASA History · Apollo Lunar Surface Experiments Package Arrays and Status','Pipeline: CSV curado → cálculo Python → JSON → vista del juego','La frecuencia real seleccionada afecta la prueba de radio ALSEP','No se confunden los parámetros del videojuego con telemetría histórica']),
('05 / ARQUITECTURA','Un MVP que se ejecuta en la mano','Web autónoma con nueve motores didácticos, repositorio de preguntas y puntuaciones locales; servidor de salas opcional.',
 ['HTML / CSS / JavaScript + Canvas','Node.js / WebSocket: ranking compartido en sala de hasta 12','Python: transformación reproducible de datos NASA','Android Studio: fuentes WebView; APK pendiente de compilar']),
('06 / IMPACTO Y VALIDACIÓN','Escalable para aulas y museos','Conocimiento verificable, decisiones con consecuencias e interfaz móvil. Validación automática local realizada; falta piloto con escolares.',
 ['Prueba automatizada: 9 simuladores y 25 preguntas consecutivas','Escenarios móvil/escritorio y dos clientes WebSocket en red local','Próximo paso: pretest/postest y revisión de aprendizaje real','Pendiente: despliegue web público y comprobación de APK']),
('07 / TRANSPARENCIA','Ciencia abierta y atribución responsable','El equipo distingue material NASA de modelos hipotéticos, ilustraciones programadas y contribuciones de sus integrantes.',
 ['Código propio: licencia MIT. Archivos de compañera: confirmar permisos','Asistencia de IA: código, diseño y documentación (declarar al enviar)','Fuentes NASA vinculadas; sin afiliación oficial NASA','Equipo: [NOMBRES / ROLES]. Repositorio y demo pública: [URL PENDIENTE]'])]
EN=[
('01 / PROJECT','RELICS · EXPLORERS OF THE FORGOTTEN','Turn the legacy of abandoned space machines into a playable scientific learning experience.',
 ['NASA Space Apps Challenge · Sangolquí 2026','Challenge: Abandoned but not Forgotten','Team: [TEAM NAME] · ESPE']),
('02 / PROBLEM','The hardware remains. The stories should not fade.','Space exploration history is often presented through dates and static images. We turn discarded Moon and Mars hardware into decisions learners can explore.',
 ['7 core Moon and Mars stories','Audience: students, teachers, and museums','Dawn and Pioneer 10: bonus space-heritage content']),
('03 / SOLUTION','Nine simulators. Learning drives the game.','An interactive museum: investigate, make mistakes, correct decisions, and explain science to earn XP.',
 ['Eagle, LRV-3, ALSEP, Sojourner, Opportunity, InSight, Ingenuity, Dawn and Pioneer 10','3 difficulties: Easy, Normal, Hard','675 questions = 9 missions × 3 levels × 25 items','Always available: Home, Back and Exit']),
('04 / NASA DATA','NASA data affects the actual gameplay','Real ALSEP/EASEP station table: operation dates, planned design life and downlink frequencies.',
 ['NASA History · Apollo Lunar Surface Experiments Package Arrays and Status','Reproducible pipeline: curated CSV → Python → JSON → game','Authentic station frequencies inform the ALSEP radio test','All hypothetical game parameters are clearly labeled']),
('05 / ARCHITECTURE','A prototype you can hold in your hand','Standalone web with nine teaching engines, a documented question bank and local scores; optional online leaderboard server.',
 ['HTML / CSS / JavaScript + Canvas','Node.js / WebSocket: shared scoreboard, up to 12 per room','Python: reproducible NASA data transformation','Android Studio: WebView source included, binary APK not yet built']),
('06 / IMPACT & TESTING','Built to scale for schools and museums','Traceable knowledge, visible consequences and responsive mobile interfaces. Local automated tests pass; learner pilot still needed.',
 ['Automated checks: 9 simulators and 25 consecutive questions','Desktop/mobile viewports and two local WebSocket users','Next: pretest/posttest and genuine learning assessment','Still needed: public deployment and APK testing']),
('07 / TRANSPARENCY','Open science and responsible credit','We separate NASA records from simplified models, code-drawn visuals and contributions by team members.',
 ['Original code: MIT license; teammate modules need permission','AI assistance: coding, design and documentation (declare at submission)','NASA linked sources; no official NASA affiliation claimed','Team: [NAMES / ROLES]. Public repo and demo: [URL PENDING]'])]

def drawpara(c,text,x,y,width,size=16,leading=None,maxlines=5,color=SUB,font='DejaVu'):
 leading=leading or size*1.55;words=text.split();lines=[];current=''
 for w in words:
  t=(current+' '+w).strip()
  if pdfmetrics.stringWidth(t,font,size)>width and current:lines.append(current);current=w
  else:current=t
 if current:lines.append(current)
 c.setFont(font,size);c.setFillColor(color)
 for line in lines[:maxlines]:c.drawString(x,y,line);y-=leading
 return y

def rect(c,x,y,w,h,fill,r=16,stroke=None):
 c.setFillColor(fill);c.setStrokeColor(stroke or fill);c.roundRect(x,y,w,h,r,fill=1,stroke=int(stroke is not None))

def produce(lang,pages):
 file=root/f'RELICS_10_PITCH_7_{lang}.pdf';c=canvas.Canvas(str(file),pagesize=(W,H));c.setTitle('RELICS 10 - NASA Space Apps Sangolquí 2026')
 for n,(kicker,title,lead,bullets) in enumerate(pages,1):
  c.setFillColor(BG);c.rect(0,0,W,H,fill=1,stroke=0)
  c.setFillColor(PN);c.circle(866,425,150,stroke=0,fill=1);c.setStrokeColor(HexColor('#164b62'));c.setLineWidth(2);c.circle(866,425,124,stroke=1,fill=0)
  c.setFont('DejaVuB',10);c.setFillColor(MINT);c.drawString(48,491,kicker)
  c.setFont('DejaVuB',12);c.setFillColor(GOLD);c.drawRightString(907,490,'RELICS · 2026')
  y=445; y=drawpara(c,title,48,y,790,size=30,leading=38,maxlines=2,color=WHITE,font='DejaVuB')
  y=drawpara(c,lead,49,y-11,820,size=14,leading=23,maxlines=3,color=SUB)
  start=min(y-25,311)
  if n==4:
   rect(c,47,65,860,235,PN,r=16,stroke=LINE)
   c.setFont('DejaVuB',12);c.setFillColor(MINT);c.drawString(65,280,'Apollo   Estación   Diseño(días)   Downlink (MHz)   Duración calendario (días)')
   for idx,d in enumerate(data):
    yy=248-idx*30
    c.setFillColor(SUB if idx%2==0 else WHITE);c.setFont('DejaVu',12)
    dur=str(d['dias_calendario_hasta_apagado']) if d['dias_calendario_hasta_apagado'] is not None else 'N/D (ene. 1976)'
    c.drawString(66,yy,f"{d['apollo']:>2}         {d['conjunto']:<8}      {d['vida_diseno_dias']:<6}               {d['downlink_mhz']:<7}                   {dur}")
   c.linkURL('https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm',(47,64,908,105),relative=0)
   drawpara(c,'NASA data → CSV → Python → JSON → educational station comparison',54,45,860,size=11,leading=14,color=GOLD)
  else:
   available=240 if n!=1 else 230
   rect(c,47,64,860,available,PN,r=16,stroke=LINE)
   x=66;cy=64+available-38
   for ix,b in enumerate(bullets):
    c.setFillColor(MINT if ix%2==0 else GOLD);c.circle(x+4,cy+5,4,fill=1,stroke=0)
    cy=drawpara(c,b,x+18,cy,810,14,leading=21,maxlines=2,color=WHITE)-15
   if n==1:
    c.setFont('DejaVuB',12);c.setFillColor(GOLD);c.drawString(55,34,'Narrar · Simular · Aprender · Competir' if lang=='ES' else 'Tell stories · Simulate · Learn · Compete')
  c.setFillColor(SUB);c.setFont('DejaVu',10);c.drawString(48,18,'NASA sources cited · Independent educational prototype');c.drawRightString(908,18,f'{n} / 7')
  c.showPage()
 c.save();print(file)
produce('ES',ES);produce('EN',EN)
