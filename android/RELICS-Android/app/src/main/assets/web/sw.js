const CACHE = 'relics-8-core-v2';
const SHELL=['./','./index.html','./defensa.html','./defensa.css','./defensa-core.js','./defensa.js','./styles.css','./app.js','./missions.js','./manifest.webmanifest','./assets/icon.svg','./modulos/eagle.html','./modulos/lrv.html','./modulos/alsep.html',...Array.from({length:9},(_,i)=>'./audio/audio_'+String(i+1).padStart(2,'0')+'.mp3')];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(url.origin===self.location.origin){e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const z=r.clone();caches.open(CACHE).then(c=>c.put(e.request,z));return r})));return}
 if(/^https:\/\//.test(url.href)&&(/nasa\.gov$/.test(url.hostname)||url.hostname.endsWith('.nasa.gov'))){e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request,{mode:'no-cors'}).then(r=>{if(r.ok||r.type==='opaque')caches.open(CACHE).then(cache=>cache.put(e.request,r.clone()));return r}).catch(()=>Response.error())))}
});
