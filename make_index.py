from pathlib import Path
import json,base64
r=Path(__file__).parent
p=r/'web/template.html';s=p.read_text()
css=(r/'web/styles.css').read_text();js=(r/'web/app.js').read_text();bank=(r/'docs/BANCO_PREGUNTAS_675.json').read_text()
assert '</script' not in js.lower() and '</script' not in bank.lower()
data=(r/'datos/alsep_derivado.json').read_text()
legacy=base64.b64encode((r/'web/arcade_9_original.html').read_bytes()).decode('ascii')
s=s.replace('/*INLINE_DATA*/',data).replace('/*INLINE_LEGACY*/',legacy)
s=s.replace('/*INLINE_CSS*/',css).replace('/*INLINE_BANK*/',bank).replace('/*INLINE_JS*/',js)
(r/'web/index.html').write_text(s,encoding='utf8')
(r/'index.html').write_text(s,encoding='utf8')
print('index.html',len(s),'characters')
