const SB_CFG = Object.freeze({
  SHEETS: Object.freeze({
    CONCURSOS: 'CONCURSOS',
    BANDAS: 'BANDAS',
    CORREO: 'CORREO',
    SEGUIMIENTO: 'SEGUIMIENTO',
    DASHBOARD: 'DASHBOARD',
    CATALOGOS: 'CATALOGOS',
    LOG: 'LOG_CAMBIOS',
    AUX_BANDAS: 'AUX_BANDAS',
    AUX_CONCURSOS: 'AUX_CONCURSOS',
  }),
  HEADERS: Object.freeze({
    SEGUIMIENTO: [
      'ID_RELACION',
      'ID_BANDA',
      'BANDA',
      'EMAIL_BANDA',
      'ID_CONCURSO',
      'CONCURSO',
      'INSCRIPCION_ACTUAL',
      'FECHA_LIMITE',
      'LINK_FORMULARIO',
      'ENCAJE',
      'PRIORIDAD',
      'ESTADO_SOLICITUD',
      'PRESENTADA',
      'FECHA_PRESENTACION',
      'FECHA_RESOLUCION',
      'RESULTADO',
      'RESPONSABLE',
      'EVIDENCIA_URL',
      'NOTAS',
      'ULTIMA_ACTUALIZACION',
      'CREADO_EN',
    ],
    AUX_BANDAS: [
      'ID_BANDA',
      'BANDA',
      'EMAIL',
      'NAME_KEY',
      'FULL_KEY',
      'ACTIVO',
      'CREATED_AT',
      'LAST_SEEN',
    ],
    AUX_CONCURSOS: [
      'ID_CONCURSO',
      'CONCURSO',
      'LINK_BASES',
      'INSCRIPCION_ACTUAL',
      'FECHA_LIMITE',
      'NAME_KEY',
      'FULL_KEY',
      'ACTIVO',
      'CREATED_AT',
      'LAST_SEEN',
    ],
    LOG: ['FECHA', 'ACCION', 'DETALLE', 'ID_RELACION', 'ID_BANDA', 'ID_CONCURSO', 'USUARIO'],
  }),
  CATALOGS: Object.freeze({
    ENCAJE: ['REVISAR', 'SI', 'NO'],
    PRIORIDAD: ['ALTA', 'MEDIA', 'BAJA'],
    ESTADO_SOLICITUD: [
      'NO REVISADO',
      'NO APLICA',
      'VALORAR',
      'PREPARANDO',
      'PENDIENTE DOCUMENTACION',
      'PRESENTADA',
      'SUBSANACION',
      'EN ESPERA',
      'FINALISTA',
      'GANADA',
      'NO SELECCIONADA',
      'CANCELADA',
    ],
    RESULTADO: ['SIN RESULTADO', 'FINALISTA', 'GANADA', 'NO SELECCIONADA', 'CANCELADA'],
  }),
});

const SB_THEME = Object.freeze({
  RED: '#C8102E',
  RED_DARK: '#8A1024',
  RED_LIGHT: '#F8D7DE',
  YELLOW: '#FFD200',
  YELLOW_LIGHT: '#FFF4B3',
  WHITE: '#FFFFFF',
});

function syncBandasConcursos() {
  return sbSincronizarSeguimiento();
}

function sbSincronizarSeguimiento() {
  return sbRunWithLock_('sbSincronizarSeguimiento', function () {
    const ss = sbGetSpreadsheet_();
    const refs = sbEnsureStructure_(ss);
    const now = new Date();
    const logs = [];

    const bands = sbSyncAuxBandas_(refs.bandas, refs.auxBandas, now);
    const concursos = sbSyncAuxConcursos_(refs.concursos, refs.auxConcursos, now);
    const bandaIdMap = bands.idMap || {};
    const concursoIdMap = concursos.idMap || {};
    const activePairs = sbBuildActivePairs_(bands.active, concursos.active);

    const seguimientoSheet = refs.seguimiento;
    const expectedCols = SB_CFG.HEADERS.SEGUIMIENTO.length;
    const existingRows = sbReadRows_(seguimientoSheet, expectedCols);

    const pairUsed = {};
    const duplicates = [];
    const finalRows = [];

    for (let i = 0; i < existingRows.length; i++) {
      const row = existingRows[i];
      sbEnsureSeguimientoDefaults_(row);
      const rawIdBanda = sbSafeText_(row[1]);
      const rawIdConcurso = sbSafeText_(row[4]);
      const idBanda = bandaIdMap[rawIdBanda] || rawIdBanda;
      const idConcurso = concursoIdMap[rawIdConcurso] || rawIdConcurso;
      if (idBanda !== rawIdBanda) row[1] = idBanda;
      if (idConcurso !== rawIdConcurso) row[4] = idConcurso;
      if (idBanda && idConcurso) row[0] = sbBuildRelationId_(idBanda, idConcurso);
      const pairKey = idBanda && idConcurso ? `${idBanda}__${idConcurso}` : '';

      if (pairKey && activePairs[pairKey]) {
        if (pairUsed[pairKey]) {
          duplicates.push({ rowNumber: i + 2, pairKey: pairKey });
          continue;
        }

        const pair = activePairs[pairKey];
        pairUsed[pairKey] = true;
        row[0] = sbBuildRelationId_(idBanda, idConcurso);
        row[2] = pair.bandaName;
        row[3] = pair.bandaEmail;
        row[5] = pair.concursoName;
        row[6] = pair.inscripcionActual;
        row[7] = pair.fechaLimite;
        row[8] = pair.linkFormulario;
        if (!row[20]) row[20] = now;
        finalRows.push(row);
        continue;
      }

      if (pairKey && !sbSafeText_(row[18]).includes('[ORFANA]')) {
        row[18] = sbAppendNote_(row[18], `[ORFANA] ${Utilities.formatDate(now, ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss')}`);
        logs.push([now, 'MARCAR_ORFANA', 'Relacion sin maestro activo (se conserva historial)', row[0] || '', idBanda || '', idConcurso || '', sbCurrentUserEmail_()]);
      }

      finalRows.push(row);
    }

    let inserted = 0;
    Object.keys(activePairs).forEach(function (pairKey) {
      if (pairUsed[pairKey]) return;
      const pair = activePairs[pairKey];
      const newRow = sbBuildNewSeguimientoRow_(pair, now);
      finalRows.push(newRow);
      inserted++;
      logs.push([now, 'ALTA_RELACION', 'Relacion creada por sincronizacion', newRow[0], newRow[1], newRow[4], sbCurrentUserEmail_()]);
    });

    sbWriteBodyRows_(seguimientoSheet, finalRows, expectedCols);
    sbApplySeguimientoValidations_(seguimientoSheet, refs.catalogos);
    sbValidateSeguimientoDuplicates_(seguimientoSheet, false);
    sbAppendLogs_(refs.log, logs);
    sbRefrescarDashboard();

    const summary = {
      ok: true,
      bandsActive: bands.active.length,
      concursosActive: concursos.active.length,
      totalPairs: Object.keys(activePairs).length,
      inserted: inserted,
      duplicatesSkipped: duplicates.length,
      totalRows: finalRows.length,
    };

    sbToast_(ss, `SEGUIMIENTO sincronizado. Nuevas: ${summary.inserted}. Total: ${summary.totalRows}.`);
    return summary;
  });
}

function sbReconciliarDatos() {
  return sbRunWithLock_('sbReconciliarDatos', function () {
    const result = sbSincronizarSeguimiento();
    const dupe = sbValidarDuplicadosSeguimiento();
    return {
      ok: true,
      sync: result,
      duplicates: dupe,
    };
  });
}

function sbRefrescarDashboard() {
  return sbRunWithLock_('sbRefrescarDashboard', function () {
    const ss = sbGetSpreadsheet_();
    const refs = sbEnsureStructure_(ss);
    const rows = sbReadRows_(refs.seguimiento, SB_CFG.HEADERS.SEGUIMIENTO.length);

    const totals = {
      bandas: new Set(),
      concursos: new Set(),
      relaciones: 0,
      presentadas: 0,
      pendientes: 0,
      ganadas: 0,
      abiertasNoPresentadas: 0,
    };

    const byBanda = {};
    const byConcurso = {};

    rows.forEach(function (r) {
      const banda = sbSafeText_(r[2]);
      const concurso = sbSafeText_(r[5]);
      const estado = sbSafeText_(r[11]).toUpperCase();
      const inscripcion = sbSafeText_(r[6]).toUpperCase();
      const resultado = sbSafeText_(r[15]).toUpperCase();
      const presentada = sbToBool_(r[12]);

      if (!banda || !concurso) return;

      totals.relaciones++;
      totals.bandas.add(banda);
      totals.concursos.add(concurso);
      if (presentada) totals.presentadas++;
      if (sbIsPendingState_(estado)) totals.pendientes++;
      if (estado === 'GANADA' || resultado === 'GANADA') totals.ganadas++;
      if (inscripcion === 'ABIERTA' && !presentada) totals.abiertasNoPresentadas++;

      if (!byBanda[banda]) {
        byBanda[banda] = { banda: banda, abiertas: 0, presentadas: 0, pendientes: 0, ganadas: 0, noPresentadas: 0, total: 0 };
      }
      if (!byConcurso[concurso]) {
        byConcurso[concurso] = { concurso: concurso, seguimiento: 0, presentadas: 0, pendientes: 0, ganadas: 0 };
      }

      byBanda[banda].total++;
      if (inscripcion === 'ABIERTA') byBanda[banda].abiertas++;
      if (presentada) byBanda[banda].presentadas++;
      if (sbIsPendingState_(estado)) byBanda[banda].pendientes++;
      if (estado === 'GANADA' || resultado === 'GANADA') byBanda[banda].ganadas++;
      if (!presentada) byBanda[banda].noPresentadas++;

      byConcurso[concurso].seguimiento++;
      if (presentada) byConcurso[concurso].presentadas++;
      if (sbIsPendingState_(estado)) byConcurso[concurso].pendientes++;
      if (estado === 'GANADA' || resultado === 'GANADA') byConcurso[concurso].ganadas++;
    });

    sbWriteDashboard_(
      refs.dashboard,
      totals,
      Object.keys(byBanda).sort().map(function (k) { return byBanda[k]; }),
      Object.keys(byConcurso).sort().map(function (k) { return byConcurso[k]; })
    );

    sbToast_(ss, 'DASHBOARD actualizado.');
    return {
      ok: true,
      kpis: {
        totalBandas: totals.bandas.size,
        totalConcursos: totals.concursos.size,
        totalRelaciones: totals.relaciones,
        totalPresentadas: totals.presentadas,
        totalPendientes: totals.pendientes,
        totalGanadas: totals.ganadas,
      },
    };
  });
}

function sbValidarDuplicadosSeguimiento() {
  const ss = sbGetSpreadsheet_();
  const seguimiento = sbEnsureSheet_(ss, SB_CFG.SHEETS.SEGUIMIENTO, SB_CFG.HEADERS.SEGUIMIENTO);
  const result = sbValidateSeguimientoDuplicates_(seguimiento, true);
  const msg = result.duplicates === 0
    ? 'Sin duplicados en SEGUIMIENTO.'
    : `Duplicados detectados: ${result.duplicates}. Filas: ${result.rows.join(', ')}`;
  sbToast_(ss, msg);
  return result;
}

function sbHandleSeguimientoOnEdit_(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (!sheet || sheet.getName() !== SB_CFG.SHEETS.SEGUIMIENTO) return;
  if (e.range.getRow() < 2) return;

  const colStart = e.range.getColumn();
  const colEnd = colStart + e.range.getNumColumns() - 1;
  if (colEnd < 12 || colStart > 12) return;

  const ss = sheet.getParent();
  const now = new Date();
  const rowStart = e.range.getRow();
  const rowEnd = rowStart + e.range.getNumRows() - 1;

  const postPresentation = {
    SUBSANACION: true,
    'EN ESPERA': true,
    FINALISTA: true,
    GANADA: true,
    'NO SELECCIONADA': true,
  };
  const prePresentation = {
    'NO APLICA': true,
    VALORAR: true,
    'NO REVISADO': true,
    PREPARANDO: true,
    'PENDIENTE DOCUMENTACION': true,
  };
  const resultByState = {
    FINALISTA: 'FINALISTA',
    GANADA: 'GANADA',
    'NO SELECCIONADA': 'NO SELECCIONADA',
    CANCELADA: 'CANCELADA',
  };

  for (let r = rowStart; r <= rowEnd; r++) {
    const estado = sbSafeText_(sheet.getRange(r, 12).getValue()).toUpperCase();
    if (!estado) continue;

    const presentadaCell = sheet.getRange(r, 13);
    const fechaPresentacionCell = sheet.getRange(r, 14);
    const fechaResolucionCell = sheet.getRange(r, 15);
    const resultadoCell = sheet.getRange(r, 16);
    const updatedCell = sheet.getRange(r, 20);

    let presentada = sbToBool_(presentadaCell.getValue());
    const fechaPresentacion = fechaPresentacionCell.getValue();
    const fechaResolucion = fechaResolucionCell.getValue();

    if (estado === 'PRESENTADA' || postPresentation[estado]) {
      if (!presentada) {
        presentada = true;
        presentadaCell.setValue(true);
      }
      if (!fechaPresentacion) {
        fechaPresentacionCell.setValue(now);
      }
    } else if (prePresentation[estado]) {
      if (presentada) {
        presentadaCell.setValue(false);
      }
    }

    if (resultByState[estado]) {
      resultadoCell.setValue(resultByState[estado]);
      if (!fechaResolucion) {
        fechaResolucionCell.setValue(now);
      }
    } else if (!sbSafeText_(resultadoCell.getValue())) {
      resultadoCell.setValue('SIN RESULTADO');
    }

    updatedCell.setValue(now);
  }

  sbAppendLogs_(sbEnsureSheet_(ss, SB_CFG.SHEETS.LOG, SB_CFG.HEADERS.LOG), [
    [now, 'EDIT_ESTADO', 'Actualizacion automatica por cambio de ESTADO_SOLICITUD', '', '', '', sbCurrentUserEmail_()],
  ]);
}

function sbAddSeguimientoMenu_() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Seguimiento')
    .addItem('Sincronizar', 'sbSincronizarSeguimiento')
    .addItem('Refrescar dashboard', 'sbRefrescarDashboard')
    .addItem('Reconciliar datos', 'sbReconciliarDatos')
    .addItem('Validar duplicados', 'sbValidarDuplicadosSeguimiento')
    .addToUi();
}

function sbEnsureStructure_(ss) {
  const concursos = sbEnsureSheet_(ss, SB_CFG.SHEETS.CONCURSOS, null);
  const bandas = sbEnsureSheet_(ss, SB_CFG.SHEETS.BANDAS, null);
  const correo = sbEnsureSheet_(ss, SB_CFG.SHEETS.CORREO, null);
  if (!concursos || !bandas || !correo) {
    throw new Error('Faltan hojas base requeridas: CONCURSOS, BANDAS o CORREO.');
  }

  const catalogos = sbEnsureSheet_(ss, SB_CFG.SHEETS.CATALOGOS, null);
  const seguimiento = sbEnsureSheet_(ss, SB_CFG.SHEETS.SEGUIMIENTO, SB_CFG.HEADERS.SEGUIMIENTO);
  const dashboard = sbEnsureSheet_(ss, SB_CFG.SHEETS.DASHBOARD, null);
  const log = sbEnsureSheet_(ss, SB_CFG.SHEETS.LOG, SB_CFG.HEADERS.LOG);
  const auxBandas = sbEnsureSheet_(ss, SB_CFG.SHEETS.AUX_BANDAS, SB_CFG.HEADERS.AUX_BANDAS);
  const auxConcursos = sbEnsureSheet_(ss, SB_CFG.SHEETS.AUX_CONCURSOS, SB_CFG.HEADERS.AUX_CONCURSOS);

  sbPrepareCatalogos_(catalogos);
  sbPrepareSeguimientoSheet_(seguimiento, catalogos);
  sbPrepareDashboardShell_(dashboard);
  sbPrepareLogSheet_(log);
  sbPrepareAuxSheet_(auxBandas);
  sbPrepareAuxSheet_(auxConcursos);

  try { auxBandas.hideSheet(); } catch (err) {}
  try { auxConcursos.hideSheet(); } catch (err) {}

  return {
    concursos: concursos,
    bandas: bandas,
    correo: correo,
    catalogos: catalogos,
    seguimiento: seguimiento,
    dashboard: dashboard,
    log: log,
    auxBandas: auxBandas,
    auxConcursos: auxConcursos,
  };
}

function sbPrepareCatalogos_(sheet) {
  const maxCols = Math.max(sheet.getMaxColumns(), 4);
  if (sheet.getMaxColumns() < maxCols) sheet.insertColumnsAfter(sheet.getMaxColumns(), maxCols - sheet.getMaxColumns());
  sheet.getRange(1, 1, 1, 4).setValues([['ENCAJE', 'PRIORIDAD', 'ESTADO_SOLICITUD', 'RESULTADO']]);
  sheet.getRange(2, 1, SB_CFG.CATALOGS.ENCAJE.length, 1).setValues(SB_CFG.CATALOGS.ENCAJE.map(function (v) { return [v]; }));
  sheet.getRange(2, 2, SB_CFG.CATALOGS.PRIORIDAD.length, 1).setValues(SB_CFG.CATALOGS.PRIORIDAD.map(function (v) { return [v]; }));
  sheet.getRange(2, 3, SB_CFG.CATALOGS.ESTADO_SOLICITUD.length, 1).setValues(SB_CFG.CATALOGS.ESTADO_SOLICITUD.map(function (v) { return [v]; }));
  sheet.getRange(2, 4, SB_CFG.CATALOGS.RESULTADO.length, 1).setValues(SB_CFG.CATALOGS.RESULTADO.map(function (v) { return [v]; }));
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 4);
}

function sbPrepareSeguimientoSheet_(sheet, catalogos) {
  const headers = SB_CFG.HEADERS.SEGUIMIENTO;
  sbEnsureHeaders_(sheet, headers);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, Math.max(2, sheet.getMaxRows()), headers.length).createFilter();
  }
  sbApplySeguimientoValidations_(sheet, catalogos);
  sbApplySeguimientoConditionalRules_(sheet);
  // Vista limpia: ocultar IDs tecnicos.
  try { sheet.hideColumns(1, 2); } catch (err) {}
  try { sheet.hideColumns(5, 1); } catch (err) {}
}

function sbApplySeguimientoValidations_(sheet, catalogos) {
  const numRows = Math.max(sheet.getMaxRows() - 1, 1);
  const encajeRule = SpreadsheetApp.newDataValidation().requireValueInRange(catalogos.getRange('A2:A'), true).setAllowInvalid(false).build();
  const prioridadRule = SpreadsheetApp.newDataValidation().requireValueInRange(catalogos.getRange('B2:B'), true).setAllowInvalid(false).build();
  const estadoRule = SpreadsheetApp.newDataValidation().requireValueInRange(catalogos.getRange('C2:C'), true).setAllowInvalid(false).build();
  const resultadoRule = SpreadsheetApp.newDataValidation().requireValueInRange(catalogos.getRange('D2:D'), true).setAllowInvalid(false).build();
  const checkboxRule = SpreadsheetApp.newDataValidation().requireCheckbox().build();

  sheet.getRange(2, 10, numRows, 1).setDataValidation(encajeRule);
  sheet.getRange(2, 11, numRows, 1).setDataValidation(prioridadRule);
  sheet.getRange(2, 12, numRows, 1).setDataValidation(estadoRule);
  sheet.getRange(2, 16, numRows, 1).setDataValidation(resultadoRule);
  sheet.getRange(2, 13, numRows, 1).setDataValidation(checkboxRule);
}

function sbApplySeguimientoConditionalRules_(sheet) {
  const estadoRange = sheet.getRange('L2:L');
  const rules = [
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('GANADA').setBackground(SB_THEME.YELLOW).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('FINALISTA').setBackground(SB_THEME.YELLOW).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('PRESENTADA').setBackground(SB_THEME.YELLOW_LIGHT).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('EN ESPERA').setBackground(SB_THEME.YELLOW_LIGHT).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('PREPARANDO').setBackground(SB_THEME.WHITE).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('PENDIENTE DOCUMENTACION').setBackground(SB_THEME.WHITE).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('NO SELECCIONADA').setBackground(SB_THEME.RED_LIGHT).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('CANCELADA').setBackground(SB_THEME.RED_LIGHT).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('NO APLICA').setBackground(SB_THEME.WHITE).setFontColor(SB_THEME.RED_DARK).setRanges([estadoRange]).build(),
  ];
  sheet.setConditionalFormatRules(rules);
}

function sbPrepareDashboardShell_(sheet) {
  sheet.clear();
  sheet.getRange('A1').setValue('DASHBOARD SEGUIMIENTO BANDAS VS CONCURSOS');
  sheet.getRange('A1').setFontWeight('bold').setFontSize(14).setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
  sheet.setFrozenRows(1);
}

function sbPrepareLogSheet_(sheet) {
  sbEnsureHeaders_(sheet, SB_CFG.HEADERS.LOG);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, SB_CFG.HEADERS.LOG.length).setFontWeight('bold').setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
}

function sbPrepareAuxSheet_(sheet) {
  sheet.setFrozenRows(1);
  const width = sheet.getLastColumn();
  if (width > 0) {
    sheet.getRange(1, 1, 1, width).setFontWeight('bold').setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
  }
}

function sbSyncAuxBandas_(bandasSheet, auxSheet, now) {
  const master = sbReadRowsFromSheet_(bandasSheet, 3);
  const existing = sbReadRows_(auxSheet, SB_CFG.HEADERS.AUX_BANDAS.length);
  const index = sbBuildAuxIndex_(existing, 0, 3, 4);
  const allocator = sbCreateCompactIdAllocator_(existing, 'B');
  const idMap = {};

  const outRows = [];
  const active = [];
  const seen = {};

  master.forEach(function (r) {
    const banda = sbSafeText_(r[0]);
    const email = sbSafeText_(r[1]);
    if (!banda) return;

    const nameKey = sbNormalizeKey_(banda);
    const fullKey = `${nameKey}|${sbNormalizeKey_(email)}`;
    const rec = index.byFull[fullKey] || index.byName[nameKey];
    const legacyId = rec ? sbSafeText_(rec.row[0]) : '';
    const id = legacyId
      ? allocator.get(legacyId)
      : allocator.get(`FULL:${fullKey || nameKey || banda}`);
    if (legacyId && legacyId !== id) idMap[legacyId] = id;
    const createdAt = rec ? rec.row[6] : now;

    const row = [id, banda, email, nameKey, fullKey, true, createdAt, now];
    outRows.push(row);
    seen[id] = true;
    active.push({
      id: id,
      bandaName: banda,
      bandaEmail: email,
    });
  });

  existing.forEach(function (r) {
    const oldId = sbSafeText_(r[0]);
    if (!oldId) return;
    const id = allocator.get(oldId);
    if (oldId !== id) idMap[oldId] = id;
    if (seen[id]) return;
    outRows.push([id, sbSafeText_(r[1]), sbSafeText_(r[2]), sbSafeText_(r[3]), sbSafeText_(r[4]), false, r[6] || now, r[7] || now]);
  });

  sbWriteBodyRows_(auxSheet, outRows, SB_CFG.HEADERS.AUX_BANDAS.length);
  return { active: active, rows: outRows, idMap: idMap };
}

function sbSyncAuxConcursos_(concursosSheet, auxSheet, now) {
  const master = sbReadRowsFromSheet_(concursosSheet, 17);
  const existing = sbReadRows_(auxSheet, SB_CFG.HEADERS.AUX_CONCURSOS.length);
  const index = sbBuildAuxIndex_(existing, 0, 5, 6);
  const allocator = sbCreateCompactIdAllocator_(existing, 'C');
  const idMap = {};

  const outRows = [];
  const active = [];
  const seen = {};

  master.forEach(function (r) {
    const nombre = sbSafeText_(r[0]);
    if (!nombre) return;

    const inscripcion = sbSafeText_(r[2]);
    const fechaLimite = r[3] || '';
    const link = sbSafeText_(r[11]);
    const nameKey = sbNormalizeKey_(nombre);
    const fullKey = `${nameKey}|${sbNormalizeKey_(link)}`;
    const rec = index.byFull[fullKey] || index.byName[nameKey];
    const legacyId = rec ? sbSafeText_(rec.row[0]) : '';
    const id = legacyId
      ? allocator.get(legacyId)
      : allocator.get(`FULL:${fullKey || nameKey || nombre}`);
    if (legacyId && legacyId !== id) idMap[legacyId] = id;
    const createdAt = rec ? rec.row[8] : now;

    const row = [id, nombre, link, inscripcion, fechaLimite, nameKey, fullKey, true, createdAt, now];
    outRows.push(row);
    seen[id] = true;
    active.push({
      id: id,
      concursoName: nombre,
      inscripcionActual: inscripcion,
      fechaLimite: fechaLimite,
      linkFormulario: link,
    });
  });

  existing.forEach(function (r) {
    const oldId = sbSafeText_(r[0]);
    if (!oldId) return;
    const id = allocator.get(oldId);
    if (oldId !== id) idMap[oldId] = id;
    if (seen[id]) return;
    outRows.push([
      id,
      sbSafeText_(r[1]),
      sbSafeText_(r[2]),
      sbSafeText_(r[3]),
      r[4] || '',
      sbSafeText_(r[5]),
      sbSafeText_(r[6]),
      false,
      r[8] || now,
      r[9] || now,
    ]);
  });

  sbWriteBodyRows_(auxSheet, outRows, SB_CFG.HEADERS.AUX_CONCURSOS.length);
  return { active: active, rows: outRows, idMap: idMap };
}

function sbBuildAuxIndex_(rows, idIdx, nameKeyIdx, fullKeyIdx) {
  const byName = {};
  const byFull = {};
  rows.forEach(function (row) {
    const id = sbSafeText_(row[idIdx]);
    if (!id) return;
    const nameKey = sbSafeText_(row[nameKeyIdx]);
    const fullKey = sbSafeText_(row[fullKeyIdx]);
    const rec = { id: id, row: row };
    if (nameKey && !byName[nameKey]) byName[nameKey] = rec;
    if (fullKey && !byFull[fullKey]) byFull[fullKey] = rec;
  });
  return { byName: byName, byFull: byFull };
}

function sbBuildActivePairs_(bands, concursos) {
  const out = {};
  bands.forEach(function (b) {
    concursos.forEach(function (c) {
      const key = `${b.id}__${c.id}`;
      out[key] = {
        idBanda: b.id,
        bandaName: b.bandaName,
        bandaEmail: b.bandaEmail,
        idConcurso: c.id,
        concursoName: c.concursoName,
        inscripcionActual: c.inscripcionActual,
        fechaLimite: c.fechaLimite,
        linkFormulario: c.linkFormulario,
      };
    });
  });
  return out;
}

function sbBuildNewSeguimientoRow_(pair, now) {
  return [
    sbBuildRelationId_(pair.idBanda, pair.idConcurso),
    pair.idBanda,
    pair.bandaName,
    pair.bandaEmail,
    pair.idConcurso,
    pair.concursoName,
    pair.inscripcionActual,
    pair.fechaLimite,
    pair.linkFormulario,
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
  ];
}

function sbEnsureSeguimientoDefaults_(row) {
  if (row.length < SB_CFG.HEADERS.SEGUIMIENTO.length) {
    while (row.length < SB_CFG.HEADERS.SEGUIMIENTO.length) row.push('');
  }
  if (!sbSafeText_(row[9])) row[9] = 'REVISAR';
  if (!sbSafeText_(row[10])) row[10] = 'MEDIA';
  if (!sbSafeText_(row[11])) row[11] = 'NO REVISADO';
  if (!sbSafeText_(row[15])) row[15] = 'SIN RESULTADO';
  if (!row[20]) row[20] = new Date();
}

function sbWriteDashboard_(sheet, totals, bandaRows, concursoRows) {
  const values = [
    ['KPI GLOBAL', 'VALOR'],
    ['Total bandas', totals.bandas.size],
    ['Total concursos', totals.concursos.size],
    ['Total relaciones', totals.relaciones],
    ['Total presentadas', totals.presentadas],
    ['Total pendientes', totals.pendientes],
    ['Total ganadas', totals.ganadas],
    ['Total abiertas no presentadas', totals.abiertasNoPresentadas],
    [''],
    ['RESUMEN POR BANDA'],
    ['BANDA', 'ABIERTAS', 'PRESENTADAS', 'PENDIENTES', 'GANADAS', 'NO PRESENTADAS', 'TOTAL'],
  ];

  bandaRows.forEach(function (r) {
    values.push([r.banda, r.abiertas, r.presentadas, r.pendientes, r.ganadas, r.noPresentadas, r.total]);
  });

  values.push(['']);
  values.push(['RESUMEN POR CONCURSO']);
  values.push(['CONCURSO', 'EN SEGUIMIENTO', 'PRESENTADAS', 'PENDIENTES', 'GANADAS']);

  concursoRows.forEach(function (r) {
    values.push([r.concurso, r.seguimiento, r.presentadas, r.pendientes, r.ganadas]);
  });

  sheet.clear();
  sheet.getRange(1, 1, values.length, Math.max(7, 5)).setValues(sbPadRows_(values, Math.max(7, 5)));
  sheet.getRange('A1:B1').setFontWeight('bold').setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
  sheet.getRange('A10').setFontWeight('bold').setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
  sheet.getRange('A11:G11').setFontWeight('bold').setBackground(SB_THEME.YELLOW).setFontColor(SB_THEME.RED_DARK);

  const concursoHeaderRow = 13 + bandaRows.length;
  sheet.getRange(concursoHeaderRow, 1).setFontWeight('bold').setBackground(SB_THEME.RED).setFontColor(SB_THEME.WHITE);
  sheet.getRange(concursoHeaderRow + 1, 1, 1, 5).setFontWeight('bold').setBackground(SB_THEME.YELLOW).setFontColor(SB_THEME.RED_DARK);
  sheet.autoResizeColumns(1, 7);
  sheet.setFrozenRows(1);
}

function sbValidateSeguimientoDuplicates_(sheet, annotate) {
  const rows = sbReadRows_(sheet, SB_CFG.HEADERS.SEGUIMIENTO.length);
  const firstByKey = {};
  const duplicates = [];
  const notesToSet = [];

  rows.forEach(function (r, idx) {
    const idB = sbSafeText_(r[1]);
    const idC = sbSafeText_(r[4]);
    if (!idB || !idC) return;
    const key = `${idB}__${idC}`;
    if (!firstByKey[key]) {
      firstByKey[key] = idx + 2;
      return;
    }
    duplicates.push(idx + 2);
    if (annotate) {
      notesToSet.push({ row: idx + 2, text: `DUPLICADO de fila ${firstByKey[key]} (${key})` });
    }
  });

  if (annotate) {
    notesToSet.forEach(function (n) {
      sheet.getRange(n.row, 1).setNote(n.text);
    });
  }

  return { duplicates: duplicates.length, rows: duplicates };
}

function sbAppendLogs_(logSheet, logRows) {
  if (!logRows || logRows.length === 0) return;
  const startRow = Math.max(logSheet.getLastRow() + 1, 2);
  logSheet.getRange(startRow, 1, logRows.length, SB_CFG.HEADERS.LOG.length).setValues(logRows);
}

function sbEnsureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (headers && headers.length) sbEnsureHeaders_(sheet, headers);
  return sheet;
}

function sbEnsureHeaders_(sheet, headers) {
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  let mustWrite = false;
  for (let i = 0; i < headers.length; i++) {
    if (sbSafeText_(current[i]) !== headers[i]) {
      mustWrite = true;
      break;
    }
  }
  if (mustWrite) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function sbReadRowsFromSheet_(sheet, width) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, width).getValues();
}

function sbReadRows_(sheet, width) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, width).getValues();
}

function sbWriteBodyRows_(sheet, rows, width) {
  const previousRows = Math.max(sheet.getLastRow() - 1, 0);
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, width).setValues(rows);
  }
  if (previousRows > rows.length) {
    sheet.getRange(rows.length + 2, 1, previousRows - rows.length, width).clearContent().clearNote();
  }
}

function sbGetSpreadsheet_() {
  if (typeof getSpreadsheetObjetivo_ === 'function') {
    return getSpreadsheetObjetivo_();
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function sbRunWithLock_(label, fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) {
    throw new Error(`No se pudo obtener lock para ${label}.`);
  }
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function sbBuildRelationId_(idBanda, idConcurso) {
  if (!idBanda || !idConcurso) {
    return sbBuildStableId_('REL', `${idBanda || 'B'}__${idConcurso || 'C'}`);
  }
  return `R_${idBanda}_${idConcurso}`;
}

function sbCreateCompactIdAllocator_(rows, prefix) {
  const used = {};
  const map = {};
  let maxNum = 0;

  rows.forEach(function (r) {
    const raw = sbSafeText_(r[0]);
    const n = sbParseCompactIdNumber_(raw, prefix);
    if (!n) return;
    used[n] = true;
    if (n > maxNum) maxNum = n;
    map[raw] = raw;
  });

  function nextId_() {
    let n = maxNum + 1;
    while (used[n]) n++;
    used[n] = true;
    maxNum = n;
    return `${prefix}${String(n).padStart(3, '0')}`;
  }

  return {
    get: function (key) {
      const k = sbSafeText_(key);
      if (!k) return nextId_();
      if (map[k]) return map[k];
      const id = nextId_();
      map[k] = id;
      return id;
    },
  };
}

function sbParseCompactIdNumber_(id, prefix) {
  const txt = sbSafeText_(id);
  const re = new RegExp(`^${prefix}(\\d+)$`);
  const m = txt.match(re);
  if (!m) return 0;
  const n = Number(m[1]);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function sbBuildStableId_(prefix, raw) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw || Utilities.getUuid());
  const b64 = Utilities.base64EncodeWebSafe(digest).replace(/[^A-Za-z0-9]/g, '').substring(0, 20);
  return `${prefix}_${b64}`;
}

function sbNormalizeKey_(value) {
  const txt = sbSafeText_(value).toLowerCase();
  return txt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, '_');
}

function sbSafeText_(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

function sbToBool_(value) {
  if (value === true || value === false) return value;
  const t = sbSafeText_(value).toLowerCase();
  return t === 'true' || t === 'si' || t === 'yes' || t === '1' || t === 'verdadero';
}

function sbIsPendingState_(estado) {
  const pending = {
    'NO REVISADO': true,
    VALORAR: true,
    PREPARANDO: true,
    'PENDIENTE DOCUMENTACION': true,
    SUBSANACION: true,
    'EN ESPERA': true,
  };
  return !!pending[estado];
}

function sbAppendNote_(existing, addition) {
  const base = sbSafeText_(existing);
  if (!base) return addition;
  if (base.indexOf(addition) >= 0) return base;
  return `${base}\n${addition}`;
}

function sbPadRows_(rows, width) {
  return rows.map(function (row) {
    const out = row.slice();
    while (out.length < width) out.push('');
    return out;
  });
}

function sbToast_(ss, message) {
  try {
    ss.toast(message, 'Seguimiento', 5);
  } catch (err) {}
}

function sbCurrentUserEmail_() {
  try {
    return Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail() || '';
  } catch (err) {
    return '';
  }
}
