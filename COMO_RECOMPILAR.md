# Reconstruir el visor 3D de RELICS

El archivo `web/assets/relics10-lab3d.js` **ya está compilado**, incluye Three.js y los bytes del GLB de satélite. No necesitas Node.js para abrir o presentar RELICS.

Si deseas modificar el código fuente del laboratorio, desde la **raíz del proyecto** instala Node.js 18+ y ejecuta:

```bash
npm install --no-save three@0.181.2 esbuild@0.25.12
npx esbuild fuentes_lab3d/lab3d-entry.js --bundle --format=iife --platform=browser --target=es2020 --loader:.glb=dataurl --outfile=web/assets/relics10-lab3d.js
```

Si quieres volver a convertir **el archivo STEP del satélite**, instala también las dependencias CAD y ejecuta:

```bash
npm install --no-save occt-import-js@0.0.23 @gltf-transform/core@4.5.1
node fuentes_lab3d/step_to_glb.cjs
```

Después de modificar el visor, copia `web/assets/relics10-lab3d.js` y `web/assets/relics10-lab3d.css` a `android/RELICS-Android/app/src/main/assets/web/assets/` antes de compilar la aplicación móvil.

**Derechos:** Three.js se distribuye bajo licencia MIT (ver `docs/TERCEROS_THREEJS_LICENSE.txt`). El archivo STEP corresponde a contenido externo cuya autorización de redistribución pública hay que verificar; véase `docs/LABORATORIO_3D_Y_DERECHOS.md`.
