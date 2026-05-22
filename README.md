# CRM-AYUDAS

Implantacion de seguimiento `banda x concurso` para Google Sheets + Apps Script, sin tocar el flujo legado de envio.

## Estado actual (2026-03-26 Europe/Madrid)

- Google OK: `booking@artesbuhomanagement.com`
- Perfil clasp OK: `booking_workspace_full_bella`
- Hoja dev objetivo OK: `1RFdFlMjdVPIeQNf4tfVF8yZV3rnwRW_vt9hokKqexFk`
- GitHub OK: repo `rubencoton/CRM-AYUDAS`

## Arquitectura implantada

Fuente de verdad principal: hoja `SEGUIMIENTO`.
Paleta corporativa aplicada en hojas nuevas: rojo + amarillo + blanco.

Hojas creadas:
- `SEGUIMIENTO`
- `DASHBOARD`
- `CATALOGOS`
- `LOG_CAMBIOS`
- `AUX_BANDAS` (oculta)
- `AUX_CONCURSOS` (oculta)

No se han modificado columnas en:
- `CONCURSOS` (A:Q)
- `BANDAS` (A:C)
- `CORREO`

## Resultado de carga inicial

- Bandas: `18`
- Concursos: `96`
- Relaciones creadas: `1728`
- Duplicados de pareja banda-concurso: `0`
- IDs tecnicos compactos: `B001`, `C001`, `R_B001_C001`
- Columnas de IDs ocultas en `SEGUIMIENTO` para vista limpia

## Codigo Apps Script

Carpeta: `apps_script_bound_1RFd/`
- `ActualizadorIA.js` (legacy + wrappers de menu/onEdit para seguimiento)
- `SeguimientoBandasConcursos.js` (modulo nuevo)
- `appsscript.json`

## Scripts de soporte

- `scripts/check_connections.ps1`
- `scripts/bootstrap_tracking_setup_node.js`
- `scripts/check_tracking_state_node.js`
- `scripts/migrate_ids_compact_node.js`
- `scripts/check_id_format_node.js`

## Validacion rapida

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check_connections.ps1
node .\scripts\check_tracking_state_node.js
```

## Rollback

1. Restaurar copia de hoja:
   - `BACKUP_20260326_132842_CRM-AYUDAS_DEV`
   - id `1R4Q8uFp7fXPiicEkDOlzowA6YprsDGQ7-w393DLqHq0`
2. Restaurar backup de Apps Script:
   - script backup id `14cabhp5NmeDoPNKLgxH9dbp0AZTzAXSMsW5xkWUeWoMRVaSu0jGCBsR6`
3. Volver a desplegar version estable previa del script vinculado si fuese necesario.
