#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const SHEET_ID = process.argv[2] || 'REPLACE_WITH_SHEET_ID';
const USER_PROFILE = process.argv[3] || 'booking_workspace_full_bella';

function normalizeKey(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, '_');
}

function sanitizeCell(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[\u0000-\u001f]/g, ' ').trim();
}

function stableId(prefix, raw) {
  const digest = crypto.createHash('sha256').update(String(raw), 'utf8').digest('base64url');
  return `${prefix}_${digest.slice(0, 20)}`;
}

function nowIsoLocal() {
  const d = new Date();
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function readClaspTokens() {
  const cfgPath = path.join(os.homedir(), '.clasprc.json');
  if (!fs.existsSync(cfgPath)) {
    throw new Error(`No existe ${cfgPath}`);
  }
  return JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
}

async function getAccessToken(profile) {
  const cfg = readClaspTokens();
  const token = cfg.tokens && cfg.tokens[profile];
  if (!token) {
    throw new Error(`No existe token para perfil '${profile}' en .clasprc.json`);
  }
  const body = new URLSearchParams({
    client_id: token.client_id,
    client_secret: token.client_secret,
    refresh_token: token.refresh_token,
    grant_type: 'refresh_token',
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const payload = await res.json();
  if (!res.ok || !payload.access_token) {
    throw new Error(`No se pudo obtener access_token: ${JSON.stringify(payload)}`);
  }
  return payload.access_token;
}

async function gapi(accessToken, method, url, body) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  let rawBody = undefined;
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    rawBody = JSON.stringify(body);
  }
  const res = await fetch(url, { method, headers, body: rawBody });
  const txt = await res.text();
  const payload = txt ? JSON.parse(txt) : {};
  if (!res.ok) {
    throw new Error(`Google API error [${method} ${url}] -> ${txt}`);
  }
  return payload;
}

function sheetMapFromMeta(meta) {
  const out = {};
  for (const s of (meta.sheets || [])) {
    out[s.properties.title] = s.properties;
  }
  return out;
}

async function ensureSheets(accessToken) {
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets(properties(sheetId,title,index,hidden,gridProperties(rowCount,columnCount)))`;
  let meta = await gapi(accessToken, 'GET', metaUrl);
  let map = sheetMapFromMeta(meta);

  const required = [
    { name: 'SEGUIMIENTO', rows: 3000, cols: 21, hidden: false },
    { name: 'DASHBOARD', rows: 3000, cols: 12, hidden: false },
    { name: 'CATALOGOS', rows: 300, cols: 6, hidden: false },
    { name: 'LOG_CAMBIOS', rows: 3000, cols: 7, hidden: false },
    { name: 'AUX_BANDAS', rows: 3000, cols: 8, hidden: true },
    { name: 'AUX_CONCURSOS', rows: 3000, cols: 10, hidden: true },
  ];

  const addRequests = [];
  for (const s of required) {
    if (map[s.name]) continue;
    addRequests.push({
      addSheet: {
        properties: {
          title: s.name,
          hidden: s.hidden,
          gridProperties: {
            rowCount: s.rows,
            columnCount: s.cols,
            frozenRowCount: 1,
          },
        },
      },
    });
  }

  if (addRequests.length > 0) {
    await gapi(
      accessToken,
      'POST',
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
      { requests: addRequests }
    );
    meta = await gapi(accessToken, 'GET', metaUrl);
    map = sheetMapFromMeta(meta);
  }

  return { map, created: addRequests.length };
}

async function readMasterRows(accessToken) {
  const [bandasResp, concursosResp] = await Promise.all([
    gapi(accessToken, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/BANDAS!A2:C`),
    gapi(accessToken, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/CONCURSOS!A2:Q`),
  ]);
  return {
    bandasRows: bandasResp.values || [],
    concursosRows: concursosResp.values || [],
  };
}

function buildDomainRows(bandasRows, concursosRows, now) {
  const bandas = [];
  const auxBandas = [];
  let bandaCounter = 0;
  for (const r of bandasRows) {
    const banda = sanitizeCell(r[0] || '');
    if (!banda) continue;
    bandaCounter += 1;
    const email = sanitizeCell(r[1] || '');
    const nameKey = normalizeKey(banda);
    const fullKey = `${nameKey}|${normalizeKey(email)}`;
    const idBanda = `B${String(bandaCounter).padStart(3, '0')}`;
    bandas.push({ id: idBanda, name: banda, email });
    auxBandas.push([idBanda, banda, email, nameKey, fullKey, true, now, now]);
  }

  const concursos = [];
  const auxConcursos = [];
  let concursoCounter = 0;
  for (const r of concursosRows) {
    const nombre = sanitizeCell(r[0] || '');
    if (!nombre) continue;
    concursoCounter += 1;
    const inscripcion = sanitizeCell(r[2] || '');
    const fechaLimite = sanitizeCell(r[3] || '');
    const link = sanitizeCell(r[11] || '');
    const nameKey = normalizeKey(nombre);
    const fullKey = `${nameKey}|${normalizeKey(link)}`;
    const idConcurso = `C${String(concursoCounter).padStart(3, '0')}`;
    concursos.push({
      id: idConcurso,
      name: nombre,
      inscripcion,
      fechaLimite,
      link,
    });
    auxConcursos.push([idConcurso, nombre, link, inscripcion, fechaLimite, nameKey, fullKey, true, now, now]);
  }

  const seguimiento = [];
  for (const b of bandas) {
    for (const c of concursos) {
      const idRel = `R_${b.id}_${c.id}`;
      seguimiento.push([
        idRel,
        b.id,
        b.name,
        b.email,
        c.id,
        c.name,
        c.inscripcion,
        c.fechaLimite,
        c.link,
        'REVISAR',
        'MEDIA',
        'NO REVISADO',
        false,
        '',
        '',
        'SIN RESULTADO',
        '',
        '',
        '',
        now,
        now,
      ]);
    }
  }

  return { bandas, concursos, auxBandas, auxConcursos, seguimiento };
}

function buildDashboard(bandas, concursos, seguimiento) {
  const abiertas = seguimiento.filter((r) => String(r[6] || '').toUpperCase() === 'ABIERTA').length;
  const out = [];
  out.push(['DASHBOARD SEGUIMIENTO BANDAS VS CONCURSOS']);
  out.push(['KPI GLOBAL', 'VALOR']);
  out.push(['Total bandas', bandas.length]);
  out.push(['Total concursos', concursos.length]);
  out.push(['Total relaciones', seguimiento.length]);
  out.push(['Total presentadas', 0]);
  out.push(['Total pendientes', seguimiento.length]);
  out.push(['Total ganadas', 0]);
  out.push(['Total abiertas no presentadas', abiertas]);
  out.push(['']);

  out.push(['RESUMEN POR BANDA']);
  out.push(['BANDA', 'ABIERTAS', 'PRESENTADAS', 'PENDIENTES', 'GANADAS', 'NO PRESENTADAS', 'TOTAL']);
  for (const b of bandas) {
    const abiertasB = concursos.filter((c) => String(c.inscripcion || '').toUpperCase() === 'ABIERTA').length;
    out.push([b.name, abiertasB, 0, concursos.length, 0, concursos.length, concursos.length]);
  }
  out.push(['']);
  out.push(['RESUMEN POR CONCURSO']);
  out.push(['CONCURSO', 'EN SEGUIMIENTO', 'PRESENTADAS', 'PENDIENTES', 'GANADAS']);
  for (const c of concursos) {
    out.push([c.name, bandas.length, 0, bandas.length, 0]);
  }
  return out;
}

async function writeValues(accessToken, data) {
  await gapi(
    accessToken,
    'POST',
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchClear`,
    {
      ranges: [
        'SEGUIMIENTO!A:U',
        'DASHBOARD!A:Z',
        'CATALOGOS!A:Z',
        'LOG_CAMBIOS!A:Z',
        'AUX_BANDAS!A:Z',
        'AUX_CONCURSOS!A:Z',
      ],
    }
  );

  await gapi(
    accessToken,
    'POST',
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
    {
      valueInputOption: 'RAW',
      data,
    }
  );
}

async function applyFormatting(accessToken, map, seguimientoRowCount, dashboardRowCount) {
  const seguimientoId = map.SEGUIMIENTO.sheetId;
  const dashboardId = map.DASHBOARD.sheetId;
  const catalogosId = map.CATALOGOS.sheetId;
  const logId = map.LOG_CAMBIOS.sheetId;
  const auxBandasId = map.AUX_BANDAS.sheetId;
  const auxConcursosId = map.AUX_CONCURSOS.sheetId;

  const requests = [
    {
      repeatCell: {
        range: { sheetId: seguimientoId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.784, green: 0.063, blue: 0.18 },
            textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
          },
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    },
    {
      setBasicFilter: {
        filter: {
          range: {
            sheetId: seguimientoId,
            startRowIndex: 0,
            endRowIndex: Math.max(seguimientoRowCount, 2),
            startColumnIndex: 0,
            endColumnIndex: 21,
          },
        },
      },
    },
    {
      updateDimensionProperties: {
        range: { sheetId: seguimientoId, dimension: 'COLUMNS', startIndex: 0, endIndex: 2 },
        properties: { hiddenByUser: true },
        fields: 'hiddenByUser',
      },
    },
    {
      updateDimensionProperties: {
        range: { sheetId: seguimientoId, dimension: 'COLUMNS', startIndex: 4, endIndex: 5 },
        properties: { hiddenByUser: true },
        fields: 'hiddenByUser',
      },
    },
    {
      repeatCell: {
        range: { sheetId: dashboardId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 7 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.784, green: 0.063, blue: 0.18 },
            textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
          },
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    },
    { updateSheetProperties: { properties: { sheetId: auxBandasId, hidden: true }, fields: 'hidden' } },
    { updateSheetProperties: { properties: { sheetId: auxConcursosId, hidden: true }, fields: 'hidden' } },
    { updateSheetProperties: { properties: { sheetId: catalogosId, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
    { updateSheetProperties: { properties: { sheetId: logId, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
    { updateSheetProperties: { properties: { sheetId: dashboardId, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
    { updateSheetProperties: { properties: { sheetId: seguimientoId, gridProperties: { frozenRowCount: 1 } }, fields: 'gridProperties.frozenRowCount' } },
    {
      setDataValidation: {
        range: { sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 9, endColumnIndex: 10 },
        rule: { condition: { type: 'ONE_OF_RANGE', values: [{ userEnteredValue: '=CATALOGOS!A2:A4' }] }, showCustomUi: true, strict: true },
      },
    },
    {
      setDataValidation: {
        range: { sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 10, endColumnIndex: 11 },
        rule: { condition: { type: 'ONE_OF_RANGE', values: [{ userEnteredValue: '=CATALOGOS!B2:B4' }] }, showCustomUi: true, strict: true },
      },
    },
    {
      setDataValidation: {
        range: { sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 11, endColumnIndex: 12 },
        rule: { condition: { type: 'ONE_OF_RANGE', values: [{ userEnteredValue: '=CATALOGOS!C2:C13' }] }, showCustomUi: true, strict: true },
      },
    },
    {
      setDataValidation: {
        range: { sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 15, endColumnIndex: 16 },
        rule: { condition: { type: 'ONE_OF_RANGE', values: [{ userEnteredValue: '=CATALOGOS!D2:D6' }] }, showCustomUi: true, strict: true },
      },
    },
    {
      addConditionalFormatRule: {
        index: 0,
        rule: {
          ranges: [{ sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 }],
          booleanRule: {
            condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=$L2="GANADA"' }] },
            format: { backgroundColor: { red: 1, green: 0.824, blue: 0 } },
          },
        },
      },
    },
    {
      addConditionalFormatRule: {
        index: 1,
        rule: {
          ranges: [{ sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 }],
          booleanRule: {
            condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=OR($L2="PRESENTADA";$L2="EN ESPERA")' }] },
            format: { backgroundColor: { red: 1, green: 0.957, blue: 0.702 } },
          },
        },
      },
    },
    {
      addConditionalFormatRule: {
        index: 2,
        rule: {
          ranges: [{ sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 }],
          booleanRule: {
            condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=OR($L2="PREPARANDO";$L2="PENDIENTE DOCUMENTACION")' }] },
            format: { backgroundColor: { red: 1, green: 1, blue: 1 } },
          },
        },
      },
    },
    {
      addConditionalFormatRule: {
        index: 3,
        rule: {
          ranges: [{ sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 }],
          booleanRule: {
            condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=OR($L2="NO SELECCIONADA";$L2="CANCELADA")' }] },
            format: { backgroundColor: { red: 0.973, green: 0.843, blue: 0.871 } },
          },
        },
      },
    },
    {
      addConditionalFormatRule: {
        index: 4,
        rule: {
          ranges: [{ sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 }],
          booleanRule: {
            condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=$L2="NO APLICA"' }] },
            format: { backgroundColor: { red: 1, green: 1, blue: 1 } },
          },
        },
      },
    },
  ];

  await gapi(
    accessToken,
    'POST',
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
    { requests }
  );

  void dashboardRowCount;
}

async function main() {
  const now = nowIsoLocal();
  const accessToken = await getAccessToken(USER_PROFILE);
  const ensured = await ensureSheets(accessToken);
  const { bandasRows, concursosRows } = await readMasterRows(accessToken);
  const built = buildDomainRows(bandasRows, concursosRows, now);

  const headersSeguimiento = [
    'ID_RELACION', 'ID_BANDA', 'BANDA', 'EMAIL_BANDA', 'ID_CONCURSO', 'CONCURSO',
    'INSCRIPCION_ACTUAL', 'FECHA_LIMITE', 'LINK_FORMULARIO', 'ENCAJE', 'PRIORIDAD',
    'ESTADO_SOLICITUD', 'PRESENTADA', 'FECHA_PRESENTACION', 'FECHA_RESOLUCION',
    'RESULTADO', 'RESPONSABLE', 'EVIDENCIA_URL', 'NOTAS', 'ULTIMA_ACTUALIZACION', 'CREADO_EN',
  ];
  const headersAuxBandas = ['ID_BANDA', 'BANDA', 'EMAIL', 'NAME_KEY', 'FULL_KEY', 'ACTIVO', 'CREATED_AT', 'LAST_SEEN'];
  const headersAuxConcursos = ['ID_CONCURSO', 'CONCURSO', 'LINK_BASES', 'INSCRIPCION_ACTUAL', 'FECHA_LIMITE', 'NAME_KEY', 'FULL_KEY', 'ACTIVO', 'CREATED_AT', 'LAST_SEEN'];
  const headersLog = ['FECHA', 'ACCION', 'DETALLE', 'ID_RELACION', 'ID_BANDA', 'ID_CONCURSO', 'USUARIO'];

  const catalogosValues = [
    ['ENCAJE', 'PRIORIDAD', 'ESTADO_SOLICITUD', 'RESULTADO'],
    ['REVISAR', 'ALTA', 'NO REVISADO', 'SIN RESULTADO'],
    ['SI', 'MEDIA', 'NO APLICA', 'FINALISTA'],
    ['NO', 'BAJA', 'VALORAR', 'GANADA'],
    ['', '', 'PREPARANDO', 'NO SELECCIONADA'],
    ['', '', 'PENDIENTE DOCUMENTACION', 'CANCELADA'],
    ['', '', 'PRESENTADA', ''],
    ['', '', 'SUBSANACION', ''],
    ['', '', 'EN ESPERA', ''],
    ['', '', 'FINALISTA', ''],
    ['', '', 'GANADA', ''],
    ['', '', 'NO SELECCIONADA', ''],
    ['', '', 'CANCELADA', ''],
  ];

  const dashboard = buildDashboard(built.bandas, built.concursos, built.seguimiento);
  const valuesData = [
    { range: 'CATALOGOS!A1:D13', values: catalogosValues },
    { range: `AUX_BANDAS!A1:H${built.auxBandas.length + 1}`, values: [headersAuxBandas, ...built.auxBandas] },
    { range: `AUX_CONCURSOS!A1:J${built.auxConcursos.length + 1}`, values: [headersAuxConcursos, ...built.auxConcursos] },
    { range: `SEGUIMIENTO!A1:U${built.seguimiento.length + 1}`, values: [headersSeguimiento, ...built.seguimiento] },
    { range: 'LOG_CAMBIOS!A1:G2', values: [headersLog, [now, 'BOOTSTRAP', 'Implantacion inicial seguimiento', '', '', '', 'booking@artesbuhomanagement.com']] },
    { range: `DASHBOARD!A1:G${dashboard.length}`, values: dashboard },
  ];

  await writeValues(accessToken, valuesData);
  await applyFormatting(accessToken, ensured.map, built.seguimiento.length + 1, dashboard.length);

  const summary = {
    ok: true,
    spreadsheet_id: SHEET_ID,
    sheets_created: ensured.created,
    total_bandas: built.bandas.length,
    total_concursos: built.concursos.length,
    total_relaciones: built.seguimiento.length,
    expected_relaciones: built.bandas.length * built.concursos.length,
  };
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err && err.stack ? err.stack : String(err)}\n`);
  process.exit(1);
});
