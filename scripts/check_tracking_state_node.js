#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const SHEET_ID = process.argv[2] || 'REPLACE_WITH_SHEET_ID';
const USER_PROFILE = process.argv[3] || 'booking_workspace_full_bella';

function readToken(profile) {
  const cfgPath = path.join(os.homedir(), '.clasprc.json');
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const t = cfg.tokens && cfg.tokens[profile];
  if (!t) throw new Error(`No existe token para perfil ${profile}`);
  return t;
}

async function accessToken(profile) {
  const t = readToken(profile);
  const body = new URLSearchParams({
    client_id: t.client_id,
    client_secret: t.client_secret,
    refresh_token: t.refresh_token,
    grant_type: 'refresh_token',
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const payload = await res.json();
  if (!res.ok || !payload.access_token) {
    throw new Error(`No se pudo obtener token: ${JSON.stringify(payload)}`);
  }
  return payload.access_token;
}

async function gapi(token, method, url) {
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
  });
  const txt = await res.text();
  const payload = txt ? JSON.parse(txt) : {};
  if (!res.ok) {
    throw new Error(`Google API error [${method} ${url}] -> ${txt}`);
  }
  return payload;
}

async function main() {
  const token = await accessToken(USER_PROFILE);
  const meta = await gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=properties.title,sheets(properties(title,hidden))`);
  const seguimiento = await gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/SEGUIMIENTO!A2:U`);
  const bandas = await gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/BANDAS!A2:C`);
  const concursos = await gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/CONCURSOS!A2:Q`);

  const segRows = seguimiento.values || [];
  const pairSeen = new Set();
  let dupes = 0;
  for (const r of segRows) {
    const key = `${String(r[1] || '').trim()}__${String(r[4] || '').trim()}`;
    if (!key || key === '__') continue;
    if (pairSeen.has(key)) {
      dupes++;
    } else {
      pairSeen.add(key);
    }
  }

  const output = {
    spreadsheetTitle: meta.properties && meta.properties.title,
    requiredSheets: (meta.sheets || []).map((s) => ({ title: s.properties.title, hidden: !!s.properties.hidden })),
    totalBandas: (bandas.values || []).filter((r) => String(r[0] || '').trim() !== '').length,
    totalConcursos: (concursos.values || []).filter((r) => String(r[0] || '').trim() !== '').length,
    totalSeguimientoRows: segRows.length,
    uniquePairs: pairSeen.size,
    duplicatePairs: dupes,
  };
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err && err.stack ? err.stack : String(err)}\n`);
  process.exit(1);
});

