/* Transformación local de una copia STEP aportada por el usuario a GLB.
   No sustituye ni modifica el STEP original. */
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const input = path.resolve(__dirname, '../cad_fuente/Product1.stp');
  const output = path.resolve(__dirname, '../web/models/satellite_grabcad.glb');
  const occt = await require('occt-import-js')();
  const result = occt.ReadStepFile(fs.readFileSync(input), null);
  if (!result.success || !result.meshes.length) throw new Error('No se pudo leer el archivo STEP original');
  const {Document, NodeIO} = await import('@gltf-transform/core');
  const doc = new Document();
  const scene = doc.createScene('GrabCAD Satellite Assembly');
  const buffer = doc.createBuffer();
  const name = 'SATELLITE · GrabCAD Product1.stp';
  const model = doc.createNode(name);
  scene.addChild(model);
  for (let i = 0; i < result.meshes.length; i++) {
    const m = result.meshes[i];
    const pos = new Float32Array(m.attributes.position.array);
    const indices = pos.length / 3 > 65535 ? new Uint32Array(m.index.array) : new Uint16Array(m.index.array);
    const mesh = doc.createMesh(m.name || `Pieza ${i + 1}`);
    const primitive = doc.createPrimitive()
      .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(pos).setBuffer(buffer))
      .setIndices(doc.createAccessor().setType('SCALAR').setArray(indices).setBuffer(buffer));
    if (m.attributes.normal?.array?.length === pos.length) {
      primitive.setAttribute('NORMAL', doc.createAccessor().setType('VEC3').setArray(new Float32Array(m.attributes.normal.array)).setBuffer(buffer));
    }
    const hex = m.color || [0.74, 0.78, 0.82];
    primitive.setMaterial(doc.createMaterial(`CAD material ${i}`).setBaseColorFactor([hex[0], hex[1], hex[2], 1]).setMetallicFactor(0.34).setRoughnessFactor(0.62).setDoubleSided(true));
    mesh.addPrimitive(primitive);
    model.addChild(doc.createNode(mesh.getName()).setMesh(mesh));
  }
  const binary = await new NodeIO().writeBinary(doc);
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, Buffer.from(binary));
  console.log(JSON.stringify({output, size:binary.byteLength, meshes:result.meshes.length, triangles:result.meshes.reduce((n,m)=>n+m.index.array.length/3,0)}));
}
main().catch(error => {console.error(error); process.exitCode=1;});
