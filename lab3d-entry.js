/* RELICS 10 - Laboratorio 3D independiente. Los nueve módulos se conservan.
   La cuarta pestaña ahora representa el módulo lunar Eagle de Apollo 11.
   Las reconstrucciones son didácticas y no geometrías CAD oficiales NASA.
   El anterior STEP satelital se conserva en el paquete como material fuente. */
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import satelliteData from '../web/models/satellite_grabcad.glb';

(() => {
  'use strict';
  const INFO = {
    sonda: {icon:'🛰️', title:'Sonda espacial educativa', source:'https://grabcad.com/library/sonda-de-exploracion-espacial-nasa-1', nasa:'https://science.nasa.gov/mission/dawn/', description:'Reconstrucción 3D de RELICS: plataforma, energía fotovoltaica, antena y sensores. Geometría esquemática, no idéntica al modelo GrabCAD.', question:'¿Para qué sirven los paneles solares de una sonda?', answers:['Para generar electricidad','Para frenar en la atmósfera','Para almacenar rocas'], correct:0, why:'Convierten luz solar en energía eléctrica para los instrumentos y sistemas a bordo.'},
    apolo: {icon:'🚀', title:'Lanzador tipo Apolo · reconstrucción', source:'https://grabcad.com/library/apollo11-1', nasa:'https://www.nasa.gov/mission/apollo-11/', description:'Modelo didáctico 3D de un cohete multietapa con torre de servicio. No constituye un modelo CAD histórico ni reproduce medidas exactas.', question:'¿Por qué un cohete de exploración utiliza varias etapas?', answers:['Para abandonar masa que ya no se necesita','Para captar luz solar','Para medir ondas sísmicas'], correct:0, why:'Al descartar una etapa vacía, el vehículo reduce su masa y puede acelerar con mayor eficacia.'},
    rover: {icon:'🤖', title:'Rover de seis ruedas · reconstrucción', source:'https://grabcad.com/library/mars-rover-robot-with-robotic-arm-1', nasa:'https://science.nasa.gov/mission/mars-pathfinder/', description:'Vehículo explorador conceptual con seis ruedas, cámaras, panel solar y brazo robótico. No es el archivo CAD original ni representa un rover NASA exacto.', question:'¿Qué permite estudiar un brazo robótico equipado con instrumentos?', answers:['Muestras y propiedades de rocas','La órbita de Júpiter','La distancia hasta el Sol sin sensores'], correct:0, why:'Los brazos pueden acercar herramientas a rocas, suelo y objetivos científicos.'},
    lunar: {icon:'🌕', title:'Módulo lunar Eagle · Apolo 11', source:'https://grabcad.com/library/apollo11-2', nasa:'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/', description:'Reconstrucción interactiva educativa del módulo lunar Eagle de Apolo 11 (1969): etapa de descenso, cabina de ascenso, patas y escalera. El diseño es esquemático, no un plano NASA ni geometría GrabCAD. Apolo 1 nunca llevó un módulo lunar a la superficie.', question:'¿Qué componente del Eagle permanece sobre la superficie lunar?', answers:['La etapa de descenso con sus patas','La cabina de ascenso tripulada','El módulo de mando Columbia'], correct:0, why:'La etapa de descenso quedó en la Luna. La etapa de ascenso llevó a Armstrong y Aldrin de regreso a la órbita lunar.'}
  };
  const LINKS = [
    ['Rover robótico con brazo','https://grabcad.com/library/mars-rover-robot-with-robotic-arm-1'],
    ['Apollo11 — diseño 1','https://grabcad.com/library/apollo11-1'],
    ['Apollo11 — diseño 2','https://grabcad.com/library/apollo11-2'],
    ['Sonda de exploración espacial NASA','https://grabcad.com/library/sonda-de-exploracion-espacial-nasa-1'],
    ['Satellite Assembly','https://grabcad.com/library/satellite-assembly-1']
  ];
  const captureBase=new URL('capturas3d/',document.currentScript?.src||document.querySelector('script[src$="relics10-lab3d.js"]')?.src||location.href).href;
  const CAPTURES = [
    ['rover_ensamblado.png','Rover con brazo: captura del modelo de referencia'],
    ['rover_explotado.png','Rover: piezas separadas en el visor de referencia'],
    ['apolo_ensamblado.png','Lanzador: captura del modelo de referencia'],
    ['apolo_explotado.png','Lanzador: estructura separada en la referencia'],
    ['lunar_apolo_referencia.png','Módulo lunar: ilustración CAD de referencia facilitada por el participante'],
    ['satelite_ensamblado.png','Satélite: modelo CAD conservado en las fuentes, fuera de las cuatro pestañas'],
    ['satelite_explotado.png','Satélite: piezas visibles en la referencia']
  ];
  const state = {active:false,selected:'sonda',pieces:[],group:null,renderer:null,camera:null,scene:null,controls:null,raf:0,auto:false,wire:false,explosion:0,single:null,loaded:false,source:'conceptual',lastFocus:null,points:0,buildId:0};
  const $ = (s) => document.querySelector(s);
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mat = (color, metal=.26) => new T.MeshStandardMaterial({color, metalness:metal, roughness:.57, side:T.DoubleSide});
  const C = {
    hull:mat('#9da9b7'), cap:mat('#ccd5dd'), dark:mat('#273444'), blue:mat('#175ab5'),
    solar:mat('#1c4ea4'), grid:mat('#a8dbf5'), gold:mat('#c89643',.64),
    orange:mat('#d08e48'), red:mat('#a52536'), tire:mat('#343942'),
    silver:mat('#a7bdcd',.55), white:mat('#e7e9e6'), black:mat('#141e30'), cyan:mat('#65c9d0')
  };

  function element(tag,attrs={},children='') {const x=document.createElement(tag);for(const [k,v] of Object.entries(attrs)){if(k==='class')x.className=v;else if(k==='text')x.textContent=v;else x.setAttribute(k,v)}if(children)x.innerHTML=children;return x}
  function part(root,name,description,point,draw){
    const g=new T.Group();g.position.set(...point);g.name=name;root.add(g);draw(g);
    const i=state.pieces.length;
    g.traverse(obj=>{if(obj.isMesh)obj.userData.partIndex=i});
    state.pieces.push({group:g,name,description,base:g.position.clone(),visible:true});
    return g;
  }
  function mesh(g,geo,m,xyz=[0,0,0],rot=[0,0,0]) {const v=new T.Mesh(geo,m);v.position.set(...xyz);v.rotation.set(...rot);g.add(v);return v}
  function cub(g,s,p,m){return mesh(g,new T.BoxGeometry(...s),m,p)}
  function cyl(g,rad1,rad2,len,p,m,segments=24,rot=[0,0,0]){return mesh(g,new T.CylinderGeometry(rad1,rad2,len,segments),m,p,rot)}
  function cone(g,rad,len,p,m,seg=20){return mesh(g,new T.ConeGeometry(rad,len,seg),m,p)}
  function sphere(g,r,p,m){return mesh(g,new T.SphereGeometry(r,16,10),m,p)}
  function rod(g,a,b,r,m){const va=new T.Vector3(...a),vb=new T.Vector3(...b),d=vb.clone().sub(va);const o=mesh(g,new T.CylinderGeometry(r,r,d.length(),10),m,va.clone().add(vb).multiplyScalar(.5).toArray());o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o}
  function panel(g,w,h,p){cub(g,[w,.08,h],p,C.solar);cub(g,[w+.1,.1,h+.1],p,C.silver).material=C.silver;const cols=Math.max(3,Math.round(w/.32)),rows=Math.max(3,Math.round(h/.25));for(let i=1;i<cols;i++)cub(g,[.016,.014,h], [p[0]-w/2+i*w/cols,p[1]+.058,p[2]],C.grid);for(let i=1;i<rows;i++)cub(g,[w,.014,.016],[p[0],p[1]+.058,p[2]-h/2+i*h/rows],C.grid)}
  // The panel frame needs to sit behind the blue cells, not cover them.
  function solarPanel(g,w,h,p){cub(g,[w,.08,h],p,C.solar);for(const xx of [-w/2,w/2])cub(g,[.07,.09,h+.07],[p[0]+xx,p[1],p[2]],C.silver);for(const zz of [-h/2,h/2])cub(g,[w+.1,.09,.07],[p[0],p[1],p[2]+zz],C.silver);const c=Math.round(w/.26),r=Math.round(h/.22);for(let i=1;i<c;i++)cub(g,[.012,.01,h],[p[0]-w/2+w*i/c,p[1]+.05,p[2]],C.grid);for(let i=1;i<r;i++)cub(g,[w,.01,.012],[p[0],p[1]+.05,p[2]-h/2+h*i/r],C.grid)}
  function makeRover(root){
    part(root,'Chasis estructural','Contiene la electrónica y distribuye las cargas del robot.',[0,1.35,0],g=>cub(g,[3.3,.55,1.85],[0,0,0],C.dark));
    part(root,'Cubierta superior','Protege sensores, mecanismos y circuitos de polvo y cambios térmicos.',[0,1.68,0],g=>cub(g,[3.45,.16,1.95],[0,0,0],C.hull));
    for(let side of [-1,1])for(let j=0;j<3;j++){
      const x=(j-1)*1.32,z=side*1.23;
      part(root,`Rueda ${side<0?'izquierda':'derecha'} ${j+1}`,'Cada rueda ayuda a superar irregularidades y repartir el peso del rover.',[x,.4,z],g=>{cyl(g,.38,.38,.23,[0,0,0],C.tire,20,[Math.PI/2,0,0]);cyl(g,.24,.24,.25,[0,0,0],C.silver,12,[Math.PI/2,0,0]);sphere(g,.12,[0,0,side*.14],C.black)});
      part(root,`Suspensión ${side<0?'izquierda':'derecha'} ${j+1}`,'La articulación mantiene ruedas en contacto con terreno irregular.',[x,.87,side*.83],g=>{rod(g,[0,-.03,0],[0,-.45,side*.41],.082,C.silver);sphere(g,.13,[0,-.03,0],C.gold)});
    }
    part(root,'Panel solar','Transforma energía luminosa en electricidad; su rendimiento depende de la iluminación.',[-.2,2.02,0],g=>solarPanel(g,2.6,1.6,[0,0,0]));
    part(root,'Soporte del panel','Mantiene la superficie de celdas fotovoltaicas elevada.',[-.1,1.85,.4],g=>rod(g,[0,-.2,-.1],[0,.2,-.4],.085,C.silver));
    part(root,'Cámara de navegación','Permite examinar el terreno y planificar rutas.',[-1.1,2.0,-.4],g=>{cub(g,[.34,.27,.33],[0,0,0],C.dark);cyl(g,.09,.09,.1,[0,0,-.2],C.blue,12,[Math.PI/2,0,0])});
    part(root,'Brazo robótico — base','Un actuador posiciona las herramientas cerca de objetivos científicos.',[1.2,1.95,0],g=>{cyl(g,.27,.27,.24,[0,0,0],C.gold);sphere(g,.24,[0,.18,0],C.orange)});
    part(root,'Brazo robótico — segmento 1','Articulación principal para extender el alcance del instrumento.',[1.35,2.5,0],g=>rod(g,[0,-.45,0],[.6,.65,0],.19,C.orange));
    part(root,'Brazo robótico — segmento 2','Permite orientar la herramienta de medición.',[2.15,3.05,0],g=>{rod(g,[-.3,-.08,0],[.5,.34,0],.14,C.orange);sphere(g,.16,[-.3,-.08,0],C.dark)});
    part(root,'Herramienta científica','Pinza y sensor para la inspección cercana de rocas.',[2.78,3.4,0],g=>{cub(g,[.2,.15,.25],[-.12,0,0],C.silver);rod(g,[0,0,-.1],[.32,-.12,-.19],.045,C.silver);rod(g,[0,0,.1],[.32,-.12,.19],.045,C.silver)});
    part(root,'Antena de comunicaciones','Envía mediciones y recibe comandos mediante señales de radio.',[-1.55,1.97,.57],g=>{rod(g,[0,0,0],[0,.67,0],.04,C.silver);sphere(g,.16,[0,.7,0],C.gold)});
    part(root,'Sensor de superficie','Detecta propiedades físicas y químicas del entorno.',[.95,1.76,.67],g=>cub(g,[.2,.13,.2],[0,0,0],C.gold));
  }
  function makeProbe(root){
    part(root,'Plataforma central','Soporta los componentes mecánicos y electrónicos de la nave.',[0,0,0],g=>cub(g,[2.45,.88,1.8],[0,0,0],C.hull));
    part(root,'Módulo de comunicaciones','Procesa instrucciones y empaqueta datos científicos.',[0,.65,0],g=>cyl(g,.6,.6,.65,[0,0,0],C.cap));
    part(root,'Cubierta térmica','Ayuda a regular temperaturas para proteger instrumentos.',[0,-.55,0],g=>cub(g,[2.3,.15,1.8],[0,0,0],C.gold));
    for(let side of [-1,1]){
      part(root,`Panel fotovoltaico ${side<0?'izquierdo':'derecho'}`,'Cada celda convierte una parte de la radiación solar en corriente eléctrica.',[side*2.8,.15,0],g=>solarPanel(g,2.8,1.65,[0,0,0]));
      part(root,`Brazo del panel ${side<0?'izquierdo':'derecho'}`,'Une físicamente el generador solar con el cuerpo de la nave.',[side*1.65,.07,0],g=>rod(g,[0,0,0],[side*.95,0,0],.08,C.silver));
    }
    part(root,'Antena de alta ganancia','Concentra la emisión de radio en una dirección para mejorar el enlace.',[0,1.47,0],g=>{rod(g,[0,-.5,0],[0,.28,0],.07,C.gold);cyl(g,.72,.43,.22,[0,.28,0],C.white,28);cyl(g,.08,.08,.5,[0,.65,0],C.dark)});
    part(root,'Mástil auxiliar','Soporta sensores y ayuda a despejar obstáculos de la estructura.',[0,2.2,0],g=>rod(g,[0,-.3,0],[0,.5,0],.055,C.silver));
    part(root,'Instrumento óptico','Captura señales e imágenes en tareas de observación.',[-.72,.66,.42],g=>{cub(g,[.33,.33,.52],[0,0,0],C.dark);cyl(g,.13,.13,.18,[0,0,.32],C.blue,12,[Math.PI/2,0,0])});
    part(root,'Instrumento espectral','Separa radiación en bandas para identificar propiedades del objetivo.',[.72,.6,.45],g=>cub(g,[.38,.28,.4],[0,0,0],C.gold));
    part(root,'Propulsor de corrección','Produce pequeñas maniobras para orientar o modificar la trayectoria.',[0,-.62,-.6],g=>{cyl(g,.24,.12,.36,[0,0,0],C.dark,16,[Math.PI/2,0,0]);sphere(g,.12,[0,0,.2],C.silver)});
    part(root,'Unidad de orientación','Usa sensores y actuadores para mantener el apuntamiento.',[.6,-.65,.4],g=>cub(g,[.3,.22,.35],[0,0,0],C.dark));
  }
  function makeRocket(root){
    part(root,'Plataforma principal','Distribuye cargas entre la torre, el cohete y el terreno.',[0,-.4,0],g=>cub(g,[6.2,.45,3.4],[0,0,0],C.hull));
    part(root,'Zapata de cohete','Soporta el vehículo antes del despegue y deja paso a los gases.',[-1.25,.05,0],g=>cyl(g,.73,.82,.32,[0,0,0],C.dark,28));
    const rocket=[
      ['Primera etapa','Incluye motores y tanques para la primera fase de ascenso.',[-1.25,1.65,0],2.6,.62,C.white],
      ['Segunda etapa','Continúa la aceleración cuando se desprende la primera.',[-1.25,3.8,0],1.75,.53,C.white],
      ['Tercera etapa','Impulsa etapas posteriores de la misión.',[-1.25,5.25,0],1.15,.41,C.white],
    ];
    for(let [n,d,p,len,r,m] of rocket)part(root,n,d,p,g=>cyl(g,r,r,len,[0,0,0],m));
    for(let i=0;i<4;i++){
      const y=[.8,2.55,4.08,5.52][i],rr=[.64,.59,.51,.43][i];
      part(root,`Banda de identificación ${i+1}`,'Referencia visual de secciones del vehículo.',[-1.25,y,0],g=>cyl(g,rr,rr,.24,[0,0,0],C.black));
    }
    part(root,'Adaptador y cono','Favorece la aerodinámica al atravesar la atmósfera.',[-1.25,6.28,0],g=>{cyl(g,.38,.4,.3,[0,-.1,0],C.hull);cone(g,.4,1,[0,.56,0],C.white)});
    part(root,'Motores principales','Transforman energía química en empuje mediante gases expulsados.',[-1.25,.28,0],g=>{for(const x of [-.28,.28])for(const z of [-.28,.28])cyl(g,.2,.13,.3,[x,0,z],C.dark,12)});
    part(root,'Estructura de torre','Permite preparar el lanzamiento y acceder al vehículo.',[1.35,3.25,0],g=>{for(const x of [-.52,.52])for(const z of [-.5,.5])rod(g,[x,-3.35,z],[x,3.35,z],.09,C.red)});
    for(let level=0;level<7;level++){
      const y=.55+level*.88;
      part(root,`Torre · nivel ${level+1}`,'Arriostramiento en diagonal: estructura resistente y liviana.',[1.35,y,0],g=>{for(const z of [-.5,.5]){rod(g,[-.52,-.4,z],[.52,.4,z],.052,C.red);rod(g,[-.52,.4,z],[.52,-.4,z],.052,C.red)}for(const x of [-.52,.52])rod(g,[x,-.4,-.5],[x,.4,.5],.048,C.red)});
    }
    for(let j=0;j<4;j++){
      const y=1.6+j*1.15;
      part(root,`Pasarela de acceso ${j+1}`,'Acerca técnicos a puntos del cohete durante la preparación.',[.25,y,0],g=>rod(g,[-.85,0,0],[.82,0,0],.07,C.red));
    }
    part(root,'Baliza de torre','Sistema indicador ubicado en la estructura de servicio.',[1.35,7,0],g=>sphere(g,.17,[0,0,0],C.gold));
  }

  function makeLunarModule(root){
    // Educational reconstruction of the Apollo 11 Lunar Module Eagle.
    // Separation of ascent/descent stages and individual landing gear are
    // deliberately exposed as selectable pieces; sizes are illustrative.
    part(root,'Etapa de descenso · estructura principal','Quedó sobre la Luna tras despegar la etapa de ascenso; alojaba tanques y el motor de alunizaje.',[0,1.56,0],g=>{
      const base=cyl(g,1.48,1.44,1.2,[0,0,0],C.gold,8);base.rotation.y=Math.PI/8;
      cub(g,[2.35,.18,2.32],[0,.62,0],C.dark);
      cub(g,[2.3,.16,2.28],[0,-.62,0],C.gold);
    });
    part(root,'Blindaje térmico dorado','Las láminas reflectantes aislaban partes de la nave del calor y el frío.',[0,1.57,1.45],g=>cub(g,[2.24,.95,.1],[0,0,0],C.gold));
    part(root,'Cubierta térmica posterior','Aislamiento en uno de los costados de la etapa inferior.',[0,1.55,-1.45],g=>cub(g,[2.2,.92,.1],[0,0,0],C.gold));
    for(const side of [-1,1]){
      part(root,`Compartimento lateral ${side<0?'izquierdo':'derecho'}`,'Albergaba sistemas de la etapa de descenso.',[side*1.45,1.57,0],g=>cub(g,[.36,.81,1.6],[0,0,0],C.gold));
      part(root,`Cubierta térmica lateral ${side<0?'izquierda':'derecha'}`,'Protege mecanismos y tuberías expuestos a la superficie lunar.',[side*1.69,1.55,0],g=>cub(g,[.1,.66,1.3],[0,0,0],C.orange));
    }
    part(root,'Motor de descenso y tobera','Permitía desacelerar la nave durante el alunizaje de Eagle.',[0,.72,0],g=>{
      cyl(g,.36,.25,.5,[0,0,0],C.silver,20);
      cyl(g,.25,.39,.45,[0,-.3,0],C.dark,20);
    });
    part(root,'Plataforma de separación','Unía las etapas antes de la salida de los astronautas de la Luna.',[0,2.24,0],g=>{
      const meshPlatform=cyl(g,1.1,1.12,.18,[0,0,0],C.silver,8);
      meshPlatform.rotation.y=Math.PI/8;
    });
    part(root,'Cabina de la etapa de ascenso','Albergó a Neil Armstrong y Edwin Aldrin. Despegó de la Luna para reencontrarse con Columbia.',[0,3.03,0],g=>{
      const shell=cyl(g,1.13,1.04,1.35,[0,0,0],C.hull,8);
      shell.rotation.y=Math.PI/8;
      cub(g,[1.75,.35,1.73],[0,.69,0],C.dark);
      cub(g,[1.85,.11,1.8],[0,-.7,0],C.silver);
    });
    part(root,'Panel frontal de cabina','Superficie de la cabina que integraba ventanillas e instrumentos.',[0,3.11,1.02],g=>cub(g,[1.56,.94,.12],[0,0,0],C.hull));
    for(const side of [-1,1]){
      part(root,`Ventana de tripulación ${side<0?'izquierda':'derecha'}`,'Permitía ver el lugar de alunizaje desde la cabina.',[side*.46,3.35,1.106],g=>{
        const win=cub(g,[.44,.32,.04],[0,0,0],C.black);
        win.rotation.z=side*.19;
        cub(g,[.31,.09,.05],[0,-.19,.01],C.silver);
      });
    }
    part(root,'Escotilla de salida','Permitió a los astronautas bajar desde la cabina hasta la superficie.',[0,2.76,1.14],g=>{
      cub(g,[.56,.48,.08],[0,0,0],C.dark);
      cub(g,[.43,.3,.085],[0,0,.05],C.hull);
      sphere(g,.043,[.19,-.09,.11],C.gold);
    });
    part(root,'Puerto superior de acoplamiento','Se utilizaba para conexiones entre el módulo lunar y el módulo de mando en órbita.',[0,3.93,0],g=>{
      cyl(g,.44,.44,.22,[0,0,0],C.dark,20);
      cyl(g,.31,.31,.24,[0,.11,0],C.silver,20);
    });
    part(root,'Motor de ascenso','Propulsó la etapa superior hacia órbita lunar después de explorar la superficie.',[0,2.2,0],g=>cyl(g,.28,.19,.46,[0,0,0],C.dark,18));
    part(root,'Antena de comunicaciones','Transmitía voz, telemetría y datos mediante radio.',[1.1,3.83,-.34],g=>{
      rod(g,[0,-.28,0],[.19,.57,0],.05,C.silver);
      const dish=cyl(g,.47,.19,.1,[.19,.57,0],C.white,24);
      dish.rotation.z=.35;
    });
    part(root,'Antena de seguimiento','Ayudaba a establecer enlaces de radio y seguimiento con otros vehículos.',[-1.05,3.8,-.24],g=>{
      rod(g,[0,-.18,0],[-.17,.6,0],.045,C.silver);
      sphere(g,.13,[-.17,.6,0],C.gold);
    });
    const spots=[[-1,-1],[-1,1],[1,-1],[1,1]];
    for(let i=0;i<spots.length;i++){
      const [sx,sz]=spots[i],idx=i+1;
      const anchor=[sx*1.15,1.88,sz*1.15],foot=[sx*2.44,.18,sz*2.44];
      part(root,`Pata de alunizaje ${idx}`,'Absorbía fuerzas de contacto y estabilizaba el vehículo sobre terreno irregular.',anchor,g=>{
        rod(g,[0,0,0],[foot[0]-anchor[0],foot[1]-anchor[1],foot[2]-anchor[2]],.12,C.silver);
        sphere(g,.18,[0,0,0],C.dark);
      });
      part(root,`Plato de apoyo ${idx}`,'Distribuía el peso sobre el regolito para evitar el hundimiento del módulo.',foot,g=>cyl(g,.45,.42,.1,[0,0,0],C.silver,22));
      part(root,`Tirante de refuerzo ${idx}`,'Arriostramiento que aporta rigidez a la estructura de aterrizaje.',[sx*1.18,1.32,sz*1.18],g=>{
        rod(g,[0,.38,0],[sx*.92,-.58,sz*.92],.055,C.silver);
      });
    }
    part(root,'Escalera lunar','Los astronautas descendían mediante peldaños situados junto a una pata.',[0,.92,1.98],g=>{
      rod(g,[-.27,-.65,.21],[-.27,.72,-.44],.045,C.silver);
      rod(g,[.27,-.65,.21],[.27,.72,-.44],.045,C.silver);
      for(let n=0;n<7;n++){
        const y=-.58+n*.195;
        rod(g,[-.27,y,.21-(y+.65)*.47],[.27,y,.21-(y+.65)*.47],.034,C.silver);
      }
    });
    part(root,'Sonda de contacto con superficie','Pieza esquemática que ilustra la detección próxima del terreno antes del apoyo.',[1.44,.85,1.45],g=>rod(g,[0,.45,0],[.35,-.58,.35],.035,C.gold));
  }

  function buildConceptual(key){
    state.pieces=[];state.group=new T.Group();state.scene.add(state.group);
    if(key==='rover')makeRover(state.group);
    else if(key==='apolo')makeRocket(state.group);
    else if(key==='lunar')makeLunarModule(state.group);
    else makeProbe(state.group);
    state.source='conceptual';
    afterBuild();
  }
  function afterBuild(){
    state.explosion=0;state.wire=false;state.single=null;
    state.group.traverse(o=>{if(o.isMesh){for(const m of (Array.isArray(o.material)?o.material:[o.material]))m.wireframe=false}});
    $('#r3dWire').classList.remove('accent');
    $('#r3dExplode').value=0;$('#r3dPercent').textContent='0%';
    $('#r3dCount').textContent=`${state.pieces.length} piezas 3D cargadas; desliza para separar.`;
    $('#r3dSourceType').textContent=state.source==='grabcad'?'MODELO CAD REAL CONVERTIDO':state.source==='importado'?'MODELO LOCAL IMPORTADO':'RECONSTRUCCIÓN EDUCATIVA · RELICS';
    renderPieces();fit();displayInfo('Toca una pieza del ensamblaje o selecciónala en el árbol.');
    state.loaded=true;
  }
  function updateExplosion(){
    state.pieces.forEach((p,i)=>{
      const v=p.base.clone();const dir=v.clone().sub(new T.Vector3(0,0,0));
      if(dir.lengthSq()<.1)dir.set(Math.cos(i*2.1),Math.sin(i*2.5)*.7,Math.sin(i*2.1));
      dir.normalize();p.group.position.copy(v.addScaledVector(dir,state.explosion*.025));
    });
  }
  function renderPieces(){
    const holder=$('#r3dParts');holder.replaceChildren();
    for(let i=0;i<state.pieces.length;i++){
      const p=state.pieces[i];
      const row=element('div',{class:'r3d-piece'});
      const lab=element('label');const cb=element('input',{type:'checkbox','aria-label':`Mostrar ${p.name}`});cb.checked=p.group.visible;
      cb.addEventListener('change',()=>{p.group.visible=cb.checked;p.visible=cb.checked});
      lab.append(cb,element('span',{text:p.name}));lab.title=p.description;
      const solo=element('button',{type:'button',text:'Solo'});
      solo.onclick=()=>{state.pieces.forEach((q,j)=>{q.group.visible=(j===i);q.visible=(j===i)});renderPieces();displayInfo(`${p.name}. ${p.description}`)};
      lab.onclick=()=>displayInfo(`${p.name}. ${p.description}`);
      row.append(lab,solo);holder.append(row);
    }
  }
  function displayInfo(t){$('#r3dPartInfo').textContent=t}
  function showAll(){for(const p of state.pieces){p.group.visible=true;p.visible=true}renderPieces();displayInfo('Se muestran todas las piezas del ensamblaje.')}
  function fit(){
    if(!state.group || !state.camera)return;
    const b=new T.Box3().setFromObject(state.group),center=b.getCenter(new T.Vector3()),max=b.getSize(new T.Vector3()).length();
    if(!Number.isFinite(max)||max===0)return;
    state.camera.position.copy(center).add(new T.Vector3(max*.9,max*.55,max*.9));
    state.controls.target.copy(center);state.controls.update();
    state.camera.near=Math.max(.01,max*.0005);state.camera.far=Math.max(1000,max*100);state.camera.updateProjectionMatrix();
  }
  async function buildSatellite(buildId){
    state.pieces=[];state.source='grabcad';
    const encoded=satelliteData.slice(satelliteData.indexOf(',')+1);
    const binary=Uint8Array.from(atob(encoded),x=>x.charCodeAt(0)).buffer;
    let gltf;
    try {gltf=await new GLTFLoader().parseAsync(binary,'')}catch(err){if(state.buildId===buildId)displayInfo('No se pudo abrir el archivo STEP convertido: '+err.message);return}
    if(state.buildId!==buildId)return;
    state.group=gltf.scene;
    state.scene.add(state.group);
    const box=new T.Box3().setFromObject(state.group),size=box.getSize(new T.Vector3());
    const scale=5/Math.max(size.x,size.y,size.z,1);
    const center=box.getCenter(new T.Vector3());state.group.scale.setScalar(scale);state.group.position.sub(center.multiplyScalar(scale));
    state.group.traverse(obj=>{
      if(!obj.isMesh)return;
      const i=state.pieces.length;obj.material.side=T.DoubleSide;
      obj.userData.partIndex=i;
      state.pieces.push({group:obj,name:`Pieza CAD ${i+1}`,description:'Geometría real de Product1.stp, convertido a GLB. Este elemento no se identifica automáticamente como subsistema NASA.',base:obj.position.clone(),visible:true});
    });
    afterBuild();
  }
  async function loadExternalFile(file){
    if(!file)return;
    if(file.size>95*1024*1024){displayInfo('Archivo mayor de 95 MB: importa una versión reducida .glb, .obj o .stl.');return}
    const buildId=++state.buildId;
    $('#r3dPartInfo').textContent='Abriendo archivo: '+file.name+'…';
    try {
      const ext=file.name.split('.').at(-1).toLowerCase(),buffer=await file.arrayBuffer();let object;
      if(ext==='glb')object=(await new GLTFLoader().parseAsync(buffer,'')).scene;
      else if(ext==='stl')object=new T.Mesh(new STLLoader().parse(buffer),mat('#b4cbd3'));
      else if(ext==='obj')object=new OBJLoader().parse(new TextDecoder().decode(buffer));
      else throw new Error('Formato no compatible directamente. Convierte STEP/SLDASM a GLB, STL u OBJ.');
      if(state.buildId!==buildId)return;
      unload();state.group=new T.Group();state.group.add(object);state.scene.add(state.group);state.source='importado';
      const box=new T.Box3().setFromObject(object),size=box.getSize(new T.Vector3());
      const scale=5/Math.max(size.x,size.y,size.z,.001),center=box.getCenter(new T.Vector3());
      object.scale.setScalar(scale);object.position.sub(center.multiplyScalar(scale));
      state.pieces=[];
      object.traverse(obj=>{if(obj.isMesh){const i=state.pieces.length;obj.userData.partIndex=i;state.pieces.push({group:obj,name:obj.name||`Malla ${i+1}`,description:'Geometría importada desde archivo local proporcionado por el participante.',base:obj.position.clone(),visible:true})}});
      $('#r3dModelTitle').textContent='Modelo importado · '+file.name;
      $('#r3dDescription').textContent='Archivo local abierto en RELICS; su autor y licencia corresponden al origen de la geometría.';
      afterBuild();$('#r3dSourceType').textContent='MODELO LOCAL IMPORTADO';
    } catch(error){displayInfo('Error al cargar modelo: '+error.message)}
  }
  function unload(){if(state.group){state.scene.remove(state.group);state.group.traverse(o=>{if(o.isMesh&&o.geometry&&!o.userData.keepGeometry)o.geometry.dispose()})}state.group=null;state.pieces=[]}
  function mountRenderer(){
    if(state.renderer)return;
    const host=$('#r3dCanvas');
    state.scene=new T.Scene();state.scene.background=new T.Color('#030a15');
    state.scene.add(new T.HemisphereLight(0xd5eaff,0x284458,2.25));
    const key=new T.DirectionalLight(0xffffff,2.8);key.position.set(7,12,11);state.scene.add(key);
    const rim=new T.DirectionalLight(0x80d2e6,1.5);rim.position.set(-7,3,-10);state.scene.add(rim);
    state.camera=new T.PerspectiveCamera(42,1,.01,1000);
    try{state.renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'default'})}catch(error){host.textContent='Este dispositivo no permite WebGL. Prueba Chrome actualizado o un equipo con aceleración 3D. '+error.message;return}
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    state.renderer.outputColorSpace=T.SRGBColorSpace;
    host.appendChild(state.renderer.domElement);
    state.renderer.domElement.setAttribute('aria-label','Visor 3D con giro y zoom. Toca piezas para conocer sus funciones.');
    state.controls=new OrbitControls(state.camera,state.renderer.domElement);
    state.controls.enableDamping=true;state.controls.dampingFactor=.06;state.controls.minDistance=1.4;state.controls.maxDistance=75;
    state.controls.enablePan=true;
    state.controls.autoRotate=false;
    const ray=new T.Raycaster(),pt=new T.Vector2();let down=null;
    state.renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY}});
    state.renderer.domElement.addEventListener('pointerup',e=>{
      if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5||!state.group)return;
      const b=state.renderer.domElement.getBoundingClientRect();
      pt.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);ray.setFromCamera(pt,state.camera);
      const hit=ray.intersectObject(state.group,true).find(h=>Number.isInteger(h.object.userData.partIndex));
      if(hit){const p=state.pieces[hit.object.userData.partIndex];if(p)displayInfo(`${p.name}. ${p.description}`)}
    });
    function resize(){if(!state.renderer)return;const {clientWidth:w,clientHeight:h}=host;if(w&&h){state.camera.aspect=w/h;state.camera.updateProjectionMatrix();state.renderer.setSize(w,h,false)}}
    state.resize=resize;window.addEventListener('resize',resize);
    resize();
  }
  function frame(){if(!state.active||!state.renderer)return;state.controls.update();state.renderer.render(state.scene,state.camera);state.raf=requestAnimationFrame(frame)}
  function startLoop(){cancelAnimationFrame(state.raf);state.resize?.();frame()}
  function choose(key){
    if(!INFO[key])return;state.selected=key;const buildId=++state.buildId;
    if(!state.renderer){mountRenderer();if(!state.renderer)return}
    unload();
    const info=INFO[key];$('#r3dModelTitle').textContent=info.title;$('#r3dDescription').textContent=info.description;
    $('#r3dLink').href=info.source;$('#r3dNasa').href=info.nasa;
    document.querySelectorAll('.r3d-tab').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.model===key)));
    $('#r3dQuizQ').textContent=info.question;$('#r3dQuizFeedback').textContent='';
    $('#r3dQuizOpts').replaceChildren(...info.answers.map((answer,i)=>{const b=element('button',{type:'button',text:answer});b.onclick=()=>{
      for(const o of $('#r3dQuizOpts').children)o.disabled=true;
      const correct=i===info.correct;$('#r3dQuizFeedback').textContent=(correct?'✓ Correcto. ':'✗ Revisa la respuesta. ')+info.why;
      if(correct){state.points+=10;$('#r3dXP').textContent=String(state.points);try{localStorage.setItem('relics10_lab3d_xp',String(state.points))}catch(_){}}
    };return b}));
    $('#r3dFile').value='';
    if(key==='satelite')void buildSatellite(buildId);else buildConceptual(key);
  }
  function close(){
    if(!state.active)return;state.active=false;cancelAnimationFrame(state.raf);$('#r3dOverlay').hidden=true;document.body.classList.remove('r3d-open');
    try{state.lastFocus?.focus()}catch(_){}
  }
  function open(){
    state.lastFocus=document.activeElement;state.active=true;$('#r3dOverlay').hidden=false;document.body.classList.add('r3d-open');
    for(const v of document.querySelectorAll('video'))v.pause();
    if(!state.group)choose(state.selected);else{state.resize?.();}
    startLoop();$('#r3dClose').focus();
  }
  function init(){
    if(!window.RELICS10?.getState||$('#r3dOverlay'))return;
    const nav=$('.navright');if(!nav)return;
    const navButton=element('button',{type:'button',id:'r3dNav',text:'🧩 LAB 3D'});navButton.onclick=open;nav.insertBefore(navButton,nav.querySelector('#helpBtn'));
    const home=$('#homeView .featuregrid');
    if(home){const insert=element('section',{class:'r3d-insert'},'<div><h3>🧩 Nuevo: Laboratorio de ensamblajes 3D</h3><p>Explora una sonda, un cohete, un rover y el módulo lunar Eagle de Apolo 11. Gira los modelos, separa sus piezas y conoce su función sin salir de RELICS.</p></div>');const b=element('button',{class:'action gold',type:'button',text:'EXPLORAR MODELOS 3D →'});b.onclick=open;insert.appendChild(b);home.insertAdjacentElement('afterend',insert)}
    const overlay=element('div',{id:'r3dOverlay',role:'dialog','aria-modal':'true','aria-label':'Laboratorio 3D de RELICS'});overlay.hidden=true;
    overlay.innerHTML=`<div class="r3d-shell">
      <div class="r3d-top"><div><div class="r3d-kicker">RELICS · EXPLORACIÓN INGENIERIL INTERACTIVA</div><h2>Laboratorio de ensamblajes 3D</h2></div><button class="r3d-btn exit" id="r3dClose">⌂ VOLVER A RELICS</button></div>
      <div class="r3d-tabs" role="group" aria-label="Seleccionar modelo 3D">
        ${Object.entries(INFO).map(([id,item])=>`<button class="r3d-tab" type="button" data-model="${id}" aria-pressed="false">${item.icon} ${id.toUpperCase()}</button>`).join('')}
      </div>
      <div class="r3d-layout"><div class="r3d-stage"><div class="r3d-canvas" id="r3dCanvas"></div><div class="r3d-stagebadge" id="r3dSourceType">RECONSTRUCCIÓN EDUCATIVA</div><div class="r3d-helper">🖱️ Arrastra para girar · rueda o pellizca para zoom · toca una pieza para descubrir su función</div></div>
      <aside class="r3d-sidebar"><h3 id="r3dModelTitle">Laboratorio 3D</h3><p class="r3d-description" id="r3dDescription"></p><div class="r3d-count" id="r3dCount"></div>
        <div class="r3d-control"><label for="r3dExplode"><span>Separación del ensamblaje</span><output id="r3dPercent">0%</output></label><input type="range" id="r3dExplode" min="0" max="100" value="0" step="1"></div>
        <div class="r3d-actionrow"><button class="r3d-btn" id="r3dReset">⟲ Reunir y centrar</button><button class="r3d-btn" id="r3dShow">◉ Mostrar todas</button><button class="r3d-btn" id="r3dAuto">⟳ Giro automático</button><button class="r3d-btn" id="r3dWire">▧ Modo alambre</button><button class="r3d-btn" id="r3dZoomIn">＋ Acercar</button><button class="r3d-btn" id="r3dZoomOut">－ Alejar</button></div>
        <div class="r3d-piece-title">ÁRBOL DE PIEZAS · MOSTRAR / AISLAR</div><div id="r3dParts" class="r3d-parts"></div>
        <div class="r3d-lesson"><strong>🔬 ¿Qué hace esta pieza?</strong><div id="r3dPartInfo">Selecciona un componente del ensamblaje.</div></div>
        <div class="r3d-quiz"><h4>🧠 Comprueba lo aprendido · +10 XP</h4><div class="r3d-description" id="r3dQuizQ"></div><div id="r3dQuizOpts" class="r3d-quiz-options"></div><p class="r3d-quiz-feedback" id="r3dQuizFeedback"></p><div class="r3d-count">XP del laboratorio: <b id="r3dXP">0</b> · separado del ranking del juego</div></div>
        <div class="r3d-links">Referencia geométrica: <a id="r3dLink" href="#" target="_blank" rel="noopener noreferrer">Ficha del autor en GrabCAD</a><br>Historia científica: <a id="r3dNasa" href="#" target="_blank" rel="noopener noreferrer">NASA</a></div>
      </aside></div>
      <details class="r3d-gallery"><summary>📷 Ver capturas originales de referencia entregadas por el equipo</summary>
        <p>Imágenes de las fichas de modelos compartidas por los participantes. Se muestran para comparación visual; el visor principal es interactivo y funciona dentro de RELICS.</p>
        <div class="r3d-images">${CAPTURES.map(([name,alt])=>`<figure><img loading="lazy" src="${captureBase+name}" alt="${escape(alt)}"><figcaption>${escape(alt)}</figcaption></figure>`).join('')}</div>
      </details>
      <div class="r3d-disclosure"><strong>© Créditos y uso responsable.</strong> Los modelos visibles de sonda, lanzador Apolo, rover y módulo lunar Eagle son <strong>reconstrucciones didácticas originales</strong> elaboradas para RELICS, con asistencia de IA, y no geometrías tomadas de GrabCAD ni planos NASA. Para precisión histórica: <strong>el módulo lunar de alunizaje fue el Eagle de Apolo 11, no de Apolo 1</strong>. Los archivos CAD del satélite de una versión previa se conservan en el paquete, pero ya no aparecen como cuarta pestaña. El material de GrabCAD y las capturas pertenecen a sus titulares originales y requieren verificar licencias antes de distribución pública. NASA no patrocina este proyecto. GrabCAD impide incrustar sus páginas externas en sitios de terceros. Referencias: ${LINKS.map(([t,u])=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${escape(t)}</a>`).join(' · ')}.</div>
      <div class="r3d-disclosure"><strong>¿Tienes los otros CAD originales?</strong> Abre un archivo <code>.glb</code>, <code>.stl</code> o <code>.obj</code> exportado legalmente en tu ordenador. Los ensamblajes de SolidWorks <code>.SLDASM</code> y los STEP <code>.stp</code> requieren exportación previa a uno de esos formatos (se conserva el STEP del satélite convertido en la entrega). <input id="r3dFile" type="file" accept=".glb,.stl,.obj" aria-label="Cargar archivo 3D local"></div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.querySelectorAll('.r3d-tab').forEach(b=>b.onclick=()=>choose(b.dataset.model));
    $('#r3dClose').onclick=close;
    $('#r3dExplode').oninput=e=>{state.explosion=Number(e.target.value);$('#r3dPercent').textContent=state.explosion+'%';updateExplosion()};
    $('#r3dShow').onclick=showAll;
    $('#r3dReset').onclick=()=>{showAll();state.explosion=0;$('#r3dExplode').value=0;$('#r3dPercent').textContent='0%';updateExplosion();fit()};
    $('#r3dAuto').onclick=()=>{state.auto=!state.auto;state.controls.autoRotate=state.auto;$('#r3dAuto').classList.toggle('accent',state.auto)};
    $('#r3dWire').onclick=()=>{state.wire=!state.wire;state.group?.traverse(o=>{if(o.isMesh){for(const m of (Array.isArray(o.material)?o.material:[o.material]))m.wireframe=state.wire}});$('#r3dWire').classList.toggle('accent',state.wire)};
    $('#r3dZoomIn').onclick=()=>{state.camera.position.lerp(state.controls.target,.24);state.controls.update()};
    $('#r3dZoomOut').onclick=()=>{state.camera.position.sub(state.controls.target).multiplyScalar(1.35).add(state.controls.target);state.controls.update()};
    $('#r3dFile').onchange=e=>void loadExternalFile(e.target.files?.[0]);
    document.addEventListener('keydown',e=>{if(state.active&&e.key==='Escape'){e.stopImmediatePropagation();e.preventDefault();close()}},true);
    try{state.points=Math.max(0,Number(localStorage.getItem('relics10_lab3d_xp'))||0)}catch(_){state.points=0}$('#r3dXP').textContent=String(state.points);
    window.RELICS_LAB3D={open,close,choose,getState:()=>({active:state.active,selected:state.selected,count:state.pieces.length,source:state.source})};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
