"""Curación reproducible de la tabla 'Lunar Surface Experiments Package Arrays and Status' de NASA.
No es una API en tiempo real: la tabla fue transcrita y las duraciones se calculan desde fechas UTC explícitas.
"""
import csv,json,datetime,pathlib
root=pathlib.Path(__file__).parent
out=[]
for row in csv.DictReader((root/'nasa_alsep_curado.csv').open(encoding='utf-8')):
 a=datetime.date.fromisoformat(row['fecha_encendido_utc'])
 b=datetime.date.fromisoformat(row['fecha_apagado_utc']) if row['fecha_apagado_utc'] else None
 days=(b-a).days if b else None
 out.append({
  'apollo':int(row['apollo']),'conjunto':row['conjunto'],
  'encendido':row['fecha_encendido_utc'],'apagado':row['fecha_apagado_utc'] or None,
  'estado':row['estado_final'],'vida_diseno_dias':int(row['vida_diseno_dias']),
  'dias_calendario_hasta_apagado':days,
  'razon_duracion_diseno':round(days/int(row['vida_diseno_dias']),2) if days is not None else None,
  'downlink_mhz':float(row['downlink_mhz']),'uplink_mhz':float(row['uplink_mhz']),
  'fuente':row['fuente']})
(root/'alsep_derivado.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print('NASA ALSEP:',len(out),'estaciones; duraciones conocidas:',sum(r['dias_calendario_hasta_apagado'] is not None for r in out))
