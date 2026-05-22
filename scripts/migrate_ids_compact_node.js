#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const SHEET_ID = process.argv[2] || 'REPLACE_WITH_SHEET_ID';
const USER_PROFILE = process.argv[3] || 'booking_workspace_full_bella';

function readProfileToken(profile) {
  const cfgPath = path.join(os.homedir(), '.clasprc.json');
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const tok = cfg.tokens && cfg.tokens[profile];
  if (!tok) throw new Error(`No existe token para perfil: ${profile}`);
  return tok;
}

async function getAccessToken(profile) {
  const tok = readProfileToken(profile);
  const body = new URLSearchParams({
    client_id: tok.client_id,
    client_secret: tok.client_secret,
    refresh_token: tok.refresh_token,
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

async function gapi(token, method, url, body) {
  const headers = { Authorization: `Bearer ${token}` };
  let raw;
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    raw = JSON.stringify(body);
  }
  const res = await fetch(url, { method, headers, body: raw });
  const txt = await res.text();
  const payload = txt ? JSON.parse(txt) : {};
  if (!res.ok) {
    throw new Error(`Google API error [${method} ${url}] -> ${txt}`);
  }
  return payload;
}

function pad3(n) {
  return String(n).padStart(3, '0');
}

function isCompact(id, prefix) {
  return new RegExp(`^${prefix}\\d+$`).test(String(id || '').trim());
}

function buildMap(rows, prefix, fallbackNameIndex) {
  const map = {};
  const nameMap = {};
  let counter = 0;
  for (const r of rows) {
    const oldId = String(r[0] || '').trim();
    const name = String(r[fallbackNameIndex] || '').trim();
    if (!oldId && !name) continue;
    counter += 1;
    const newId = `${prefix}${pad3(counter)}`;
    if (oldId) map[oldId] = newId;
    if (name) nameMap[name.toLowerCase()] = newId;
    r[0] = newId;
  }
  return { map, nameMap, total: counter };
}

async function main() {
  const token = await getAccessToken(USER_PROFILE);
  const [auxBandasResp, auxConcResp, segResp, metaResp] = await Promise.all([
    gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/AUX_BANDAS!A1:H`),
    gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/AUX_CONCURSOS!A1:J`),
    gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/SEGUIMIENTO!A1:U`),
    gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets(properties(sheetId,title))`),
  ]);

  const auxBandas = auxBandasResp.values || [];
  const auxConc = auxConcResp.values || [];
  const seguimiento = segResp.values || [];
  if (auxBandas.length < 2 || auxConc.length < 2 || seguimiento.length < 2) {
    throw new Error('Faltan datos en AUX_BANDAS/AUX_CONCURSOS/SEGUIMIENTO para migrar IDs.');
  }

  const auxBandasBody = auxBandas.slice(1);
  const auxConcBody = auxConc.slice(1);
  const segBody = seguimiento.slice(1);

  const bandMapPack = buildMap(auxBandasBody, 'B', 1);
  const concMapPack = buildMap(auxConcBody, 'C', 1);

  for (const r of segBody) {
    while (r.length < 21) r.push('');
    const oldBand = String(r[1] || '').trim();
    const oldConc = String(r[4] || '').trim();
    const bandName = String(r[2] || '').trim().toLowerCase();
    const concName = String(r[5] || '').trim().toLowerCase();

    let newBand = bandMapPack.map[oldBand] || '';
    let newConc = concMapPack.map[oldConc] || '';
    if (!newBand && bandName) newBand = bandMapPack.nameMap[bandName] || '';
    if (!newConc && concName) newConc = concMapPack.nameMap[concName] || '';

    if (!newBand && oldBand && isCompact(oldBand, 'B')) newBand = oldBand;
    if (!newConc && oldConc && isCompact(oldConc, 'C')) newConc = oldConc;

    r[1] = newBand || oldBand;
    r[4] = newConc || oldConc;
    if (r[1] && r[4]) r[0] = `R_${r[1]}_${r[4]}`;
  }

  await gapi(
    token,
    'POST',
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`,
    {
      valueInputOption: 'RAW',
      data: [
        { range: `AUX_BANDAS!A1:H${auxBandasBody.length + 1}`, values: [auxBandas[0], ...auxBandasBody] },
        { range: `AUX_CONCURSOS!A1:J${auxConcBody.length + 1}`, values: [auxConc[0], ...auxConcBody] },
        { range: `SEGUIMIENTO!A1:U${segBody.length + 1}`, values: [seguimiento[0], ...segBody] },
      ],
    }
  );

  const seguimientoSheetId = (metaResp.sheets || []).find((s) => s.properties.title === 'SEGUIMIENTO')?.properties?.sheetId;
  if (Number.isFinite(seguimientoSheetId)) {
    await gapi(
      token,
      'POST',
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
      {
        requests: [
          {
            updateDimensionProperties: {
              range: { sheetId: seguimientoSheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 2 },
              properties: { hiddenByUser: true },
              fields: 'hiddenByUser',
            },
          },
          {
            updateDimensionProperties: {
              range: { sheetId: seguimientoSheetId, dimension: 'COLUMNS', startIndex: 4, endIndex: 5 },
              properties: { hiddenByUser: true },
              fields: 'hiddenByUser',
            },
          },
        ],
      }
    );
  }

  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        totalBandasMapeadas: bandMapPack.total,
        totalConcursosMapeados: concMapPack.total,
        totalSeguimientoFilas: segBody.length,
      },
      null,
      2
    ) + '\n'
  );
}

main().catch((err) => {
  process.stderr.write(`${err && err.stack ? err.stack : String(err)}\n`);
  process.exit(1);
});

