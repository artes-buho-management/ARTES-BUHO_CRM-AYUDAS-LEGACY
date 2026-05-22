#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const SHEET_ID = process.argv[2] || 'REPLACE_WITH_SHEET_ID';
const USER_PROFILE = process.argv[3] || 'booking_workspace_full_bella';

const COLORS = {
  red: { red: 0.784, green: 0.063, blue: 0.18 },        // #C8102E
  redDark: { red: 0.541, green: 0.063, blue: 0.141 },   // #8A1024
  yellow: { red: 1, green: 0.824, blue: 0 },            // #FFD200
  yellowLight: { red: 1, green: 0.957, blue: 0.702 },   // #FFF4B3
  white: { red: 1, green: 1, blue: 1 },
  redLight: { red: 0.973, green: 0.843, blue: 0.871 },  // #F8D7DE
};

function readToken(profile) {
  const cfgPath = path.join(os.homedir(), '.clasprc.json');
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const t = cfg.tokens && cfg.tokens[profile];
  if (!t) throw new Error(`No existe token para perfil: ${profile}`);
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
  const payload = await res.json();
  if (!res.ok || !payload.access_token) throw new Error(JSON.stringify(payload));
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
  if (!res.ok) throw new Error(`Google API error [${method} ${url}] -> ${txt}`);
  return payload;
}

function sheetIdByTitle(meta, title) {
  const s = (meta.sheets || []).find((x) => x.properties && x.properties.title === title);
  return s ? s.properties.sheetId : null;
}

function headerFormat(bg, fg) {
  return {
    userEnteredFormat: {
      backgroundColor: bg,
      textFormat: { bold: true, foregroundColor: fg },
    },
  };
}

async function main() {
  const token = await getAccessToken(USER_PROFILE);
  const meta = await gapi(
    token,
    'GET',
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets(properties(sheetId,title),conditionalFormats)`
  );

  const seguimientoId = sheetIdByTitle(meta, 'SEGUIMIENTO');
  const dashboardId = sheetIdByTitle(meta, 'DASHBOARD');
  const catalogosId = sheetIdByTitle(meta, 'CATALOGOS');
  const logId = sheetIdByTitle(meta, 'LOG_CAMBIOS');
  const auxBandasId = sheetIdByTitle(meta, 'AUX_BANDAS');
  const auxConcursosId = sheetIdByTitle(meta, 'AUX_CONCURSOS');

  if (!seguimientoId || !dashboardId) {
    throw new Error('No se encontraron hojas SEGUIMIENTO/DASHBOARD.');
  }

  const dashboardValues = await gapi(
    token,
    'GET',
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/DASHBOARD!A1:G300`
  );
  const dRows = dashboardValues.values || [];
  let resumenConcursoRow = 0;
  for (let i = 0; i < dRows.length; i++) {
    if (String((dRows[i] && dRows[i][0]) || '').trim().toUpperCase() === 'RESUMEN POR CONCURSO') {
      resumenConcursoRow = i + 1;
      break;
    }
  }

  const seguimientoMeta = (meta.sheets || []).find((s) => s.properties && s.properties.sheetId === seguimientoId);
  const condCount = (seguimientoMeta && seguimientoMeta.conditionalFormats && seguimientoMeta.conditionalFormats.length) || 0;

  const requests = [];

  for (let i = condCount - 1; i >= 0; i--) {
    requests.push({ deleteConditionalFormatRule: { sheetId: seguimientoId, index: i } });
  }

  requests.push(
    {
      repeatCell: {
        range: { sheetId: seguimientoId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 },
        cell: headerFormat(COLORS.red, COLORS.white),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
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
      addConditionalFormatRule: {
        index: 0,
        rule: {
          ranges: [{ sheetId: seguimientoId, startRowIndex: 1, startColumnIndex: 0, endColumnIndex: 21 }],
          booleanRule: {
            condition: { type: 'CUSTOM_FORMULA', values: [{ userEnteredValue: '=OR($L2="GANADA";$L2="FINALISTA")' }] },
            format: { backgroundColor: COLORS.yellow, textFormat: { foregroundColor: COLORS.redDark } },
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
            format: { backgroundColor: COLORS.yellowLight, textFormat: { foregroundColor: COLORS.redDark } },
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
            format: { backgroundColor: COLORS.white, textFormat: { foregroundColor: COLORS.redDark } },
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
            format: { backgroundColor: COLORS.redLight, textFormat: { foregroundColor: COLORS.redDark } },
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
            format: { backgroundColor: COLORS.white, textFormat: { foregroundColor: COLORS.redDark } },
          },
        },
      },
    },
    {
      repeatCell: {
        range: { sheetId: dashboardId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 7 },
        cell: headerFormat(COLORS.red, COLORS.white),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    },
    {
      repeatCell: {
        range: { sheetId: dashboardId, startRowIndex: 9, endRowIndex: 10, startColumnIndex: 0, endColumnIndex: 1 },
        cell: headerFormat(COLORS.red, COLORS.white),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    },
    {
      repeatCell: {
        range: { sheetId: dashboardId, startRowIndex: 10, endRowIndex: 11, startColumnIndex: 0, endColumnIndex: 7 },
        cell: headerFormat(COLORS.yellow, COLORS.redDark),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    }
  );

  if (resumenConcursoRow > 0) {
    requests.push(
      {
        repeatCell: {
          range: { sheetId: dashboardId, startRowIndex: resumenConcursoRow - 1, endRowIndex: resumenConcursoRow, startColumnIndex: 0, endColumnIndex: 1 },
          cell: headerFormat(COLORS.red, COLORS.white),
          fields: 'userEnteredFormat(backgroundColor,textFormat)',
        },
      },
      {
        repeatCell: {
          range: { sheetId: dashboardId, startRowIndex: resumenConcursoRow, endRowIndex: resumenConcursoRow + 1, startColumnIndex: 0, endColumnIndex: 5 },
          cell: headerFormat(COLORS.yellow, COLORS.redDark),
          fields: 'userEnteredFormat(backgroundColor,textFormat)',
        },
      }
    );
  }

  if (catalogosId) {
    requests.push({
      repeatCell: {
        range: { sheetId: catalogosId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 4 },
        cell: headerFormat(COLORS.red, COLORS.white),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    });
  }
  if (logId) {
    requests.push({
      repeatCell: {
        range: { sheetId: logId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 7 },
        cell: headerFormat(COLORS.red, COLORS.white),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    });
  }
  if (auxBandasId) {
    requests.push({
      repeatCell: {
        range: { sheetId: auxBandasId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 8 },
        cell: headerFormat(COLORS.red, COLORS.white),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    });
  }
  if (auxConcursosId) {
    requests.push({
      repeatCell: {
        range: { sheetId: auxConcursosId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 10 },
        cell: headerFormat(COLORS.red, COLORS.white),
        fields: 'userEnteredFormat(backgroundColor,textFormat)',
      },
    });
  }

  await gapi(
    token,
    'POST',
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`,
    { requests }
  );

  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        appliedRequests: requests.length,
        resumenConcursoRow,
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

