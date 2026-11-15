/* RELICS 10 · Ampliación de video documental V1.
   No modifica la lógica ni los simuladores existentes. Los MP4 son archivos
   aportados por el equipo y sus permisos para distribución pública NO se han verificado.
*/
(function(){
  'use strict';
  const SELF=document.currentScript;
  if(!SELF || !SELF.src) return;
  const VIDEO_DIR=new URL('../videos/', SELF.src);
  const POSTER_DIR=new URL('../posters/', SELF.src);
  const MAP={
    eagle:{title:'El Misterio del Apollo 11',credit:'Producción y titular de derechos: por confirmar',note:'Material contextual sobre Apollo 11; comprobar la procedencia antes de publicarlo.'},
    lrv:{title:'Apolo 17: Sobre los Hombros de Gigantes',credit:'Producción y titular de derechos: por confirmar',note:'Documental contextual de Apollo 17 y el recorrido del vehículo lunar.'},
    alsep:{title:'Un terremoto golpea a la Luna por horas · Los Secretos de la NASA',credit:'Discovery Latinoamérica (identificado en el nombre del archivo); titular exacto por verificar',note:'Contexto de sismología lunar. No constituye telemetría original de ALSEP ni prueba de un suceso relacionado con un instrumento concreto.'},
    sojourner:{title:'La pionera marciana · Marte, el planeta de los robots',credit:'Serie/producción: por confirmar',note:'Contexto histórico de los primeros robots exploradores de Marte; comprobar la atribución.'},
    opportunity:{title:'¿Qué descubrió el Rover Opportunity de la NASA en Marte? · Parte 1',credit:'Producción y titular de derechos: por confirmar',note:'Historia divulgativa del rover Opportunity y sus descubrimientos.'},
    insight:{title:'Sonido real captado en Marte · Misión InSight',credit:'Astrum Español (identificado en el nombre del archivo); titular exacto por verificar',note:'No confundas audio procesado o sonificado con sonido transmitido por el vacío. Verificar fuentes del documental.'},
    ingenuity:{title:'Los martes de Marte: Un vistazo al helicóptero Ingenuity',credit:'Producción y titular de derechos: por confirmar',note:'Demostración y contexto histórico de los vuelos del helicóptero Ingenuity.'},
    dawn:{title:'La misión a Vesta y Ceres · La sonda Dawn de la NASA',credit:'Astrum (identificado en el nombre del archivo); titular exacto por verificar',note:'Relato divulgativo de la misión Dawn y su exploración de Vesta y Ceres.'},
    pioneer:{title:'Se cumplen 50 años del lanzamiento de la sonda Pioneer 10',credit:'Producción y titular de derechos: por confirmar',note:'Historia divulgativa del lanzamiento y del legado de Pioneer 10.'}
  };
  const URLS={};
  let started=false;
  const decks={};
  let currentView=''; let currentModule='';
  const safe=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function makeDeck(kind){
    const sec=document.createElement('section');sec.className='rvideos-box';sec.setAttribute('aria-label','Video documental del módulo');sec.dataset.rvideos=kind;
    sec.innerHTML=`
      <div class="rvideos-heading"><div><div class="rvideos-kicker">RECURSO AUDIOVISUAL · CONTENIDO DOCUMENTAL</div><h3>🎬 Video de la misión</h3></div><span class="rvideos-count">1 documental / módulo</span></div>
      <p class="rvideos-intro">Reproduce el material compartido por tu equipo sin salir del simulador. El video no sustituye los datos y fuentes oficiales de NASA.</p>
      <div class="rvideos-screen"><video controls playsinline preload="metadata" controlsList="noremoteplayback" aria-label="Video documental">Tu navegador no soporta video HTML5.</video></div>
      <p class="rvideos-title" data-video-title></p>
      <p class="rvideos-note" data-video-note></p>
      <details class="rvideos-rights" open><summary>© Créditos, derechos de autor y condiciones de uso</summary>
        <p><strong>Crédito:</strong> <span data-video-credit></span>.</p>
        <p>Contenido aportado por un participante. Derechos reservados a sus legítimos titulares. Licencia y autorización de redistribución <strong>no verificadas</strong>. La atribución no sustituye un permiso de uso.</p>
        <p>Uso de prueba local. <strong>No publicar, redistribuir, subir a un repositorio abierto ni enviar estos MP4 como parte de la solución al NASA Space Apps Challenge</strong> sin una licencia compatible o permiso escrito del titular.</p>
      </details>
      <p class="rvideos-error" role="status" hidden>El archivo no está disponible. Extrae el ZIP completo y conserva juntas las carpetas <code>assets</code>, <code>posters</code> y <code>videos</code>.</p>
    `;
    const video=sec.querySelector('video');
    video.addEventListener('error',()=>{ const er=sec.querySelector('.rvideos-error');er.hidden=false; });
    video.addEventListener('loadedmetadata',()=>{ sec.querySelector('.rvideos-error').hidden=true; });
    decks[kind]={sec,video,loaded:null};
    return sec;
  }
  function setSource(deck,k){
    if(deck.loaded===k)return;
    deck.video.pause();deck.video.removeAttribute('src');deck.video.load();deck.loaded=null;
    if(!k)return;
    const item=MAP[k];if(!item)return;
    deck.sec.querySelector('[data-video-title]').textContent=item.title;
    deck.sec.querySelector('[data-video-note]').textContent=item.note;
    deck.sec.querySelector('[data-video-credit]').textContent=item.credit;
    deck.sec.querySelector('.rvideos-error').hidden=true;
    deck.video.setAttribute('poster',new URL(k+'.jpg',POSTER_DIR).href);
    deck.video.setAttribute('src',new URL(k+'.mp4',VIDEO_DIR).href);
    deck.video.load();deck.loaded=k;
  }
  function sync(){
    let st;try{st=window.RELICS10 && window.RELICS10.getState && window.RELICS10.getState()}catch(e){return}
    if(!st)return;
    const view=st.view, k=MAP[st.selection]?st.selection:'';
    if(view===currentView && k===currentModule)return;
    currentView=view;currentModule=k;
    for(const name of Object.keys(decks))setSource(decks[name],view===name?k:null);
  }
  function init(){
    if(started)return;
    const configSource=document.querySelector('#configSource');
    const simGame=document.querySelector('#simView .gameui');
    if(!configSource || !simGame || !window.RELICS10?.getState){return}
    started=true;
    configSource.insertAdjacentElement('afterend',makeDeck('config'));
    simGame.insertAdjacentElement('afterend',makeDeck('sim'));
    const views=['homeView','configView','simView','rankingView','legacyView','infoView','dataView'];
    for(const name of views){const el=document.getElementById(name);if(el){new MutationObserver(sync).observe(el,{attributes:true,attributeFilter:['class']})}}
    document.addEventListener('click',()=>queueMicrotask(sync));
    document.addEventListener('change',sync);
    document.addEventListener('keydown',()=>queueMicrotask(sync));
    window.addEventListener('pagehide',()=>{for(const d of Object.values(decks))d.video.pause()});
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
