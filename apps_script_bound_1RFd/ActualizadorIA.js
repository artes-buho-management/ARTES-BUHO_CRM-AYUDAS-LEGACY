// ==============================================================================
// ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“ CRM V-GOD OMEGA (GEMINI 3.1 PRO + LECTOR PDF + BRANDING RUBEN COTON)
// ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ SOFTWARE ARCHITECTURE BY: RUBEN COTON
// ==============================================================================

const API_KEY = ''; // Seguridad: configurar en Script Properties (GEMINI_API_KEY)

// ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â  Motores en Cascada: El 3.1 Pro en cabeza. Si da 404, salta al siguiente (Inmortal)
const MOTORES_SISTEMA = [
  'gemini-3.1-pro-preview',   // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ TITÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂN PRINCIPAL (MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡xima potencia de razonamiento)
  'gemini-2.5-pro',           // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â  Respaldo de Alta Potencia
  'gemini-2.5-flash',         // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â° Motor de Seguridad ultra-rÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡pido
  'gemini-1.5-pro-latest'     // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ParacaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­das de emergencia anti-404
]; 

const NOMBRE_PESTANA = 'CONCURSOS'; 
const CONTRASENA_SEGURIDAD = ''; // Seguridad: configurar en Script Properties (SEGURIDAD_PASS)
const SPREADSHEET_ID_FALLBACK = 'REPLACE_WITH_SHEET_ID'; 

const CONFIG = {
  MAX_EXECUTION_TIME: 4.8 * 60 * 1000, // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Freno a los 5 mins para evitar cuelgues
  MAX_RETRIES: 3, 
  MAX_PDF_SIZE_MB: 7, // LÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­mite de seguridad para convertir PDFs a binario
  VALID_TIPO: ["ECONOMICO", "SERVICIO", "ACTUACION", "RESIDENCIA", "VARIOS"]
};
const BRAND_COLORS = {
  PRIMARY: '#C97A1E',
  PRIMARY_DARK: '#8B5A1E',
  HEADER_TEXT: '#FFFFFF',
  BORDER: '#5A3A12',
  LINK: '#1A73E8',
  OPEN_BG: '#D9EAD3',
  CLOSED_BG: '#F4CCCC',
  DRAFT_BG: '#FFF2CC'
};
const ESTADO_VALUES = ['REVISAR', 'REVISADO IA', 'REVISADO HUMANO', 'NUEVO DESCUBRIMIENTOS'];
const INSCRIPCION_VALUES = ['ABIERTA', 'CERRADA', 'SIN PUBLICAR'];
const ESTADO_CHIP_STYLE = {
  REVISAR: { bg: '#FCE8B2', fg: '#7A5E00' },
  'REVISADO IA': { bg: '#FDE293', fg: '#7A5E00' },
  'REVISADO HUMANO': { bg: '#C8E6C9', fg: '#1B5E20' },
  'NUEVO DESCUBRIMIENTOS': { bg: '#E6D5F7', fg: '#6A1B9A' }
};
const INSCRIPCION_CHIP_STYLE = {
  ABIERTA: { bg: '#B7E1CD', fg: '#137333' },
  CERRADA: { bg: '#F4C7C3', fg: '#A50E0E' },
  'SIN PUBLICAR': { bg: '#FCE8B2', fg: '#7A5E00' }
};
const CHIP_DEFAULT_STYLE = { bg: '#E8EAED', fg: '#202124' };
const DROPDOWN_TEMPLATE_ROW = 2;
const SCRIPT_PROP_KEYS = {
  API_KEY: 'GEMINI_API_KEY',
  SECURITY_PASS: 'SEGURIDAD_PASS',
  SPREADSHEET_ID: 'SPREADSHEET_ID',
  DRIVE_ROOT_FOLDER_ID: 'DRIVE_ROOT_FOLDER_ID',
  DRIVE_ACCOUNT_EMAIL: 'DRIVE_ACCOUNT_EMAIL'
};

function getConfigSeguro_() {
  const p = PropertiesService.getScriptProperties();
  return {
    apiKey: (p.getProperty(SCRIPT_PROP_KEYS.API_KEY) || API_KEY || '').toString().trim(),
    securityPass: (p.getProperty(SCRIPT_PROP_KEYS.SECURITY_PASS) || CONTRASENA_SEGURIDAD || '').toString().trim(),
    spreadsheetId: (p.getProperty(SCRIPT_PROP_KEYS.SPREADSHEET_ID) || SPREADSHEET_ID_FALLBACK || '').toString().trim(),
    driveRootFolderId: (p.getProperty(SCRIPT_PROP_KEYS.DRIVE_ROOT_FOLDER_ID) || '').toString().trim(),
    driveAccountEmail: (p.getProperty(SCRIPT_PROP_KEYS.DRIVE_ACCOUNT_EMAIL) || '').toString().trim()
  };
}

function getApiKeyGemini_() {
  return getConfigSeguro_().apiKey;
}

function getContrasenaSistema_() {
  return getConfigSeguro_().securityPass;
}

function getSpreadsheetObjetivo_() {
  const cfg = getConfigSeguro_();
  if (cfg.spreadsheetId) {
    try { return SpreadsheetApp.openById(cfg.spreadsheetId); } catch (e) {}
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}
function hasApiKeyConfigured_() {
  const api = getApiKeyGemini_();
  return !!api && api.length >= 20;
}

function hasPasswordConfigured_() {
  const pass = getContrasenaSistema_();
  return !!pass && pass.length >= 6;
}

function validarSeguridadPrevia_(opts) {
  const o = opts || {};
  const necesitaApi = o.api === true;
  const necesitaPass = o.pass === true;
  const ui = SpreadsheetApp.getUi();

  const faltan = [];
  if (necesitaApi && !hasApiKeyConfigured_()) faltan.push('API Gemini (GEMINI_API_KEY)');
  if (necesitaPass && !hasPasswordConfigured_()) faltan.push('Contrasena del sistema (SEGURIDAD_PASS)');

  if (faltan.length === 0) return true;

  ui.alert(
    'Configuracion de seguridad requerida',
    `Faltan: ${faltan.join(', ')}\n\nMenu: CRM AYUDAS`,
    ui.ButtonSet.OK
  );
  return false;
}
function normalizarValor_(val) {
  return (val || '').toString().trim().toUpperCase();
}

function getTemplateValidation_(sheet, col, fallbackValues) {
  try {
    const tpl = sheet.getRange(DROPDOWN_TEMPLATE_ROW, col).getDataValidation();
    if (tpl) return tpl;
  } catch (e) {}

  return SpreadsheetApp.newDataValidation()
    .requireValueInList(fallbackValues, true)
    .setAllowInvalid(true)
    .build();
}

function asegurarValidacionesFila_(sheet, filaIndex) {
  const estadoCell = sheet.getRange(filaIndex, 2);
  if (!estadoCell.getDataValidation()) {
    estadoCell.setDataValidation(getTemplateValidation_(sheet, 2, ESTADO_VALUES));
  }

  const inscripcionCell = sheet.getRange(filaIndex, 3);
  if (!inscripcionCell.getDataValidation()) {
    inscripcionCell.setDataValidation(getTemplateValidation_(sheet, 3, INSCRIPCION_VALUES));
  }
}

function aplicarChipEnCelda_(range, style) {
  const st = style || CHIP_DEFAULT_STYLE;
  range
    .setBackground(st.bg)
    .setFontColor(st.fg)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
}

function forzarDisenoCorporativo(silent) {
  const modoSilencioso = silent === true;
  const ui = modoSilencioso ? null : SpreadsheetApp.getUi();
  try {
    const ss = getSpreadsheetObjetivo_();
    const hoja = ss.getSheetByName(NOMBRE_PESTANA);
    const hojaNuevos = ss.getSheetByName('NUEVOS CONCURSOS');
    if (!hoja) {
      if (!modoSilencioso) ui.alert('Error', `No existe la pestana ${NOMBRE_PESTANA}.`, ui.ButtonSet.OK);
      return;
    }

    aplicarDiseno(hoja, hojaNuevos);
    if (hoja.getLastRow() > 1) {
      const inscripciones = hoja.getRange(2, 3, hoja.getLastRow() - 1, 1).getValues();
      for (let i = 0; i < inscripciones.length; i++) {
        aplicarPinturaFila(hoja, i + 2, inscripciones[i][0]);
      }
    }

    if (!modoSilencioso) {
      ui.alert('Diseno aplicado', 'Se han re-aplicado colores, validaciones y estilo corporativo.', ui.ButtonSet.OK);
    }
  } catch (e) {
    if (modoSilencioso) {
      try { logC(`> [DISENO] Error en autoaplicacion: ${e && e.message ? e.message : e}`, 'warning'); } catch (x) {}
      return;
    }
    ui.alert('Error', `No se pudo reaplicar el diseno. ${e && e.message ? e.message : e}`, ui.ButtonSet.OK);
  }
}

function instalarConexionBrutal() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) { ui.alert('Error', 'No hay spreadsheet activo.', ui.ButtonSet.OK); return; }

  const p = PropertiesService.getScriptProperties();
  const cfg = getConfigSeguro_();

  const apiPrompt = ui.prompt(
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â°ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â CONFIGURAR API GEMINI',
    'Pega tu API key de Gemini. Se guarda en Script Properties (no en el codigo).',
    ui.ButtonSet.OK_CANCEL
  );
  if (apiPrompt.getSelectedButton() !== ui.Button.OK) return;
  const api = (apiPrompt.getResponseText() || '').toString().trim();
  if (!api || api.length < 20) {
    ui.alert('Dato invalido', 'La API key no parece valida.', ui.ButtonSet.OK);
    return;
  }

  const passPrompt = ui.prompt(
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â°ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚ÂÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â CONFIGURAR CONTRASENA DEL SISTEMA',
    'Define la contrasena de acceso para la consola y el modulo de envios (minimo 6 caracteres).',
    ui.ButtonSet.OK_CANCEL
  );
  if (passPrompt.getSelectedButton() !== ui.Button.OK) return;
  const pass = (passPrompt.getResponseText() || '').toString().trim();
  if (!pass || pass.length < 6) {
    ui.alert('Dato invalido', 'La contrasena debe tener al menos 6 caracteres.', ui.ButtonSet.OK);
    return;
  }

  p.setProperties({
    [SCRIPT_PROP_KEYS.API_KEY]: api,
    [SCRIPT_PROP_KEYS.SECURITY_PASS]: pass,
    [SCRIPT_PROP_KEYS.SPREADSHEET_ID]: ss.getId()
  }, false);

  ui.alert('Seguridad configurada', `Credenciales guardadas correctamente.\nHoja vinculada: ${ss.getName()}`, ui.ButtonSet.OK);
}

function diagnosticoConexionBrutal() {
  const ui = SpreadsheetApp.getUi();
  const cfg = getConfigSeguro_();
  const estadoAPI = hasApiKeyConfigured_() ? 'OK' : 'NO CONFIGURADA';
  const estadoPASS = hasPasswordConfigured_() ? 'OK' : 'NO CONFIGURADA';

  let estadoSheet = 'NO DISPONIBLE';
  try {
    const ss = getSpreadsheetObjetivo_();
    if (ss) estadoSheet = `OK (${ss.getName()})`;
  } catch (e) {}

  ui.alert(
    'Diagnostico de Seguridad',
    `API Gemini: ${estadoAPI}\nContrasena sistema: ${estadoPASS}\nSpreadsheet: ${estadoSheet}\nSPREADSHEET_ID: ${cfg.spreadsheetId || 'VACIA'}`,
    ui.ButtonSet.OK
  );
}
function testConexionBrutalHeadless() {
  const cfg = getConfigSeguro_();
  const out = {
    apiKeyConfigured: !!(cfg.apiKey && !cfg.apiKey.includes('PON_AQUI')),
    spreadsheetId: cfg.spreadsheetId || '',
    spreadsheetOK: false,
    spreadsheetName: '',
    geminiOK: false,
    geminiHttp: 0
  };

  try {
    const ss = getSpreadsheetObjetivo_();
    if (ss) {
      out.spreadsheetOK = true;
      out.spreadsheetName = ss.getName();
    }
  } catch (e) {
    out.spreadsheetError = e && e.message ? e.message : String(e);
  }

  if (out.apiKeyConfigured) {
    const ping = fetchConReintentos_(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${cfg.apiKey}`,
      { method: 'get', muteHttpExceptions: true, followRedirects: true },
      'Ping Gemini',
      1
    );
    out.geminiOK = !!ping.ok;
    out.geminiHttp = ping.code || 0;
    if (!ping.ok && ping.body) out.geminiBody = ping.body.substring(0, 220);
  }

  logC(`> [DIAGNOSTICO] ${JSON.stringify(out)}`, (out.spreadsheetOK && out.geminiOK) ? 'success' : 'warning');
  return out;
}

function getDriveRootFolderId_() {
  return getConfigSeguro_().driveRootFolderId;
}

function getDriveAccountEmail_() {
  return getConfigSeguro_().driveAccountEmail;
}

function getDriveFolderSeguro_(folderId) {
  const rootId = (folderId || getDriveRootFolderId_() || '').toString().trim();
  if (rootId) return DriveApp.getFolderById(rootId);
  return DriveApp.getRootFolder();
}

function getDriveFolderMeta_(folder) {
  return {
    id: folder.getId(),
    name: folder.getName(),
    url: folder.getUrl()
  };
}

function getDriveFileMeta_(file) {
  const parentIds = [];
  const parentNames = [];
  const parents = file.getParents();
  while (parents.hasNext()) {
    const parent = parents.next();
    parentIds.push(parent.getId());
    parentNames.push(parent.getName());
  }

  return {
    id: file.getId(),
    name: file.getName(),
    url: file.getUrl(),
    mimeType: file.getMimeType(),
    size: file.getSize(),
    parents: parentIds,
    parentNames: parentNames,
    lastUpdated: file.getLastUpdated()
  };
}

function parseHeadlessPayload_(payload) {
  if (payload === null || payload === undefined) return {};
  if (typeof payload === 'string') {
    try { return JSON.parse(payload); } catch (e) { return {}; }
  }
  if (Array.isArray(payload) && payload.length === 1 && typeof payload[0] === 'object') {
    return payload[0] || {};
  }
  if (typeof payload === 'object') return payload;
  return {};
}

function setConexionDriveGeminiHeadless(payload) {
  const data = parseHeadlessPayload_(payload);
  const updates = {};
  const p = PropertiesService.getScriptProperties();

  if (typeof data.apiKey === 'string' && data.apiKey.trim()) {
    updates[SCRIPT_PROP_KEYS.API_KEY] = data.apiKey.trim();
  }
  if (typeof data.securityPass === 'string' && data.securityPass.trim()) {
    updates[SCRIPT_PROP_KEYS.SECURITY_PASS] = data.securityPass.trim();
  }
  if (typeof data.spreadsheetId === 'string' && data.spreadsheetId.trim()) {
    updates[SCRIPT_PROP_KEYS.SPREADSHEET_ID] = data.spreadsheetId.trim();
  }
  if (typeof data.driveRootFolderId === 'string') {
    const folderId = data.driveRootFolderId.trim();
    updates[SCRIPT_PROP_KEYS.DRIVE_ROOT_FOLDER_ID] = folderId.toUpperCase() === 'ROOT' ? '' : folderId;
  }
  if (typeof data.driveAccountEmail === 'string' && data.driveAccountEmail.trim()) {
    updates[SCRIPT_PROP_KEYS.DRIVE_ACCOUNT_EMAIL] = data.driveAccountEmail.trim().toLowerCase();
  }

  if (Object.keys(updates).length === 0) {
    return { ok: false, message: 'Sin cambios. Pasa al menos un campo en payload.' };
  }

  if (Object.prototype.hasOwnProperty.call(updates, SCRIPT_PROP_KEYS.DRIVE_ROOT_FOLDER_ID) && updates[SCRIPT_PROP_KEYS.DRIVE_ROOT_FOLDER_ID]) {
    DriveApp.getFolderById(updates[SCRIPT_PROP_KEYS.DRIVE_ROOT_FOLDER_ID]);
  }

  p.setProperties(updates, false);

  const cfg = getConfigSeguro_();
  return {
    ok: true,
    updatedKeys: Object.keys(updates),
    apiKeyConfigured: hasApiKeyConfigured_(),
    driveRootFolderId: cfg.driveRootFolderId || '',
    driveAccountEmail: cfg.driveAccountEmail || ''
  };
}

function configurarDriveGeminiBrutal() {
  const ui = SpreadsheetApp.getUi();
  const cfg = getConfigSeguro_();
  const updates = {};

  const apiPrompt = ui.prompt(
    'Configurar Gemini API',
    'Pega la API key de Gemini. Deja vacio para mantener la actual.',
    ui.ButtonSet.OK_CANCEL
  );
  if (apiPrompt.getSelectedButton() !== ui.Button.OK) return;
  const api = (apiPrompt.getResponseText() || '').toString().trim();
  if (api) updates[SCRIPT_PROP_KEYS.API_KEY] = api;

  const folderPrompt = ui.prompt(
    'Configurar carpeta raiz Drive',
    `Folder ID actual: ${cfg.driveRootFolderId || 'ROOT del usuario'}\nPega un ID de carpeta, o escribe ROOT para usar Mi unidad raiz.`,
    ui.ButtonSet.OK_CANCEL
  );
  if (folderPrompt.getSelectedButton() !== ui.Button.OK) return;
  const folderIdRaw = (folderPrompt.getResponseText() || '').toString().trim();
  if (folderIdRaw) {
    const folderId = folderIdRaw.toUpperCase() === 'ROOT' ? '' : folderIdRaw;
    if (folderId) DriveApp.getFolderById(folderId);
    updates[SCRIPT_PROP_KEYS.DRIVE_ROOT_FOLDER_ID] = folderId;
  }

  const emailPrompt = ui.prompt(
    'Cuenta objetivo de Drive',
    `Email actual: ${cfg.driveAccountEmail || '(sin definir)'}\nEscribe el email que quieres registrar para control.`,
    ui.ButtonSet.OK_CANCEL
  );
  if (emailPrompt.getSelectedButton() !== ui.Button.OK) return;
  const email = (emailPrompt.getResponseText() || '').toString().trim().toLowerCase();
  if (email) updates[SCRIPT_PROP_KEYS.DRIVE_ACCOUNT_EMAIL] = email;

  if (Object.keys(updates).length === 0) {
    ui.alert('Sin cambios', 'No se recibio ningun dato nuevo.', ui.ButtonSet.OK);
    return;
  }

  PropertiesService.getScriptProperties().setProperties(updates, false);
  const out = diagnosticoDriveGeminiHeadless();
  ui.alert(
    'Conexion Drive + Gemini guardada',
    `Drive listo: ${out.driveRootOk ? 'SI' : 'NO'}\nCarpeta activa: ${out.driveRootName || 'N/D'}\nGemini 3.1 Pro Preview: ${out.gemini31ProPreviewOK ? 'SI' : 'NO'}`,
    ui.ButtonSet.OK
  );
}

function diagnosticoDriveGeminiHeadless() {
  const cfg = getConfigSeguro_();
  const out = {
    driveAccountEmailConfigured: cfg.driveAccountEmail || '',
    effectiveUserEmail: '',
    driveRootFolderIdConfigured: cfg.driveRootFolderId || '',
    driveRootOk: false,
    driveRootName: '',
    driveRootFolderIdResolved: '',
    geminiApiConfigured: hasApiKeyConfigured_(),
    gemini31ProPreviewOK: false,
    gemini31Http: 0
  };

  try {
    out.effectiveUserEmail = Session.getEffectiveUser().getEmail() || '';
  } catch (e) {
    out.effectiveUserError = e && e.message ? e.message : String(e);
  }

  try {
    const folder = getDriveFolderSeguro_('');
    out.driveRootOk = true;
    out.driveRootName = folder.getName();
    out.driveRootFolderIdResolved = folder.getId();
  } catch (e) {
    out.driveRootError = e && e.message ? e.message : String(e);
  }

  if (out.geminiApiConfigured) {
    const ping = fetchConReintentos_(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${cfg.apiKey}`,
      {
        method: 'post',
        contentType: 'application/json',
        muteHttpExceptions: true,
        payload: JSON.stringify({
          contents: [{ parts: [{ text: 'Responde solo OK' }] }],
          generationConfig: { temperature: 0 }
        })
      },
      'Ping Gemini 3.1 Pro Preview',
      1
    );

    out.gemini31ProPreviewOK = !!ping.ok;
    out.gemini31Http = ping.code || 0;
    if (!ping.ok && ping.body) {
      out.gemini31Body = ping.body.substring(0, 260);
      out.geminiKeyLeaked = esApiKeyFiltradaGemini_(ping.body);
    }
  }

  return out;
}

function diagnosticoDriveGeminiBrutal() {
  const ui = SpreadsheetApp.getUi();
  const out = diagnosticoDriveGeminiHeadless();
  ui.alert(
    'Diagnostico Drive + Gemini',
    `Usuario efectivo: ${out.effectiveUserEmail || 'N/D'}\nEmail configurado: ${out.driveAccountEmailConfigured || 'N/D'}\nDrive activo: ${out.driveRootOk ? 'SI' : 'NO'}\nCarpeta Drive: ${out.driveRootName || 'N/D'}\nGemini 3.1 Pro Preview: ${out.gemini31ProPreviewOK ? 'SI' : 'NO'} (HTTP ${out.gemini31Http || 0})`,
    ui.ButtonSet.OK
  );
}

function driveListarCarpetaHeadless(folderId, limit) {
  const folder = getDriveFolderSeguro_(folderId);
  const maxItems = Math.max(1, Math.min(200, Number(limit) || 25));

  const files = [];
  const folders = [];

  const fileIt = folder.getFiles();
  while (fileIt.hasNext() && files.length < maxItems) {
    files.push(getDriveFileMeta_(fileIt.next()));
  }

  const folderIt = folder.getFolders();
  while (folderIt.hasNext() && folders.length < maxItems) {
    folders.push(getDriveFolderMeta_(folderIt.next()));
  }

  return {
    ok: true,
    folder: getDriveFolderMeta_(folder),
    fileCountReturned: files.length,
    folderCountReturned: folders.length,
    files: files,
    folders: folders
  };
}

function driveCrearCarpetaHeadless(nombre, parentFolderId) {
  const folderName = (nombre || '').toString().trim();
  if (!folderName) throw new Error('Nombre de carpeta obligatorio.');

  const parent = getDriveFolderSeguro_(parentFolderId);
  const folder = parent.createFolder(folderName);

  return {
    ok: true,
    parent: getDriveFolderMeta_(parent),
    folder: getDriveFolderMeta_(folder)
  };
}

function driveCrearArchivoTextoHeadless(nombre, contenido, parentFolderId, mimeType) {
  const fileName = (nombre || '').toString().trim();
  if (!fileName) throw new Error('Nombre de archivo obligatorio.');

  const text = (contenido === null || contenido === undefined) ? '' : String(contenido);
  const mime = (mimeType || 'text/plain').toString().trim() || 'text/plain';
  const parent = getDriveFolderSeguro_(parentFolderId);

  const file = parent.createFile(fileName, text, mime);
  return {
    ok: true,
    parent: getDriveFolderMeta_(parent),
    file: getDriveFileMeta_(file)
  };
}

function driveModificarArchivoTextoHeadless(fileId, nuevoContenido) {
  const id = (fileId || '').toString().trim();
  if (!id) throw new Error('fileId obligatorio.');

  const file = DriveApp.getFileById(id);
  const text = (nuevoContenido === null || nuevoContenido === undefined) ? '' : String(nuevoContenido);
  file.setContent(text);

  return {
    ok: true,
    file: getDriveFileMeta_(file)
  };
}

function driveLeerArchivoTextoHeadless(fileId, maxChars) {
  const id = (fileId || '').toString().trim();
  if (!id) throw new Error('fileId obligatorio.');

  const file = DriveApp.getFileById(id);
  const content = file.getBlob().getDataAsString();
  const limit = Math.max(50, Math.min(200000, Number(maxChars) || 8000));

  return {
    ok: true,
    file: getDriveFileMeta_(file),
    contentPreview: content.substring(0, limit),
    contentLength: content.length,
    truncated: content.length > limit
  };
}

function driveBorrarArchivoHeadless(fileId) {
  const id = (fileId || '').toString().trim();
  if (!id) throw new Error('fileId obligatorio.');

  const file = DriveApp.getFileById(id);
  file.setTrashed(true);

  return {
    ok: true,
    file: getDriveFileMeta_(file),
    trashed: file.isTrashed()
  };
}

function driveBorrarCarpetaHeadless(folderId) {
  const id = (folderId || '').toString().trim();
  if (!id) throw new Error('folderId obligatorio.');

  const folder = DriveApp.getFolderById(id);
  folder.setTrashed(true);

  return {
    ok: true,
    folder: getDriveFolderMeta_(folder),
    trashed: folder.isTrashed()
  };
}

function driveRestaurarArchivoHeadless(fileId) {
  const id = (fileId || '').toString().trim();
  if (!id) throw new Error('fileId obligatorio.');

  const file = DriveApp.getFileById(id);
  file.setTrashed(false);

  return {
    ok: true,
    file: getDriveFileMeta_(file),
    trashed: file.isTrashed()
  };
}

function driveRestaurarCarpetaHeadless(folderId) {
  const id = (folderId || '').toString().trim();
  if (!id) throw new Error('folderId obligatorio.');

  const folder = DriveApp.getFolderById(id);
  folder.setTrashed(false);

  return {
    ok: true,
    folder: getDriveFolderMeta_(folder),
    trashed: folder.isTrashed()
  };
}

function driveMoverArchivoHeadless(fileId, targetFolderId) {
  const id = (fileId || '').toString().trim();
  const targetId = (targetFolderId || '').toString().trim();
  if (!id) throw new Error('fileId obligatorio.');
  if (!targetId) throw new Error('targetFolderId obligatorio.');

  const file = DriveApp.getFileById(id);
  const target = DriveApp.getFolderById(targetId);
  file.moveTo(target);

  return {
    ok: true,
    targetFolder: getDriveFolderMeta_(target),
    file: getDriveFileMeta_(file)
  };
}

function driveMoverCarpetaHeadless(folderId, targetFolderId) {
  const id = (folderId || '').toString().trim();
  const targetId = (targetFolderId || '').toString().trim();
  if (!id) throw new Error('folderId obligatorio.');
  if (!targetId) throw new Error('targetFolderId obligatorio.');

  const folder = DriveApp.getFolderById(id);
  const target = DriveApp.getFolderById(targetId);
  folder.moveTo(target);

  return {
    ok: true,
    targetFolder: getDriveFolderMeta_(target),
    folder: getDriveFolderMeta_(folder)
  };
}

function driveCopiarArchivoHeadless(fileId, nuevoNombre, targetFolderId) {
  const id = (fileId || '').toString().trim();
  if (!id) throw new Error('fileId obligatorio.');

  const file = DriveApp.getFileById(id);
  const copyName = (nuevoNombre || file.getName() + ' (copia)').toString().trim();
  const target = targetFolderId ? DriveApp.getFolderById(targetFolderId.toString().trim()) : getDriveFolderSeguro_('');
  const copy = file.makeCopy(copyName, target);

  return {
    ok: true,
    targetFolder: getDriveFolderMeta_(target),
    sourceFile: getDriveFileMeta_(file),
    copyFile: getDriveFileMeta_(copy)
  };
}

const AUTOMATISMO_FN_HEALTH = 'automatismoDriveHealthCheck';
const AUTOMATISMO_FN_PULSE = 'automatismoDrivePulse';

function getAutomatismoPermitido_(functionName) {
  const fn = (functionName || '').toString().trim();
  const permitidos = {};
  permitidos[AUTOMATISMO_FN_HEALTH] = true;
  permitidos[AUTOMATISMO_FN_PULSE] = true;

  if (!permitidos[fn]) {
    throw new Error(`Automatismo no permitido: ${fn}. Permitidos: ${Object.keys(permitidos).join(', ')}`);
  }
  return fn;
}

function normalizarMinutosTrigger_(everyMinutes) {
  const permitidos = [1, 5, 10, 15, 30];
  const raw = Number(everyMinutes) || 15;
  let best = permitidos[0];
  let bestDiff = Math.abs(raw - best);
  for (let i = 1; i < permitidos.length; i++) {
    const d = Math.abs(raw - permitidos[i]);
    if (d < bestDiff) {
      bestDiff = d;
      best = permitidos[i];
    }
  }
  return best;
}

function normalizarHorasTrigger_(everyHours) {
  const permitidos = [1, 2, 4, 6, 8, 12];
  const raw = Number(everyHours) || 1;
  let best = permitidos[0];
  let bestDiff = Math.abs(raw - best);
  for (let i = 1; i < permitidos.length; i++) {
    const d = Math.abs(raw - permitidos[i]);
    if (d < bestDiff) {
      bestDiff = d;
      best = permitidos[i];
    }
  }
  return best;
}

function listarAutomatismosHeadless() {
  const all = ScriptApp.getProjectTriggers();
  const triggers = [];
  for (let i = 0; i < all.length; i++) {
    const t = all[i];
    triggers.push({
      triggerId: t.getUniqueId(),
      functionName: t.getHandlerFunction(),
      eventType: t.getEventType().toString(),
      source: t.getTriggerSource().toString()
    });
  }

  return {
    ok: true,
    total: triggers.length,
    triggers: triggers
  };
}

function borrarAutomatismosFuncionHeadless(functionName) {
  const fn = getAutomatismoPermitido_(functionName);
  const all = ScriptApp.getProjectTriggers();
  let removed = 0;

  for (let i = 0; i < all.length; i++) {
    const t = all[i];
    if (t.getHandlerFunction() === fn) {
      ScriptApp.deleteTrigger(t);
      removed++;
    }
  }

  return {
    ok: true,
    functionName: fn,
    removed: removed,
    triggers: listarAutomatismosHeadless().triggers
  };
}

function borrarAutomatismoPorIdHeadless(triggerId) {
  const id = (triggerId || '').toString().trim();
  if (!id) throw new Error('triggerId obligatorio.');

  const all = ScriptApp.getProjectTriggers();
  let removed = false;
  for (let i = 0; i < all.length; i++) {
    const t = all[i];
    if (t.getUniqueId() === id) {
      ScriptApp.deleteTrigger(t);
      removed = true;
      break;
    }
  }

  return {
    ok: true,
    triggerId: id,
    removed: removed,
    triggers: listarAutomatismosHeadless().triggers
  };
}

function crearAutomatismoMinutosHeadless(functionName, everyMinutes) {
  const fn = getAutomatismoPermitido_(functionName || AUTOMATISMO_FN_HEALTH);
  const minutes = normalizarMinutosTrigger_(everyMinutes);

  borrarAutomatismosFuncionHeadless(fn);
  const t = ScriptApp.newTrigger(fn).timeBased().everyMinutes(minutes).create();

  return {
    ok: true,
    functionName: fn,
    everyMinutes: minutes,
    triggerId: t.getUniqueId(),
    triggers: listarAutomatismosHeadless().triggers
  };
}

function crearAutomatismoHorasHeadless(functionName, everyHours) {
  const fn = getAutomatismoPermitido_(functionName || AUTOMATISMO_FN_HEALTH);
  const hours = normalizarHorasTrigger_(everyHours);

  borrarAutomatismosFuncionHeadless(fn);
  const t = ScriptApp.newTrigger(fn).timeBased().everyHours(hours).create();

  return {
    ok: true,
    functionName: fn,
    everyHours: hours,
    triggerId: t.getUniqueId(),
    triggers: listarAutomatismosHeadless().triggers
  };
}

function automatismoDriveHealthCheck() {
  const out = diagnosticoDriveGeminiHeadless();
  const save = {
    ts: new Date().toISOString(),
    driveRootOk: !!out.driveRootOk,
    gemini31ProPreviewOK: !!out.gemini31ProPreviewOK,
    gemini31Http: out.gemini31Http || 0,
    geminiKeyLeaked: !!out.geminiKeyLeaked
  };

  PropertiesService.getScriptProperties().setProperty('AUTO_DRIVE_HEALTH_LAST', JSON.stringify(save));
  return out;
}

function automatismoDrivePulse() {
  const folder = getDriveFolderSeguro_('');
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const file = folder.createFile(`drive-pulse-${stamp}.txt`, `pulse ${stamp}`, 'text/plain');
  return {
    ok: true,
    file: getDriveFileMeta_(file)
  };
}

function ejecutarAutomatismoAhoraHeadless(functionName) {
  const fn = getAutomatismoPermitido_(functionName || AUTOMATISMO_FN_HEALTH);
  if (fn === AUTOMATISMO_FN_HEALTH) return automatismoDriveHealthCheck();
  if (fn === AUTOMATISMO_FN_PULSE) return automatismoDrivePulse();
  throw new Error(`No hay ejecutor para ${fn}`);
}

function activarAutomatismoDriveRapido() {
  const out = crearAutomatismoMinutosHeadless(AUTOMATISMO_FN_HEALTH, 15);
  SpreadsheetApp.getUi().alert('Automatismo activado', `Trigger creado: ${out.triggerId}\nFuncion: ${out.functionName}\nCada: ${out.everyMinutes} minutos`, SpreadsheetApp.getUi().ButtonSet.OK);
}

function desactivarAutomatismosDrive() {
  const a = borrarAutomatismosFuncionHeadless(AUTOMATISMO_FN_HEALTH);
  const b = borrarAutomatismosFuncionHeadless(AUTOMATISMO_FN_PULSE);
  SpreadsheetApp.getUi().alert('Automatismos desactivados', `Eliminados: ${a.removed + b.removed}`, SpreadsheetApp.getUi().ButtonSet.OK);
}

function mostrarAutomatismosDrive() {
  const out = listarAutomatismosHeadless();
  const detalle = out.triggers.map(t => `${t.functionName} | ${t.eventType} | ${t.triggerId}`).join('\n') || 'Sin triggers';
  SpreadsheetApp.getUi().alert('Automatismos Drive', `Total: ${out.total}\n\n${detalle}`, SpreadsheetApp.getUi().ButtonSet.OK);
}
function gemini31ProPreviewHeadless(promptText) {
  const prompt = (promptText || '').toString().trim();
  if (!prompt) throw new Error('promptText obligatorio.');

  const apiKey = getApiKeyGemini_();
  if (!apiKey) throw new Error('Configura GEMINI_API_KEY en Script Properties.');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${apiKey}`;
  const req = {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    })
  };

  const net = fetchConReintentos_(url, req, 'Gemini 3.1 Pro Preview', 2);
  if (!net.ok) {
    const bodyTxt = net.body ? net.body.substring(0, 320) : '';
    const keyLeaked = esApiKeyFiltradaGemini_(bodyTxt);
    return {
      ok: false,
      http: net.code || 0,
      error: net.error ? (net.error.message || String(net.error)) : '',
      body: bodyTxt,
      keyLeaked: keyLeaked,
      hint: keyLeaked ? 'API key invalidada por fuga. Genera una nueva key en Google AI Studio.' : ''
    };
  }

  const raw = net.response.getContentText();
  let obj = null;
  try { obj = JSON.parse(raw); } catch (e) {}

  const text = extraerTextoGeminiRespuesta_(obj);
  return {
    ok: true,
    http: net.code || 200,
    model: 'gemini-3.1-pro-preview',
    text: text,
    raw: obj
  };
}

function esApiKeyFiltradaGemini_(bodyText) {
  const txt = (bodyText || '').toString().toLowerCase();
  return txt.includes('reported as leaked') || txt.includes('api key was reported as leaked');
}
function extraerTextoGeminiRespuesta_(resp) {
  try {
    const candidates = resp && resp.candidates ? resp.candidates : [];
    if (!Array.isArray(candidates) || candidates.length === 0) return '';

    const parts = (((candidates[0] || {}).content || {}).parts) || [];
    if (!Array.isArray(parts)) return '';

    const chunks = [];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] && typeof parts[i].text === 'string') chunks.push(parts[i].text);
    }
    return chunks.join('\n').trim();
  } catch (e) {
    return '';
  }
}
function pausaBackoff_(intento, baseMs) {
  const base = baseMs || 500;
  const jitter = Math.floor(Math.random() * 250);
  const waitMs = Math.min(5000, (Math.pow(2, Math.max(0, intento - 1)) * base) + jitter);
  Utilities.sleep(waitMs);
}

function fetchConReintentos_(url, options, etiqueta, maxRetries) {
  const retries = Math.max(1, maxRetries || CONFIG.MAX_RETRIES);
  const transient = { 408: true, 425: true, 429: true, 500: true, 502: true, 503: true, 504: true };
  let lastError = null;

  for (let i = 1; i <= retries; i++) {
    if (PropertiesService.getScriptProperties().getProperty('STOP_REQUESTED') === 'TRUE') {
      return { ok: false, aborted: true };
    }
    try {
      const resp = UrlFetchApp.fetch(url, options);
      const code = resp.getResponseCode();
      if (code >= 200 && code < 300) return { ok: true, response: resp, code: code };

      const body = resp.getContentText();
      if (transient[code] && i < retries) {
        logC(`> [RED] ${etiqueta || 'Fetch'} inestable (HTTP ${code}). Reintento ${i}/${retries}.`, 'warning');
        pausaBackoff_(i, 450);
        continue;
      }
      return { ok: false, response: resp, code: code, body: body };
    } catch (err) {
      lastError = err;
      if (i < retries) {
        logC(`> [RED] ${etiqueta || 'Fetch'} fallo temporal. Reintento ${i}/${retries}.`, 'warning');
        pausaBackoff_(i, 500);
      }
    }
  }
  return { ok: false, error: lastError };
}

// ------------------------------------------------------------------------------
// 1. REGISTROS CIBERNÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°TICOS Y ESTADO
// ------------------------------------------------------------------------------
function logC(msg, type='info') {
  Logger.log(msg); 
  try {
    const cache = CacheService.getScriptCache();
    let logsStr = cache.get('LIVE_LOGS');
    let logs = logsStr ? JSON.parse(logsStr) : [];
    let d = new Date();
    let t = ("0"+d.getHours()).slice(-2) + ":" + ("0"+d.getMinutes()).slice(-2) + ":" + ("0"+d.getSeconds()).slice(-2);
    logs.push({t: t, m: msg, c: type});
    if (logs.length > 200) logs.shift(); 
    cache.put('LIVE_LOGS', JSON.stringify(logs), 3600);
  } catch(e) {}
}

function getEstadoProgreso() {
  const p = PropertiesService.getScriptProperties();
  let logsStr = "";
  try { logsStr = CacheService.getScriptCache().get('LIVE_LOGS'); } catch(e){}
  return {
    actual: p.getProperty('CURRENT_ROW') || 0, total: p.getProperty('TOTAL_ROWS') || 0,
    fase: p.getProperty('FASE_ACTUAL') || 'Iniciando sistema corporativo...', stop: p.getProperty('STOP_REQUESTED') === 'TRUE',
    done: p.getProperty('IS_DONE') === 'TRUE', timeout: p.getProperty('TIME_OUT') === 'TRUE',
    logs: logsStr ? JSON.parse(logsStr) : []
  };
}

// ------------------------------------------------------------------------------
// 2. MENÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ DESPLEGABLE CORPORATIVO
// ------------------------------------------------------------------------------
function onOpen() { 
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('CRM AYUDAS')
    .addItem('Enviar informe (actual)', 'verificarYEnviarCorreos')
    .addItem('Ir a CORREO', 'irACorreo_')
    .addSeparator()
    .addItem('Sincronizar seguimiento', 'sbSincronizarSeguimiento')
    .addItem('Refrescar dashboard', 'sbRefrescarDashboard')
    .addItem('Reconciliar datos', 'sbReconciliarDatos')
    .addItem('Validar duplicados', 'sbValidarDuplicadosSeguimiento')
    .addToUi();
}

function irACorreo_() {
  try {
    const ss = getSpreadsheetObjetivo_();
    const sh = ss.getSheetByName('CORREO');
    if (sh) ss.setActiveSheet(sh);
  } catch (e) {}
}
function onEdit(e) {
  try {
    sbHandleSeguimientoOnEdit_(e);
    if (!e || !e.range) return;
    const range = e.range;
    const sheet = range.getSheet();
    if (!sheet || sheet.getName() !== NOMBRE_PESTANA) return;
    if (range.getRow() < 2) return;

    const colStart = range.getColumn();
    const colEnd = colStart + range.getNumColumns() - 1;
    if (colEnd < 2 || colStart > 3) return;

    const rowStart = range.getRow();
    const rowEnd = rowStart + range.getNumRows() - 1;
    for (let r = rowStart; r <= rowEnd; r++) {
      const ins = sheet.getRange(r, 3).getValue();
      aplicarPinturaFila(sheet, r, ins);
    }
  } catch (err) {}
}

function quitarProteccionesDePestanas_(ss) {
  let eliminadas = 0;
  ss.getSheets().forEach(sheet => {
    const pSheet = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
    pSheet.forEach(p => { try { p.remove(); eliminadas++; } catch (e) {} });

    const pRange = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
    pRange.forEach(p => { try { p.remove(); eliminadas++; } catch (e) {} });
  });
  return eliminadas;
}

function lanzarModoTotal() { if (!validarSeguridadPrevia_({ api: true, pass: true })) return; mostrarPromptSeguridad("TOTAL", "ESCANER TOTAL: MATRIZ Y RADAR"); }
function lanzarModoActualizar() { if (!validarSeguridadPrevia_({ api: true, pass: true })) return; mostrarPromptSeguridad("UPDATE", "MODO AUDITOR: REVISION DE MATRIZ"); }
function lanzarModoNuevas() { if (!validarSeguridadPrevia_({ api: true, pass: true })) return; mostrarPromptSeguridad("NEW", "MODO INVESTIGADOR: NUEVOS ENLACES"); }

function solicitarParada() { 
  PropertiesService.getScriptProperties().setProperty('STOP_REQUESTED', 'TRUE'); 
  PropertiesService.getScriptProperties().setProperty('IS_RUNNING', 'FALSE');
  logC("> [ALERTA] SEÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“AL DE ABORTO RECIBIDA.", "fatal"); 
}

function purgarMemoria() {
  const cfg = getConfigSeguro_();
  const p = PropertiesService.getScriptProperties();
  p.deleteAllProperties();

  const restore = {};
  if (cfg.apiKey) restore[SCRIPT_PROP_KEYS.API_KEY] = cfg.apiKey;
  if (cfg.securityPass) restore[SCRIPT_PROP_KEYS.SECURITY_PASS] = cfg.securityPass;
  if (cfg.spreadsheetId) restore[SCRIPT_PROP_KEYS.SPREADSHEET_ID] = cfg.spreadsheetId;
  if (Object.keys(restore).length > 0) p.setProperties(restore, false);

  try { CacheService.getScriptCache().remove('LIVE_LOGS'); } catch(e){}
  SpreadsheetApp.getUi().alert("ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â°ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ SISTEMA PURGADO CON ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â°XITO.\n\nMemoria operativa limpia. Credenciales y conexiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³n principal conservadas.");
}

// ------------------------------------------------------------------------------
// 3. SEGURIDAD Y CONSOLA (HTML FUTURISTA RUBEN COTON)
// ------------------------------------------------------------------------------
function mostrarPromptSeguridad(modoAccion, tituloModo) {
  const htmlStr = `<!DOCTYPE html>
<html><head><style>
  body { font-family: 'Courier New', Courier, monospace; background: #000; color: #0f0; margin: 0; padding: 15px; display: flex; flex-direction: column; height: 100vh; box-sizing: border-box; overflow: hidden; user-select: none;}
  .scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,255,0,0.05) 50%, rgba(0,255,0,0.05)); background-size: 100% 4px; pointer-events: none; z-index: 10; }
  .card { position: relative; background: #050505; border-radius: 6px; box-shadow: 0 0 35px rgba(0,255,0,0.3); display: flex; flex-direction: column; height: 100%; border: 1px solid #0f0; overflow: hidden; z-index: 1;}
  #login-view { padding: 40px 30px; text-align: center; display: flex; flex-direction: column; justify-content: center; height: 100%; }
  h2 { margin: 0 0 5px; color: #0f0; font-size: 30px; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; text-shadow: 0 0 15px #0f0;}
  p.sub { color: #0a0; font-size: 14px; margin-bottom: 20px; font-weight: bold; letter-spacing: 1px;}
  input { width: 100%; padding: 15px; border: 1px solid #0f0; background: #000; color: #0f0; letter-spacing: 5px; text-align: center; margin-bottom: 20px; font-size: 18px; outline: none; box-shadow: inset 0 0 10px #0f0;}
  .btn-primary { background: #000; border: 1px solid #0f0; color: #0f0; padding: 15px; font-weight: bold; cursor: pointer; text-transform: uppercase; width: 100%; transition: 0.2s; font-family: 'Courier New', Courier, monospace;}
  .btn-primary:hover { background: #0f0; color: #000; box-shadow: 0 0 20px #0f0;}
  #error { color: #f00; font-size: 13px; font-weight: bold; margin-bottom: 20px; display: none; text-shadow: 0 0 5px #f00;}
  #console-view { display: none; flex-direction: column; height: 100%; padding: 15px; box-sizing: border-box;}
  .header-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #0f0; padding-bottom: 12px; margin-bottom: 12px; }
  .title { color: #0f0; font-weight: bold; font-size: 16px; text-shadow: 0 0 5px #0f0;}
  .progress-badge { background: #0f0; color: #000; padding: 5px 12px; font-weight: bold; box-shadow: 0 0 10px #0f0;}
  .phase { font-size: 14px; color: #0a0; font-weight: bold; margin-bottom: 10px;}
  #terminal { flex-grow: 1; background: #000; border: 1px solid #0f0; padding: 12px; font-size: 12.5px; overflow-y: auto; color: #0f0; margin-bottom: 15px; white-space: pre-wrap; line-height: 1.4; user-select: text; box-shadow: inset 0 0 20px rgba(0,255,0,0.2);}
  .btn-group { display: flex; gap: 10px; }
  .btn-copy { background: #0f0; color: #000; flex: 1; border: none; padding: 14px; font-weight: bold; cursor: pointer; font-family: 'Courier New', Courier, monospace;}
  .btn-continue { background: #000; border: 2px solid #ffeb3b; color: #ffeb3b; flex: 2; padding: 14px; font-weight: bold; cursor: pointer; display: none; font-family: 'Courier New', Courier, monospace; animation: pulse 1.5s infinite;}
  @keyframes pulse { 0% { box-shadow: 0 0 5px #ffeb3b; } 50% { box-shadow: 0 0 15px #ffeb3b; } 100% { box-shadow: 0 0 5px #ffeb3b; } }
  .btn-abort { background: #000; border: 1px solid #f00; color: #f00; flex: 1; padding: 14px; font-weight: bold; cursor: pointer; font-family: 'Courier New', Courier, monospace;}
  .btn-abort:hover { background: #f00; color: #000; box-shadow: 0 0 15px #f00;}
  .signature { text-align: center; font-size: 11px; color: #0a0; margin-top: 12px; font-weight: bold; letter-spacing: 2px;}
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #000; border-left: 1px solid #0f0;}
  ::-webkit-scrollbar-thumb { background: #0f0; }
</style></head><body>
<div class="scanlines"></div>
<div class="card">
  <div id="login-view">
    <div style="font-size:60px; margin-bottom:10px; text-shadow: 0 0 25px #0f0;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢</div>
    <h2>SISTEMA RUBEN COTON</h2>
    <p class="sub">${tituloModo}</p>
    <div style="border-top: 1px solid #0f0; border-bottom: 1px solid #0f0; padding: 10px 0; margin-bottom: 25px; background: rgba(0,255,0,0.05);">
        <p style="color: #0a0; font-size: 10px; margin: 0; letter-spacing: 2px;">SOFTWARE ARCHITECTURE BY</p>
        <p style="color: #fff; font-size: 18px; margin: 5px 0 0 0; font-weight: bold; letter-spacing: 4px; text-shadow: 0 0 10px rgba(255,255,255,0.5);">RUBEN COTON</p>
    </div>
    <input type="password" id="passInput" placeholder="CLAVE DE ACCESO">
    <div id="error">ACCESO DENEGADO</div>
    <button class="btn-primary" id="acceptBtn" onclick="verify('${modoAccion}')">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â INICIAR ESCÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂNER</button>
  </div>
  <div id="console-view">
    <div class="header-row"><div class="title">> ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â» TERMINAL RUBEN COTON</div><div class="progress-badge" id="progreso">0%</div></div>
    <div class="phase" id="fase">ESTABLECIENDO CONEXIÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN...</div>
    <div id="terminal">Cargando mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³dulos analÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­ticos...</div>
    <div class="btn-group">
      <button class="btn-copy" onclick="copiarLogsRaw()" id="copyBtn">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ LOGS</button>
      <button class="btn-continue" onclick="continuarEscaneo('${modoAccion}')" id="continueBtn">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â CONTINUAR ESCÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂNER</button>
      <button class="btn-abort" onclick="cancelar()" id="abortBtn">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“ ABORTAR</button>
    </div>
    <div class="signature">/// ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© ${new Date().getFullYear()} RUBEN COTON - ALL RIGHTS RESERVED ///</div>
  </div>
</div>
<script>
  let textoPuro = ""; let currentInterval = null;
  const p = document.getElementById('passInput'); p.addEventListener('keypress', e => { if (e.key === 'Enter') verify('${modoAccion}'); });
  function verify(m) {
    const btn = document.getElementById('acceptBtn'); btn.disabled = true; btn.innerText = 'AUTENTICANDO...';
    google.script.run.withSuccessHandler(v => {
      if(v) { document.getElementById('login-view').style.display = 'none'; document.getElementById('console-view').style.display = 'flex'; google.script.run.ejecutorMaestro(m); startPolling(m); } 
      else { document.getElementById('error').style.display = 'block'; btn.disabled = false; btn.innerText = 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¶ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â INICIAR ESCÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂNER'; }
    }).validarContrasenaServidor(p.value); 
  }
  function startPolling(m) {
    if (currentInterval) clearInterval(currentInterval);
    currentInterval = setInterval(() => {
      google.script.run.withSuccessHandler(res => {
        let pct = Math.floor(((parseInt(res.actual)||0) / (parseInt(res.total)||1)) * 100); if (pct > 100) pct = 100;
        if (res.timeout) { document.getElementById('fase').innerText = "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â LÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂMITE DE SEGURIDAD (PULSA CONTINUAR)"; document.getElementById('fase').style.color = "#ffeb3b"; document.getElementById('abortBtn').style.display = 'none'; document.getElementById('continueBtn').style.display = 'block'; clearInterval(currentInterval); } 
        else if (res.done) { document.getElementById('fase').innerText = "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ OPERACIÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN COMPLETADA"; document.getElementById('fase').style.color = "#0f0"; document.getElementById('abortBtn').style.display = 'none'; document.getElementById('continueBtn').style.display = 'none'; clearInterval(currentInterval); } 
        else if (res.stop) { document.getElementById('fase').innerText = "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â SISTEMA DETENIDO"; document.getElementById('fase').style.color = "#f00"; document.getElementById('abortBtn').style.display = 'none'; document.getElementById('continueBtn').style.display = 'none'; clearInterval(currentInterval); } 
        else { document.getElementById('fase').innerText = res.fase; document.getElementById('continueBtn').style.display = 'none'; document.getElementById('abortBtn').style.display = 'block'; }
        document.getElementById('progreso').innerText = (res.done ? "100" : pct) + "%";
        if (res.logs && res.logs.length > 0) {
          textoPuro = res.logs.map(l => \`[\${l.t}] [\${l.c.toUpperCase()}] \${l.m}\`).join('\\n');
          let newHtml = res.logs.map(l => {
            let c = '#0f0'; let es = '';
            if(l.c==='error') c='#f00'; else if(l.c==='fatal'){c='#000'; es='background:#f00; font-weight:bold; padding:0 4px;';} else if(l.c==='title') {c='#fff'; es='font-weight:bold; text-decoration:underline;';} else if(l.c==='warning') c='#ffeb3b'; else if(l.c==='scan') c='#0ff'; else if(l.c==='system') c='#b388ff';
            return \`<span style="color:#050">[\${l.t}]</span> <span style="color:\${c};\${es}">\${l.m}</span>\`;
          }).join('<br>');
          let term = document.getElementById('terminal'); if (term.innerHTML !== newHtml) { term.innerHTML = newHtml; term.scrollTop = term.scrollHeight; }
        }
      }).getEstadoProgreso();
    }, 1000); 
  }
  function continuarEscaneo(m) { document.getElementById('continueBtn').style.display='none'; document.getElementById('abortBtn').style.display='block'; document.getElementById('fase').innerText="ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ REANUDANDO..."; document.getElementById('fase').style.color="#0f0"; google.script.run.ejecutorMaestro(m); startPolling(m); }
  function copiarLogsRaw() { navigator.clipboard.writeText(textoPuro).then(() => { document.getElementById('copyBtn').innerText='ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡COPIADO!'; setTimeout(()=>document.getElementById('copyBtn').innerText='ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ LOGS', 3000); }); }
  function cancelar() { document.getElementById('abortBtn').innerText='CORTANDO...'; document.getElementById('abortBtn').disabled=true; google.script.run.solicitarParada(); }
</script></body></html>`;
  SpreadsheetApp.getUi().showModelessDialog(HtmlService.createHtmlOutput(htmlStr).setWidth(680).setHeight(620), 'ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â» TERMINAL RUBEN COTON');
}
function validarContrasenaServidor(pass) { const saved = getContrasenaSistema_(); if (!saved || saved.length < 6) return false; return pass === saved; }

// ------------------------------------------------------------------------------
// 4. MÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œDULO DE CORREOS (SISTEMA DE ENVÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂOS DINÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂMICO INFINITO)
// ------------------------------------------------------------------------------
function verificarYEnviarCorreos() {
  var ui = SpreadsheetApp.getUi();
  if (!validarSeguridadPrevia_({ pass: true })) return;

  var pass = ui.prompt('SISTEMA DE ENVIOS RUBEN COTON', 'Introduce la contrasena ejecutiva para lanzar el modulo de marketing:', ui.ButtonSet.OK_CANCEL);
  if (pass.getSelectedButton() == ui.Button.OK) {
    if (pass.getResponseText() === getContrasenaSistema_()) { enviarInformes(); }
    else { ui.alert('ACCESO DENEGADO', 'Contrasena incorrecta.', ui.ButtonSet.OK); }
  }
}

function enviarInformes() {
  var ui = SpreadsheetApp.getUi();
  var respuesta = ui.alert('CONFIRMACION DE ENVIO', 'Confirmas el envio masivo del boletin con los concursos "ABIERTOS" a TODAS las bandas registradas en la tabla?', ui.ButtonSet.YES_NO);
  if (respuesta !== ui.Button.YES) return;

  var ss = getSpreadsheetObjetivo_();
  var hojaCorreo = ss.getSheetByName('CORREO');
  var hojaBandas = ss.getSheetByName('BANDAS');
  var hojaConcursos = ss.getSheetByName('CONCURSOS'); 

  if (!hojaCorreo || !hojaBandas || !hojaConcursos) { ui.alert('Error', 'Faltan pestanas base.', ui.ButtonSet.OK); return; }

  var asunto = hojaCorreo.getRange('B3').getValue() || "Nuevas Oportunidades Musicales";
  var mensajeBase = hojaCorreo.getRange('B6').getValue() || "Aqui tienes los concursos abiertos que hemos seleccionado:";
  var logoArtesBuho = "https://drive.google.com/uc?export=view&id=1v_diiowsZcpK2z2radCfSjlYPmqHtTz8";

  var dataSub = hojaConcursos.getDataRange().getValues();
  var concursosHTML = ""; var concursosEncontrados = 0;

  for (var i = 1; i < dataSub.length; i++) {
    var estadoInscripcion = dataSub[i][2]; 
    if (estadoInscripcion && estadoInscripcion.toString().trim().toUpperCase() === "ABIERTA") {
      concursosEncontrados++;
      var fLim = (dataSub[i][3] instanceof Date) ? Utilities.formatDate(dataSub[i][3], ss.getSpreadsheetTimeZone(), "dd/MM/yyyy") : (dataSub[i][3] || "No publicada");
      
      var linksHTML = [];
      let l1 = dataSub[i][11]?dataSub[i][11].toString().trim():""; let l2 = dataSub[i][12]?dataSub[i][12].toString().trim():""; let l3 = dataSub[i][13]?dataSub[i][13].toString().trim():"";
      if(l1.startsWith("http")) linksHTML.push(`<a href="${l1}" style="color: #8B0000; text-decoration: none; font-weight: bold;">[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â Bases Actuales]</a>`);
      if(l2.startsWith("http")) linksHTML.push(`<a href="${l2}" style="color: #555; text-decoration: underline; font-size: 13px;">[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ Bases Anteriores]</a>`);
      if(l3.startsWith("http")) linksHTML.push(`<a href="${l3}" style="color: #555; text-decoration: underline; font-size: 13px;">[ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Info Extra]</a>`);
      
      concursosHTML += `
        <div style="margin-bottom: 25px; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #fafafa;">
          <h2 style="color: #8B0000; margin-top: 0; border-bottom: 2px solid #8B0000; padding-bottom: 5px; text-transform: uppercase;">${dataSub[i][0] || "Sin nombre"}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <tr>
              <td style="width: 50%; vertical-align: top;">
                <h4 style="margin: 0 0 5px; color: #333;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ FECHAS</h4>
                <ul style="margin-top: 0; padding-left: 20px; font-size: 14px; color: #444;">
                  <li><strong>LÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­mite:</strong> <span style="color:#d32f2f; font-weight:bold;">${fLim}</span></li>
                  <li><strong>Desarrollo:</strong> ${dataSub[i][4] || "-"}</li>
                </ul>
              </td>
              <td style="width: 50%; vertical-align: top;">
                <h4 style="margin: 0 0 5px; color: #333;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â UBICACIÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN</h4>
                <ul style="margin-top: 0; padding-left: 20px; font-size: 14px; color: #444;">
                  <li>${dataSub[i][8]||"-"}, ${dataSub[i][9]||"-"} (${dataSub[i][10]||"-"})</li>
                </ul>
              </td>
            </tr>
          </table>
          <h4 style="margin: 0 0 5px; color: #333;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â  PREMIO</h4>
          <ul style="margin-top: 0; padding-left: 20px; font-size: 14px; color: #444; margin-bottom: 15px;">
            <li><strong>Tipo:</strong> ${dataSub[i][5]||"-"}</li>
            <li><strong>Detalles:</strong> ${dataSub[i][6]||"-"}</li>
            <li><strong>Dirigido a:</strong> ${dataSub[i][7]||"-"}</li>
          </ul>
          <p style="background-color: #fce4ec; padding: 10px; border-radius: 5px; font-size: 14px;"><strong>ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ENLACES:</strong> ${linksHTML.length>0 ? linksHTML.join(" &nbsp;|&nbsp; ") : "No especificado"}</p>
          <p style="font-size: 12px; color: #555;"><strong>ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ CONTACTO:</strong> ${dataSub[i][14]||"-"} | ${dataSub[i][15]||"-"}<br><strong>ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â NOTAS:</strong> ${dataSub[i][16]||"Ninguna"}</p>
        </div>`;
    }
  }

  if (concursosEncontrados === 0) { ui.alert('ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Cancelado', 'No hay concursos marcados como "ABIERTA".', ui.ButtonSet.OK); return; }

  // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â  LECTURA DINÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂMICA DE BANDAS HASTA EL INFINITO
  var lastRowBandas = hojaBandas.getLastRow();
  if (lastRowBandas < 2) { ui.alert('ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Error', 'No hay bandas registradas en la tabla.', ui.ButtonSet.OK); return; }
  
  var dataBandas = hojaBandas.getRange(2, 1, lastRowBandas - 1, 3).getValues();
  var fechaActualStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "dd/MM/yyyy HH:mm");
  var fechasActualizadas = []; var enviosExitosos = 0;

  for (var j = 0; j < dataBandas.length; j++) {
    var nombreBanda = dataBandas[j][0]; 
    var emailBanda = dataBandas[j][1];  
    var fechaAntigua = dataBandas[j][2]; 

    // Ignora filas en blanco sin romper el bucle infinito
    if (!nombreBanda || nombreBanda.toString().trim() === "") { 
        fechasActualizadas.push([fechaAntigua]); 
        continue; 
    }

    if (emailBanda && typeof emailBanda === 'string' && emailBanda.includes("@")) {
      var cuerpoCorreoHTML = `
        <div style="font-family: 'Segoe UI', sans-serif; color: #333; max-width: 650px; margin: auto; padding: 25px; border: 1px solid #f0f0f0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;"><img src="${logoArtesBuho}" alt="Artes BÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºho Logo" style="max-width: 150px;"></div>
          <h1 style="font-size: 20px; color: #222;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡Hola, ${nombreBanda}!</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #444; white-space: pre-wrap; margin-bottom: 20px;">${mensajeBase}</p>
          
          <div style="background-color: #fff9c4; border-left: 4px solid #fbc02d; padding: 15px; margin-bottom: 30px; font-size: 13px; color: #555;">
            <h4 style="margin: 0 0 10px 0; color: #f57f17; font-size: 14px;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â NUESTRO SISTEMA DE ANÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂLISIS A&R</h4>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
              <li><strong>"ABIERTA":</strong> Nuestro equipo de anÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡lisis te avisa desde <strong>3 meses antes</strong> de su fecha lÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­mite para que prepares tu propuesta con ventaja.</li>
              <li><strong>"ESTIMADO":</strong> Si la organizaciÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³n aÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºn no publica las fechas oficiales, nuestro equipo calcula matemÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ticamente los plazos basÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ndose en ediciones anteriores para avisarte el primero.</li>
              <li><strong>Cierre:</strong> El concurso desaparece de la lista en el momento exacto en que la fecha se cumple.</li>
            </ul>
          </div>
          ${concursosHTML}
          <div style="text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
            <p>Generado en exclusiva para ti. Con ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¤ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â desde el equipo de <strong>Artes BÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºho</strong>.</p>
            <p style="margin-top: 15px; font-size: 10px; font-weight: bold; color: #d4af37;">ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© ${new Date().getFullYear()} SOFTWARE ARCHITECTURE BY RUBEN COTON</p>
          </div>
        </div>`;
      try { MailApp.sendEmail({ to: emailBanda.toString().trim(), subject: asunto, htmlBody: cuerpoCorreoHTML }); fechasActualizadas.push(["Enviado: " + fechaActualStr]); enviosExitosos++; } 
      catch(err) { fechasActualizadas.push([fechaAntigua]); }
    } else { fechasActualizadas.push([fechaAntigua]); }
  }
  if (fechasActualizadas.length > 0) hojaBandas.getRange(2, 3, fechasActualizadas.length, 1).setValues(fechasActualizadas);
  ui.alert('ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ BOLETÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂN ENVIADO', `Se ha enviado con ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©xito el boletÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­n a ${enviosExitosos} bandas.`, ui.ButtonSet.OK);
}

// ------------------------------------------------------------------------------
// 5. ARQUITECTURA VISUAL MATRIZ (Destacados y Bloqueos)
// ------------------------------------------------------------------------------
function aplicarDiseno(hoja, hojaNuevos) {
  try {
    let maxCols = hoja.getMaxColumns(); 
    const cabecera = hoja.getRange(1, 1, 1, maxCols);
    cabecera.setBackground(BRAND_COLORS.PRIMARY).setFontColor(BRAND_COLORS.HEADER_TEXT).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true,true,true,true,true,true,BRAND_COLORS.BORDER,SpreadsheetApp.BorderStyle.SOLID_THICK);
    hoja.setRowHeight(1, 60); hoja.setFrozenRows(1);
    // Sin protecciones automaticas: la hoja queda totalmente editable para colaboradores.
    try { quitarProteccionesDePestanas_(hoja.getParent()); } catch (e) {}


    if (hoja.getFilter() !== null) hoja.getFilter().remove();
    hoja.getRange(1, 1, Math.max(2, hoja.getLastRow()), maxCols).createFilter();
    
    if (hojaNuevos) {
      let maxColsNuevos = hojaNuevos.getMaxColumns();
      if (maxColsNuevos > 0) {
        const cabNuevos = hojaNuevos.getRange(1, 1, 1, maxColsNuevos);
        cabNuevos.setBackground(BRAND_COLORS.PRIMARY).setFontColor(BRAND_COLORS.HEADER_TEXT).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
        hojaNuevos.setRowHeight(1, 40); hojaNuevos.setFrozenRows(1);
      }
    }
    SpreadsheetApp.flush();
  } catch(e){}
}

function aplicarPinturaFila(sheet, filaIndex, inscripcion) {
  try {
    let maxCols = sheet.getMaxColumns();
    let rangoFilaEntera = sheet.getRange(filaIndex, 1, 1, maxCols);

    rangoFilaEntera.clearFormat();
    rangoFilaEntera
      .setFontFamily('Roboto')
      .setFontSize(10)
      .setFontWeight('normal')
      .setVerticalAlignment('middle')
      .setWrap(true)
      .setBorder(true, true, true, true, true, true, '#cccccc', SpreadsheetApp.BorderStyle.SOLID)
      .setFontColor('#333333');

    let bg = '#FFFFFF';
    let estadoInscripcion = normalizarValor_(inscripcion);
    if (estadoInscripcion === 'ABIERTA') bg = BRAND_COLORS.OPEN_BG;
    else if (estadoInscripcion === 'CERRADA') bg = BRAND_COLORS.CLOSED_BG;
    else if (estadoInscripcion === 'SIN PUBLICAR') bg = BRAND_COLORS.DRAFT_BG;
    rangoFilaEntera.setBackground(bg);

    sheet.getRange(filaIndex, 1).setFontWeight('bold').setFontSize(12).setFontColor('#000000');
    sheet.getRange(filaIndex, 2, 1, 4).setHorizontalAlignment('center');
    sheet.getRange(filaIndex, 6, 1, 1).setHorizontalAlignment('center');

    let urlRango = sheet.getRange(filaIndex, 12, 1, 3);
    urlRango.setFontSize(8).setVerticalAlignment('top').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    let urls = urlRango.getValues()[0];
    for (let c = 0; c < 3; c++) {
      let val = urls[c] ? urls[c].toString().trim() : '';
      if (val.startsWith('http')) sheet.getRange(filaIndex, 12 + c).setFontColor(BRAND_COLORS.LINK).setFontLine('underline');
      else sheet.getRange(filaIndex, 12 + c).setFontColor('#333333').setFontLine('none');
    }

    // Mantiene dropdown editable y preserva estilos tipo chip cuando existen.
    asegurarValidacionesFila_(sheet, filaIndex);

    const estadoCell = sheet.getRange(filaIndex, 2);
    const inscripcionCell = sheet.getRange(filaIndex, 3);
    const estadoVal = normalizarValor_(estadoCell.getValue());
    const inscripcionVal = normalizarValor_(inscripcionCell.getValue());

    aplicarChipEnCelda_(estadoCell, ESTADO_CHIP_STYLE[estadoVal] || CHIP_DEFAULT_STYLE);
    aplicarChipEnCelda_(inscripcionCell, INSCRIPCION_CHIP_STYLE[inscripcionVal] || CHIP_DEFAULT_STYLE);
  } catch(e) {}
}

function calcularEstado90Dias(fechaLimiteStr) {
  if (!fechaLimiteStr || fechaLimiteStr.toUpperCase().includes("NO PUBLICADO") || fechaLimiteStr.toUpperCase().includes("SIN PUBLICAR")) return "SIN PUBLICAR";
  let cleanDate = fechaLimiteStr.replace(/ESTIMADO:?\s*/i, "").trim();
  let match = cleanDate.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (!match) return "SIN PUBLICAR";
  
  let d = parseInt(match[1], 10), m = parseInt(match[2], 10) - 1, y = parseInt(match[3], 10);
  let fLimite = new Date(y, m, d, 23, 59, 59, 999); let hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  let diffDias = Math.floor((fLimite.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
  if (diffDias < 0) return "CERRADA";
  if (diffDias >= 0 && diffDias <= 90) return "ABIERTA";
  return "SIN PUBLICAR";
}

// ------------------------------------------------------------------------------
// 6. LECTOR MULTIMODAL CUÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂNTICO (PDF A BINARIO)
// ------------------------------------------------------------------------------
function extraerWeb(url) {
  if (!url || !url.startsWith('http')) return { type: 'none' };

  let cleanUrl = url.trim();

  // Interceptor Google Drive: convierte URL visual en descarga directa.
  if (cleanUrl.includes("drive.google.com/file/d/")) {
    let match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      cleanUrl = `https://drive.google.com/uc?export=download&id=${match[1]}`;
      logC(`> [ESCANER] Enlace de Google Drive detectado. Extrayendo archivo...`, 'scan');
    }
  }

  // Google Docs y Sheets: export directo para evitar HTML complejo.
  if (cleanUrl.includes("docs.google.com/document/d/")) {
    let mDoc = cleanUrl.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (mDoc && mDoc[1]) cleanUrl = `https://docs.google.com/document/d/${mDoc[1]}/export?format=txt`;
  }
  if (cleanUrl.includes("docs.google.com/spreadsheets/d/")) {
    let mSheet = cleanUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (mSheet && mSheet[1]) {
      let mGid = cleanUrl.match(/[?#&]gid=(\d+)/);
      let gid = (mGid && mGid[1]) ? `&gid=${mGid[1]}` : '';
      cleanUrl = `https://docs.google.com/spreadsheets/d/${mSheet[1]}/export?format=csv${gid}`;
    }
  }

  logC(`> [ESCANER] Conectando a red: ${cleanUrl.substring(0, 35)}...`, 'scan');
  Utilities.sleep(300);

  const fetchRes = fetchConReintentos_(
    cleanUrl,
    {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: { "User-Agent": "Mozilla/5.0 (AppsScript CRM V-GOD)" }
    },
    'Extraccion Web',
    CONFIG.MAX_RETRIES + 1
  );

  if (fetchRes.aborted) return { type: 'none' };
  if (!fetchRes.ok) {
    if (fetchRes.code) logC(`> [ESCANER] Host inaccesible (HTTP ${fetchRes.code}).`, 'error');
    else logC(`> [ESCANER] Servidor caido o error de red.`, 'error');
    return { type: 'none' };
  }

  const r = fetchRes.response;
  const headers = r.getHeaders() || {};
  const ct = (headers['Content-Type'] || headers['content-type'] || '').toString().toLowerCase();

  // Deteccion y decodificacion de PDF a base64.
  if (cleanUrl.toLowerCase().includes('.pdf') || ct.includes('application/pdf') || ct.includes('octet-stream')) {
    logC(`> [ESCANER] Documento PDF detectado. Extrayendo binario...`, 'success');
    try {
      const blob = r.getBlob();
      if (blob.getBytes().length > CONFIG.MAX_PDF_SIZE_MB * 1024 * 1024) {
        logC(`> [ALERTA] PDF excede limite de ${CONFIG.MAX_PDF_SIZE_MB}MB. Omitiendo lectura profunda.`, 'warning');
        return { type: 'none' };
      }
      const b64 = Utilities.base64Encode(blob.getBytes());
      return { type: 'pdf', mimeType: 'application/pdf', data: b64, url: cleanUrl };
    } catch (errPDF) {
      logC(`> [ERROR] No se pudo decodificar el PDF.`, 'error');
      return { type: 'none' };
    }
  }

  logC(`> [ESCANER] Web HTML/TXT leida. Purgando ruido...`, 'success');
  let rawText = '';
  try { rawText = r.getContentText(); } catch (e) { rawText = Utilities.newBlob(r.getContent()).getDataAsString(); }
  let sr = rawText
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  let clean = sr.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 90000);
  return { type: 'text', content: clean };
}

function llamarIA(prompt, webObj, fallback, fStr, yr, isArray = false) {
  let idxMotor = parseInt(PropertiesService.getScriptProperties().getProperty('IDX_MOTOR')) || 0;
  if (idxMotor >= MOTORES_SISTEMA.length || isNaN(idxMotor)) { 
      idxMotor = 0; PropertiesService.getScriptProperties().setProperty('IDX_MOTOR', '0'); 
  }

  let claveLimpia = getApiKeyGemini_();
  if (!claveLimpia || claveLimpia.length < 20) {
    logC(`> [FATAL] CLAVE API NO CONFIGURADA EN SCRIPT PROPERTIES.`, "fatal");
    PropertiesService.getScriptProperties().setProperty("STOP_REQUESTED", "TRUE");
    return { fatal_error: true };
  }
  const sys = `Eres un equipo de analistas humanos, expertos en A&R para RUBEN COTON. HOY ES: ${fStr}. AÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¹Ãƒâ€¦Ã¢â‚¬Å“O: ${yr}.
PIENSA PASO A PASO ANTES DE RESPONDER. Usa tu mÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡xima capacidad de razonamiento deductivo.
REGLAS VITALES E INQUEBRANTABLES:
1. 'fechaLimite': NUNCA la dejes vacÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­a. Si no encuentras la fecha oficial de este aÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±o en la web o el PDF, ESTÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂMALA matemÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ticamente sumando 1 aÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±o al histÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rico y pon OBLIGATORIAMENTE "ESTIMADO: DD/MM/YYYY".
2. 'fechasDesarrollo': SOLO EL MES. Si lo estimas, pon "ESTIMADO: [Mes]".
3. 'tipoPremio': "ECONOMICO", "SERVICIO", "ACTUACION", "RESIDENCIA" o "VARIOS".
4. UBICACIÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN: Determina 'municipio', 'provincia', y 'pais' con precisiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³n.
5. ENLACES (REGLA DE HIERRO): Si el concurso estÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ ABIERTO y la 'fechaLimite' NO tiene la palabra "ESTIMADO" (es decir, ya han publicado las fechas oficiales de este aÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±o), ES OBLIGATORIO que extraigas y pongas la URL de las bases actuales en 'link1'. ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡PROHIBIDO DEJAR 'link1' VACÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂO EN ESTE CASO!
6. CONTACTO: Busca 'email' y 'telefono'.
7. '_razonamiento_logico': Escribe tu REPORTE DE ANÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂLISIS detallando por quÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© has estimado esas fechas y decisiones. RedÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ctalo de forma impecable como un equipo humano experto. ESTÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ESTRICTAMENTE PROHIBIDO MENCIONAR QUE ERES UNA INTELIGENCIA ARTIFICIAL O UN MODELO DE LENGUAJE.
8. 'inscripcion': DÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©jalo SIEMPRE vacÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­o o "No publicado".`;
  
  let parts = [{ "text": prompt }];
  
  // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ INYECCIÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN MULTIMODAL DE DATOS O PDF BASE64 DIRECTO A GOOGLE
  if (webObj.type === 'text') {
    parts.push({ "text": "Contenido de la web:\n" + webObj.content });
  } else if (webObj.type === 'pdf') {
    parts.push({ "text": `Por favor, analiza minuciosamente este documento PDF original adjunto en cÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³digo binario (base64) para extraer los datos requeridos:` });
    parts.push({ "inlineData": { "mimeType": webObj.mimeType, "data": webObj.data } });
  } else {
    parts.push({ "text": `[SIN CONEXIÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN EXTERNA] Deduce y estima obligatoriamente basÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ndote en el histÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³rico: ${fallback}` });
  }

  const baseSchema = { "type": "OBJECT", "properties": { "nombreConcurso": {"type": "STRING"}, "_razonamiento_logico": {"type": "STRING"}, "inscripcion": {"type": "STRING"}, "fechaLimite": {"type": "STRING"}, "fechasDesarrollo": {"type": "STRING"}, "tipoPremio": {"type": "STRING"}, "detallePremio": {"type": "STRING"}, "dirigidoA": {"type": "STRING"}, "municipio": {"type": "STRING"}, "provincia": {"type": "STRING"}, "pais": {"type": "STRING"}, "link1": {"type": "STRING"}, "link2": {"type": "STRING"}, "link3": {"type": "STRING"}, "email": {"type": "STRING"}, "telefono": {"type": "STRING"}, "notas": {"type": "STRING"} }, "required": ["nombreConcurso", "_razonamiento_logico", "inscripcion", "fechaLimite", "fechasDesarrollo", "tipoPremio", "detallePremio", "dirigidoA", "municipio", "provincia", "pais", "link1", "link2", "link3", "email", "telefono", "notas"] };
  const finalSchema = isArray ? { "type": "ARRAY", "items": baseSchema } : baseSchema;
  
  const payload = { "systemInstruction": { "parts": [{ "text": sys }] }, "contents": [{ "role": "user", "parts": parts }], "generationConfig": { "responseMimeType": "application/json", "temperature": 0.1, "maxOutputTokens": 8192, "responseSchema": finalSchema } };
  let opt = { "method": "post", "contentType": "application/json", "payload": JSON.stringify(payload), "muteHttpExceptions": true, "followRedirects": true, "headers": { "User-Agent": "Mozilla/5.0 (AppsScript CRM V-GOD)" } };

  for (let i = 1; i <= CONFIG.MAX_RETRIES; i++) {
    if (PropertiesService.getScriptProperties().getProperty('STOP_REQUESTED') === 'TRUE') return null; 
    try {
      let motorActual = MOTORES_SISTEMA[idxMotor];
      let urlAPI = `https://generativelanguage.googleapis.com/v1beta/models/${motorActual}:generateContent?key=${claveLimpia}`;

      logC(`> [ANALISTA DE SISTEMAS] Procesando con motor oficial ${motorActual}...`, 'system'); Utilities.sleep(1500); 
      const net = fetchConReintentos_(urlAPI, opt, `Gemini ${motorActual}`, 2);
      if (net.aborted) return null;
      const c = net.ok ? net.code : (net.code || 0);
      const t = net.ok ? net.response.getContentText() : (net.body || (net.error ? String(net.error) : ""));
      
      if (c === 200) {
        logC(`> [ANALISTA DE SISTEMAS] ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Datos descifrados y estructurados con ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©xito.`, 'success');
        let pR = JSON.parse(t);
        if (pR.candidates && pR.candidates.length > 0 && pR.candidates[0].content) {
            let match = pR.candidates[0].content.parts[0].text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
            if (match) { let j = JSON.parse(match[0]); if (!isArray) { logC(`> [REPORTE RUBEN COTON]: ${j._razonamiento_logico}`, 'system'); } return j; }
        }
      } else {
        let eTxt = t; try{ eTxt = JSON.parse(t).error.message; }catch(e){}
        if (c === 429) { logC(`> [SISTEMA] Red saturada. Pausando 2s...`, 'warning'); Utilities.sleep(2000); continue; }
        if (c === 400 && eTxt.toLowerCase().includes('key')) { logC(`> [FATAL] CLAVE API INVÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂLIDA.`, "fatal"); PropertiesService.getScriptProperties().setProperty('STOP_REQUESTED', 'TRUE'); return { fatal_error: true }; }
        
        logC(`> [ERROR] Motor ${motorActual} denegÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³ conexiÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³n (HTTP ${c}).`, 'error');
        
        // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ MUTACIÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œN DE MOTOR EN CASCADA ANTI-404 INMORTAL
        if (c === 404 || c === 403 || c >= 500) { 
            idxMotor++; if (idxMotor >= MOTORES_SISTEMA.length) { 
                logC(`> [FATAL] Todos los servidores oficiales cayeron. Omitiendo fila.`, 'error');
                idxMotor = 0; 
                PropertiesService.getScriptProperties().setProperty('IDX_MOTOR', '0');
                return null; 
            } 
            PropertiesService.getScriptProperties().setProperty('IDX_MOTOR', idxMotor.toString());
            logC(`> [SISTEMA] Mutando nÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºcleo de lectura a: ${MOTORES_SISTEMA[idxMotor]}...`, 'warning'); 
            i--; continue; 
        }
        Utilities.sleep(1500); 
      }
    } catch (e) { logC(`> [SISTEMA ERROR] Fallo de red local.`, 'error'); Utilities.sleep(1500); }
  } return null;
}

// ------------------------------------------------------------------------------
// 7. ENRUTADOR MAESTRO (LOS 3 MODOS DE BÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡SQUEDA)
// ------------------------------------------------------------------------------
function ejecutorMaestro(modoReq) {
  const p = PropertiesService.getScriptProperties();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) { logC("> [ALERTA ROJA] Otro proceso mantiene el lock del sistema.", "error"); return; }

  try {
    if (p.getProperty('IS_RUNNING') === 'TRUE') { logC("> [ALERTA ROJA] Proceso en curso.", "error"); return; }
    p.setProperty('IS_RUNNING', 'TRUE');

    let isResuming = p.getProperty('TIME_OUT') === 'TRUE';
    let modo = isResuming ? p.getProperty('RUN_MODE') : modoReq;

    if (!isResuming) {
      try { CacheService.getScriptCache().remove('LIVE_LOGS'); } catch(e){}
      p.setProperty('RUN_MODE', modo);
      p.setProperty('IDX_MOTOR', '0');
      logC(`\n================================================`, 'title');
      logC(`> INICIANDO MATRIZ V-GOD OMEGA ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© RUBEN COTON [MODO: ${modo}]`, "title");
      logC(`================================================`, 'title');
    } else {
      logC(`\n> REANUDANDO ESCANER...`, "title");
      p.setProperty('TIME_OUT', 'FALSE');
    }

    const apiKey = getApiKeyGemini_();
    if (!apiKey || apiKey.length < 20) {
      logC("> [FATAL] Configura GEMINI_API_KEY en Script Properties.", "fatal");
      p.setProperty('IS_RUNNING', 'FALSE');
      return;
    }

    const ss = getSpreadsheetObjetivo_();
    if (!ss) {
      logC("> [FATAL] No se pudo abrir el Spreadsheet objetivo.", "fatal");
      p.setProperty('IS_RUNNING', 'FALSE');
      return;
    }

    const hoja = ss.getSheetByName(NOMBRE_PESTANA);
    const hojaNuevos = ss.getSheetByName('NUEVOS CONCURSOS');
    if (!hoja) {
      logC(`> [FATAL] No existe la pestana base: ${NOMBRE_PESTANA}.`, "fatal");
      p.setProperty('IS_RUNNING', 'FALSE');
      return;
    }

    let tT = 0;
    if ((modo === 'TOTAL' || modo === 'UPDATE') && hoja.getLastRow() > 1) {
      let data = hoja.getRange(2, 1, hoja.getLastRow() - 1, 2).getValues();
      tT += data.filter(r => r[0].toString().trim() !== '' && r[1].toString().trim().toUpperCase() !== 'REVISADO HUMANO').length;
    }
    if ((modo === 'TOTAL' || modo === 'NEW') && hojaNuevos && hojaNuevos.getLastRow() > 1) {
      let dN = hojaNuevos.getRange(2, 1, hojaNuevos.getLastRow() - 1, 1).getValues();
      tT += dN.filter(r => r[0].toString().trim() !== '').length;
    }
    if (modo === 'TOTAL' || modo === 'NEW') tT += 5;

    if (!isResuming) {
      p.setProperties({
        'IDX_F1': '0',
        'NUM_FASE': (modo === 'NEW' ? '2' : '1'),
        'CURRENT_ROW': '0',
        'TOTAL_ROWS': tT.toString(),
        'STOP_REQUESTED': 'FALSE',
        'IS_DONE': 'FALSE',
        'FASE_ACTUAL': 'Mapeando cuadricula...'
      });
    }

    aplicarDiseno(hoja, hojaNuevos);
    ejecutarAnalisisDinamico(ss, hoja, hojaNuevos, modo);
  } catch (err) {
    logC(`> [FATAL] Error no controlado en ejecutorMaestro: ${err && err.message ? err.message : err}`, 'fatal');
    p.setProperty('IS_RUNNING', 'FALSE');
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function ejecutarAnalisisDinamico(ss, hoja, hojaNuevos, modo) {
  const startTime = Date.now(); const p = PropertiesService.getScriptProperties(); const numCols = hoja.getMaxColumns(); 
  let trC = parseInt(p.getProperty('CURRENT_ROW')) || 0; let fA = parseInt(p.getProperty('NUM_FASE')) || 1;
  let nE = []; if (hoja.getLastRow() > 1) nE = hoja.getRange(2, 1, hoja.getLastRow() - 1, 1).getValues().map(r => (r[0]||"").toString().trim());

  const vS = (val) => { let t=val?val.toString().trim().toLowerCase():""; return (t===""||t==="null"||t==="n/a"||t.includes("informacion no")||t.includes("informaciÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³n no")||t==="sin publicar"||t==="no publicada") ? "No publicado" : val.toString().trim(); };
  const eU = (u) => typeof u==='string'&&u.startsWith('http');
  const fF = (d) => d instanceof Date ? `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}` : d?d.toString():"";
  const mV = (n, v) => { let vs=v?v.toString().trim():""; let vl=vs.toLowerCase(); if (n==="No publicado" && vs!=="" && !vl.includes("informacion") && !vl.includes("no publicad")) return vs; return n; };

  const hReal = new Date(); const strH = `${String(hReal.getDate()).padStart(2,'0')}/${String(hReal.getMonth()+1).padStart(2,'0')}/${hReal.getFullYear()}`;

  // ==============================================================================
  // FASE 1: ACTUALIZAR TABLA MATRIZ
  // ==============================================================================
  if (fA === 1 && (modo === 'TOTAL' || modo === 'UPDATE') && hoja.getLastRow() > 1) {
    p.setProperty('FASE_ACTUAL', 'FASE 1: AUDITORÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂA DE MATRIZ');
    const dts = hoja.getRange(2, 1, hoja.getLastRow() - 1, 17).getValues();
    for (let i = parseInt(p.getProperty('IDX_F1')) || 0; i < dts.length; i++) {
      p.setProperty('IDX_F1', i.toString());
      if (p.getProperty('STOP_REQUESTED') === 'TRUE') { p.setProperty('IS_RUNNING', 'FALSE'); return; }
      if (Date.now() - startTime > CONFIG.MAX_EXECUTION_TIME) { p.setProperty('TIME_OUT', 'TRUE'); p.setProperty('IS_RUNNING', 'FALSE'); logC("> [PAUSA DE SEGURIDAD] LÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­mite del servidor. Pulsa CONTINUAR.", "warning"); return; }

      let fD = dts[i]; let nom = fD[0]; let fS = i + 2; let estActual = fD[1]?fD[1].toString().trim().toUpperCase():"";
      if (!nom || nom.trim() === '') continue; 
      if (estActual === "REVISADO HUMANO") { logC(`> ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â [HUMANO] "${nom}" protegido por equipo manual.`, 'warning'); continue; }

      let eInsBack = fD[2] || "SIN PUBLICAR"; let estFuturo = (estActual === "NUEVO DESCUBRIMIENTOS") ? "NUEVO DESCUBRIMIENTOS" : "REVISADO IA";
      
      try {
          logC(`\n------------------------------------------------`, 'scan'); logC(`> OBJETIVO FIJADO: "${nom}"`, 'title'); trC++; p.setProperty('CURRENT_ROW', trC.toString());
          hoja.getRange(fS, 1, 1, numCols).setBackground("#00FF00").setFontColor("#000000"); SpreadsheetApp.flush(); 

          let urlD = eU(fD[11]) ? fD[11] : (eU(fD[12]) ? fD[12] : "");
          let webData = extraerWeb(urlD);
          let promptContraste = `Analiza "${nom}". HISTÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œRICO: [LÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­mite: ${fF(fD[3])} | Mes: ${fF(fD[4])} | Premio: ${fD[6]} | LinkAntiguo: ${fD[12]}].`;
          let j = llamarIA(promptContraste, webData, nom, strH, hReal.getFullYear());
          
          if (j && j.fatal_error) { p.setProperty('IS_RUNNING', 'FALSE'); return; }
          if (p.getProperty('STOP_REQUESTED') === 'TRUE') { aplicarPinturaFila(hoja, fS, eInsBack); p.setProperty('IS_RUNNING', 'FALSE'); return; }
          
          let fU = [...fD]; 
          if (!j) { fU[1] = estFuturo; fU[2] = "SIN PUBLICAR"; hoja.getRange(fS, 1, 1, 17).setValues([fU]); eInsBack = "SIN PUBLICAR"; } 
          else {
            let fLim = mV(vS(j.fechaLimite), fF(fD[3])); eInsBack = calcularEstado90Dias(fLim);
            logC(`> [CÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂLCULO MATEMÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂTICO] Fecha: ${fLim} = [${eInsBack}]`, 'success');

            fU[1] = estFuturo; fU[2] = eInsBack; fU[3] = fLim; fU[4] = mV(vS(j.fechasDesarrollo), fF(fD[4]));
            
            let tp = vS(j.tipoPremio).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); fU[5] = tp.includes("ECONOMICO")?"ECONOMICO":tp.includes("SERVICIO")?"SERVICIO":tp.includes("ACTUACION")?"ACTUACION":tp.includes("RESIDENCIA")?"RESIDENCIA":"VARIOS";
            fU[6] = mV(vS(j.detallePremio), fD[6]); fU[7] = mV(vS(j.dirigidoA), fD[7]); fU[8] = mV(vS(j.municipio), fD[8]); fU[9] = mV(vS(j.provincia), fD[9]); fU[10] = vS(j.pais)==="No publicado"?"EspaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a":vS(j.pais);
            
            let link1 = eU(j.link1) ? j.link1 : "No publicado";
            // ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂºÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â REGLA DE HIERRO POST-PROCESADO: Si estÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ Abierta y la fecha NO es estimada, forzamos link1 si o si
            if (eInsBack === "ABIERTA" && !fLim.toUpperCase().includes("ESTIMADO") && link1 === "No publicado") {
                link1 = urlD !== "" ? urlD : "BÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âºsqueda manual requerida";
                j._razonamiento_logico += "\n[!] AVISO A&R: Se ha forzado la inserciÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³n de enlace al detectarse convocatoria oficial abierta.";
            }

            fU[11] = link1; fU[12] = eU(j.link2)?j.link2:(eU(fD[12])?fD[12]:"No publicado"); fU[13] = eU(j.link3)?j.link3:"No publicado";
            fU[14] = mV(vS(j.email), fD[14]); fU[15] = mV(vS(j.telefono), fD[15]); fU[16] = vS(j.notas);

            hoja.getRange(fS, 1, 1, 17).setValues([fU]).clearNote(); 
            if(j._razonamiento_logico) { hoja.getRange(fS, 4).setNote(`> ESTADO: [${eInsBack}]\n> LÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂMITE: ${fLim}\n\n> REPORTE DE ANÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂLISIS (RUBEN COTON):\n${j._razonamiento_logico}`); }
            hoja.setRowHeight(fS, 50); logC(`> ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â EXCEL ACTUALIZADO.`, 'success');
          }
      } catch (err) { let fU=[...fD]; fU[1]=estFuturo; fU[2]="SIN PUBLICAR"; hoja.getRange(fS,1,1,17).setValues([fU]); eInsBack="SIN PUBLICAR"; } 
      finally { aplicarPinturaFila(hoja, fS, eInsBack); }
    }
    let sigFase = modo === 'UPDATE' ? 4 : 2;
    p.setProperties({'NUM_FASE': sigFase.toString(), 'IDX_F1': '0'}); fA = sigFase;
  }

  // ==============================================================================
  // FASE 2: TRITURADORA LINKS NUEVOS
  // ==============================================================================
  if (fA === 2 && (modo === 'TOTAL' || modo === 'NEW') && hojaNuevos && hojaNuevos.getLastRow() > 1) {
    p.setProperty('FASE_ACTUAL', 'FASE 2: TRITURADORA DE LINKS');
    for (let fila = hojaNuevos.getLastRow(); fila >= 2; fila--) {
      if (p.getProperty('STOP_REQUESTED') === 'TRUE') { p.setProperty('IS_RUNNING', 'FALSE'); return; }
      if (Date.now() - startTime > CONFIG.MAX_EXECUTION_TIME) { p.setProperty('TIME_OUT', 'TRUE'); p.setProperty('IS_RUNNING', 'FALSE'); logC("> [PAUSA DE SEGURIDAD] Pulsa CONTINUAR.", "warning"); return; }
      
      let urlL = hojaNuevos.getRange(fila, 1).getValue().toString().trim(); let estL = hojaNuevos.getLastColumn() >= 2 ? hojaNuevos.getRange(fila, 2).getValue().toString().trim() : "";
      if (urlL === "") { hojaNuevos.deleteRow(fila); continue; }
      if (estL.includes("ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢")) continue;

      if (eU(urlL)) {
        try {
          logC(`\n------------------------------------------------`, 'scan'); trC++; p.setProperty('CURRENT_ROW', trC.toString());
          let webData = extraerWeb(urlL);
          let j = llamarIA(`Extrae TODOS los datos de este nuevo concurso. URL origen: ${urlL}`, webData, urlL, strH, hReal.getFullYear());
          if (j && j.fatal_error) { p.setProperty('IS_RUNNING', 'FALSE'); return; }
          
          if (j && j.nombreConcurso && j.nombreConcurso !== "No publicado") {
            let nR = vS(j.nombreConcurso); nE.push(nR); let fLim = vS(j.fechaLimite); let eIns = calcularEstado90Dias(fLim);
            let tp = vS(j.tipoPremio).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); tp = tp.includes("ECONOMICO")?"ECONOMICO":tp.includes("SERVICIO")?"SERVICIO":tp.includes("ACTUACION")?"ACTUACION":tp.includes("RESIDENCIA")?"RESIDENCIA":"VARIOS";

            let numR = hoja.getLastRow() + 1; let rData = hoja.getRange(numR, 1, 1, 17);
            
            let link1 = eU(j.link1) ? j.link1 : "No publicado";
            if (eIns === "ABIERTA" && !fLim.toUpperCase().includes("ESTIMADO") && link1 === "No publicado") { link1 = urlL; }

            rData.setValues([[ nR, "NUEVO DESCUBRIMIENTOS", eIns, fLim, vS(j.fechasDesarrollo), tp, vS(j.detallePremio), vS(j.dirigidoA), vS(j.municipio), vS(j.provincia), vS(j.pais)==="No publicado"?"EspaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a":vS(j.pais), link1, vS(j.link2), vS(j.link3), vS(j.email), vS(j.telefono), vS(j.notas) ]]);
            if(j._razonamiento_logico) { hoja.getRange(numR, 4).setNote(`> ESTADO: [${eIns}]\n> FECHA: ${fLim}\n\n> REPORTE DE ANÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂLISIS:\n${j._razonamiento_logico}`); }
            hoja.setRowHeight(numR, 50); aplicarPinturaFila(hoja, numR, eIns); hojaNuevos.deleteRow(fila); logC(`> [BOOM ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¥] Trasladado a Matriz. Fila borrada.`, 'success');
          } else { hojaNuevos.getRange(fila, 2).setValue("ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ ERROR LECTURA"); }
        } catch(e) { hojaNuevos.getRange(fila, 2).setValue("ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ ERROR RED"); }
      } else { hojaNuevos.deleteRow(fila); } 
    }
    p.setProperties({'NUM_FASE': '3'}); fA = 3;
  } else if (fA === 2) { p.setProperties({'NUM_FASE': '3'}); fA = 3; }

  // ==============================================================================
  // FASE 3: RADAR GLOBAL MUNDIAL
  // ==============================================================================
  if (fA === 3 && (modo === 'TOTAL' || modo === 'NEW')) {
    if (p.getProperty('STOP_REQUESTED') === 'TRUE') { p.setProperty('IS_RUNNING', 'FALSE'); return; }
    if (Date.now() - startTime > CONFIG.MAX_EXECUTION_TIME) { p.setProperty('TIME_OUT', 'TRUE'); p.setProperty('IS_RUNNING', 'FALSE'); logC("> [PAUSA DE SEGURIDAD] Pulsa CONTINUAR.", "warning"); return; }
    p.setProperty('FASE_ACTUAL', 'FASE 3: RADAR MUNDIAL'); logC(`\n================================================`, 'title'); logC(`> BUSCANDO NUEVOS CONCURSOS GLOBALES...`, 'title');
    try {
      trC++; p.setProperty('CURRENT_ROW', trC.toString());
      let jA = llamarIA(`Busca 5 ayudas musicales VIGENTES en EspaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a NO presentes en: ${nE.slice(-50).join(",")}.`, { type: 'none' }, "Radar", strH, hReal.getFullYear(), true);
      if (jA && jA.fatal_error) { p.setProperty('IS_RUNNING', 'FALSE'); return; }
      
      if (jA && Array.isArray(jA)) {
        let fB = []; let cI = []; let cNotas = [];
        jA.forEach(n => {
          if(n.nombreConcurso && n.nombreConcurso !== "No publicado") {
            let fLim = vS(n.fechaLimite); let eIns = calcularEstado90Dias(fLim);
            let tp = vS(n.tipoPremio).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); tp = tp.includes("ECONOMICO")?"ECONOMICO":tp.includes("SERVICIO")?"SERVICIO":tp.includes("ACTUACION")?"ACTUACION":tp.includes("RESIDENCIA")?"RESIDENCIA":"VARIOS";

            fB.push([n.nombreConcurso, "NUEVO DESCUBRIMIENTOS", eIns, fLim, vS(n.fechasDesarrollo), tp, vS(n.detallePremio), vS(n.dirigidoA), vS(n.municipio), vS(n.provincia), vS(n.pais)==="No publicado"?"EspaÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â±a":vS(n.pais), vS(n.link1), vS(n.link2), vS(n.link3), vS(n.email), vS(n.telefono), vS(n.notas)]);
            cI.push(eIns); cNotas.push(`> ESTADO: [${eIns}]\n> REPORTE (Radar):\n${vS(n._razonamiento_logico)}`);
            logC(`> [RADAR ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â°ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â] ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¯ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¸ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â Nuevo concurso inyectado.`, 'success');
          }
        });
        if (fB.length > 0) {
          let fD = hoja.getLastRow() + 1; hoja.getRange(fD, 1, fB.length, 17).setValues(fB);
          for(let k=0; k<fB.length; k++) { hoja.getRange(fD+k, 4).setNote(cNotas[k]); hoja.setRowHeight(fD+k, 50); aplicarPinturaFila(hoja, fD+k, cI[k]); }
        }
      }
    } catch(e) {}
    fA = 4;
  }
  
  if (fA >= 4) {
    logC("\n================================================", 'title'); logC("> SISTEMA DESCONECTADO. TODAS LAS TAREAS SE HAN CUMPLIDO.", "success");
    p.setProperties({ 'IS_DONE': 'TRUE', 'NUM_FASE': '1', 'IS_RUNNING': 'FALSE' });
  }
}




























function buildJsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseWebApiPayload_(e) {
  if (e && e.postData && e.postData.contents) {
    const raw = (e.postData.contents || '').toString();
    if (raw) {
      try { return JSON.parse(raw); } catch (err) {}
    }
  }

  const out = {};
  if (e && e.parameter) {
    const params = e.parameter;
    for (const k in params) {
      out[k] = params[k];
    }
  }
  return out;
}

function getWebApiAction_(payload) {
  const raw = (payload && (payload.action || payload.functionName || payload.fn)) || '';
  return raw.toString().trim();
}

function formatWebApiError_(err) {
  return (err && err.message) ? err.message : String(err);
}

function assertWebApiSecurity_(action, payload) {
  const configured = getContrasenaSistema_();
  const provided = ((payload && (payload.securityPass || payload.pass || payload.token)) || '').toString();

  if (!configured) {
    const isBootstrap = action === 'setConexionDriveGeminiHeadless' && provided.length >= 6;
    if (isBootstrap) return;
    throw new Error('SEGURIDAD_PASS no configurada. Usa setConexionDriveGeminiHeadless para bootstrap inicial.');
  }

  if (!provided || provided !== configured) {
    throw new Error('SEGURIDAD_PASS invalida.');
  }
}

function runWebApiAction_(action, payload) {
  const p = payload || {};
  switch (action) {
    case 'ping':
      return { ok: true, pong: true, ts: new Date().toISOString() };
    case 'setConexionDriveGeminiHeadless':
      return setConexionDriveGeminiHeadless({
        apiKey: p.apiKey,
        securityPass: p.newSecurityPass || p.securityPass || p.pass,
        spreadsheetId: p.spreadsheetId,
        driveRootFolderId: p.driveRootFolderId,
        driveAccountEmail: p.driveAccountEmail
      });
    case 'diagnosticoDriveGeminiHeadless':
      return diagnosticoDriveGeminiHeadless();
    case 'driveCrearCarpetaHeadless':
      return driveCrearCarpetaHeadless(p.nombre || p.name, p.parentFolderId);
    case 'driveCrearArchivoTextoHeadless':
      return driveCrearArchivoTextoHeadless(p.nombre || p.name, p.contenido || p.content, p.parentFolderId, p.mimeType);
    case 'driveModificarArchivoTextoHeadless':
      return driveModificarArchivoTextoHeadless(p.fileId, p.nuevoContenido || p.content);
    case 'driveLeerArchivoTextoHeadless':
      return driveLeerArchivoTextoHeadless(p.fileId, p.maxChars);
    case 'driveBorrarArchivoHeadless':
      return driveBorrarArchivoHeadless(p.fileId);
    case 'driveBorrarCarpetaHeadless':
      return driveBorrarCarpetaHeadless(p.folderId);
    case 'driveRestaurarArchivoHeadless':
      return driveRestaurarArchivoHeadless(p.fileId);
    case 'driveRestaurarCarpetaHeadless':
      return driveRestaurarCarpetaHeadless(p.folderId);
    case 'driveMoverArchivoHeadless':
      return driveMoverArchivoHeadless(p.fileId, p.targetFolderId);
    case 'driveMoverCarpetaHeadless':
      return driveMoverCarpetaHeadless(p.folderId, p.targetFolderId);
    case 'driveCopiarArchivoHeadless':
      return driveCopiarArchivoHeadless(p.fileId, p.nuevoNombre || p.name, p.targetFolderId);
    case 'crearAutomatismoMinutosHeadless':
      return crearAutomatismoMinutosHeadless(p.functionName, p.everyMinutes);
    case 'crearAutomatismoHorasHeadless':
      return crearAutomatismoHorasHeadless(p.functionName, p.everyHours);
    case 'listarAutomatismosHeadless':
      return listarAutomatismosHeadless();
    case 'borrarAutomatismosFuncionHeadless':
      return borrarAutomatismosFuncionHeadless(p.functionName);
    case 'borrarAutomatismoPorIdHeadless':
      return borrarAutomatismoPorIdHeadless(p.triggerId);
    case 'ejecutarAutomatismoAhoraHeadless':
      return ejecutarAutomatismoAhoraHeadless(p.functionName);
    case 'automatismoDriveHealthCheck':
      return automatismoDriveHealthCheck();
    case 'automatismoDrivePulse':
      return automatismoDrivePulse();
    case 'gemini31ProPreviewHeadless':
      return gemini31ProPreviewHeadless(p.promptText || p.prompt);
    case 'syncBandasConcursos':
      return syncBandasConcursos();
    case 'sbSincronizarSeguimiento':
      return sbSincronizarSeguimiento();
    case 'sbRefrescarDashboard':
      return sbRefrescarDashboard();
    case 'sbReconciliarDatos':
      return sbReconciliarDatos();
    case 'sbValidarDuplicadosSeguimiento':
      return sbValidarDuplicadosSeguimiento();
    default:
      throw new Error('Accion no permitida: ' + action);
  }
}

function handleWebApiRequest_(e, allowDefaultPing) {
  const payload = parseWebApiPayload_(e);
  const action = getWebApiAction_(payload) || (allowDefaultPing ? 'ping' : '');
  if (!action) {
    throw new Error('Debes enviar "action" en el payload.');
  }

  if (action !== 'ping') {
    assertWebApiSecurity_(action, payload);
  }

  const result = runWebApiAction_(action, payload);
  return {
    ok: true,
    action: action,
    ts: new Date().toISOString(),
    result: result
  };
}

function doGet(e) {
  try {
    const out = handleWebApiRequest_(e, true);
    return buildJsonOutput_(out);
  } catch (err) {
    return buildJsonOutput_({
      ok: false,
      action: 'GET',
      ts: new Date().toISOString(),
      error: formatWebApiError_(err)
    });
  }
}

function doPost(e) {
  try {
    const out = handleWebApiRequest_(e, false);
    return buildJsonOutput_(out);
  } catch (err) {
    return buildJsonOutput_({
      ok: false,
      action: 'POST',
      ts: new Date().toISOString(),
      error: formatWebApiError_(err)
    });
  }
}

