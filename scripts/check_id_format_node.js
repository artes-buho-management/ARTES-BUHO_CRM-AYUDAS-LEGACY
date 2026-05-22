#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const SHEET_ID = process.argv[2] || 'REPLACE_WITH_SHEET_ID';
const USER_PROFILE = process.argv[3] || 'booking_workspace_full_bella';

function readToken(profile) {
  const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.clasprc.json'), 'utf8'));
  const t = cfg.tokens && cfg.tokens[profile];
  if (!t) throw new Error(`No token for profile ${profile}`);
  return t;
}

async function getAccessToken(profile) {
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
  const p = await res.json();
  if (!res.ok || !p.access_token) throw new Error(JSON.stringify(p));
  return p.access_token;
}

async function gapi(token, method, url) {
  const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
  const txt = await res.text();
  const payload = txt ? JSON.parse(txt) : {};
  if (!res.ok) throw new Error(txt);
  return payload;
}

async function main() {
  const token = await getAccessToken(USER_PROFILE);
  const [auxB, auxC, seg] = await Promise.all([
    gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/AUX_BANDAS!A2:A10`),
    gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/AUX_CONCURSOS!A2:A10`),
    gapi(token, 'GET', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/SEGUIMIENTO!A2:E10`),
  ]);

  const out = {
    bandasIdsSample: (auxB.values || []).map((r) => r[0]),
    concursosIdsSample: (auxC.values || []).map((r) => r[0]),
    seguimientoIdsSample: (seg.values || []).map((r) => ({ idRelacion: r[0], idBanda: r[1], idConcurso: r[4] })),
  };
  process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err && err.stack ? err.stack : String(err)}\n`);
  process.exit(1);
});

