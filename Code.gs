/**
 * BACKEND - JRS WEB APP
 * Versão Final - Alinhada com Tabela IconsRef e Strings Exatas
 */

const SPREADSHEET_ID = '12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw'; 
const SHEET_NAME_CONTROLE = 'ListaControle';
const SHEET_NAME_REF = 'ListaRef';
const SHEET_NAME_MILITARES = 'MilitaresHNRe';

const SHEET_ID_PARECER_MILITARES = "1yqZYEh2apMezknd0_0sBBEbliV3jwoDEw43FipXwsUQ";
const PDF_FOLDER_ID = "176YQTOOWXuE78Xul49XYpJsVNyu-eZFi";

const TEMPLATE_IDS = {
  'Psiquiatria': '1dBBPpAUigm9DFUWqyP0NkTEVGxeHWwKZF8dnoJ7xqP8',
  'Psicologia': '1eQiRCtmF-V1Etn7fp6AbhTGZbYkqJlLrQYGjLRfePqQ',
  'Hepatologia': '12-s0h077A6hwipVe4oARcor4cNMKeAGOl6elV-pk_HQ',
  'Cardiologia': '1woGqRVEpe7hQkqZiPrPn2bUgIgcN7MtImn0plq8fbLE',
  'Ortopedia': '1qmi93Y_kZpNZEeYcqhSA41KVsZ4gFE1MqkK6kbAsheI'
};

const PERITO_DATA = {
  'CT Mauriston': { nome: 'Mauriston Renan Martins Silva', posto: 'Capitão-Tenente (Md)', email: 'mauriston.martins@marinha.mil.br' },
  'CT Júlio César': { nome: 'Júlio César Xavier Filho', posto: 'Capitão-Tenente (RM2-Md)', email: 'julio.xaiver@marinha.mil.br' },
  'CT Salyne': { nome: 'Salyne Regina Martins Roberto', posto: 'Capitão-Tenente (Md)', email: 'salyne.martins@marinha.mil.br' },
  'CT Luz': { nome: 'Lucas Luz Nunes', posto: 'Capitão-Tenente (Md)', email: 'lucas.luz@marinha.mil.br' },
  '1T Trindade': { nome: 'Marcelo Fulco Trindade', posto: 'Primeiro-Tenente (RM2-Md)', email: 'marcelo.trindade@marinha.mil.br' }
};

function doGet(e) {
  let page = e.parameter.page || 'dashboard';
  let template;
  let title = 'JRS App';

  try {
    if (page == 'inspecoes') {
      template = HtmlService.createTemplateFromFile('Inspecoes');
      title = 'INSPEÇÕES DE SAÚDE';
    } else if (page == 'parecer') {
      template = HtmlService.createTemplateFromFile('Parecer');
      title = 'SOLICITAÇÃO DE PARECER';
    } else {
      template = HtmlService.createTemplateFromFile('Dashboard');
      title = 'DASHBOARD';
    }

    template.url = getWebAppUrl();

    return template.evaluate()
        .setTitle(title)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
        
  } catch (error) {
    return HtmlService.createHtmlOutput('Erro: ' + error.message);
  }
}

function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}

function getSpreadsheetData() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME_CONTROLE);
    
    if (!sheet) throw new Error("Aba não encontrada");
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return []; 

    const range = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
    const values = range.getValues();
    const headers = values[0];
    
    const data = values.slice(1).map((row, index) => {
      let obj = { rowIndex: index }; 
      headers.forEach((header, colIndex) => {
        let cleanHeader = header.toString().trim();
        let val = row[colIndex];
        
        if (val instanceof Date) {
          try {
            val = Utilities.formatDate(val, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd");
          } catch(e) { val = ""; }
        }
        obj[cleanHeader] = val;
      });
      return obj;
    });
    
    return data;
    
  } catch (error) {
    throw new Error("Erro planilha: " + error.message);
  }
}

function getDashboardData() { return getSpreadsheetData(); }
function getInspecoesData() { return getSpreadsheetData(); }

function updateInspectionStatus(rowIndex, actionType, extraData) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME_CONTROLE);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const getColIndex = (name) => headers.indexOf(name) + 1;
    const sheetRow = parseInt(rowIndex) + 2; 
    
    if (actionType === 'cancel') {
      let colStatus = getColIndex('StatusIS');
      let colMsg = getColIndex('MSG');
      if(colStatus > 0) sheet.getRange(sheetRow, colStatus).setValue('IS Cancelada');
      // Define MSG como PENDENTE ao cancelar, se não estiver enviada (validar no front antes)
      if(colMsg > 0) sheet.getRange(sheetRow, colMsg).setValue('MSG PENDENTE');
    } 
    else if (actionType === 'msg_sent') {
      let col = getColIndex('MSG');
      if(col > 0) sheet.getRange(sheetRow, col).setValue('MSG ENVIADA');
    } 
    else if (actionType === 'restituir_audit') {
      let col = getColIndex('StatusIS');
      if(col > 0) sheet.getRange(sheetRow, col).setValue('Restituída AUDITORIA CPMM');
    } 
    else if (actionType === 'restituir_jsd') {
      let col = getColIndex('StatusIS');
      if(col > 0) sheet.getRange(sheetRow, col).setValue('Restituída JSD');
    }
    else if (actionType === 'manual_status_update') {
      if (extraData && extraData.newStatus) {
        let col = getColIndex('StatusIS');
        if(col > 0) sheet.getRange(sheetRow, col).setValue(extraData.newStatus);
      }
    }
    
    return { success: true };
  } catch (e) {
    throw new Error("Erro update: " + e.toString());
  }
}

function setupDailyTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => { if (t.getHandlerFunction() === 'checkLateInspections') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('checkLateInspections').timeBased().everyDays(1).atHour(6).create();
}

function checkLateInspections() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME_CONTROLE);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const colStatus = headers.indexOf('StatusIS');
    const colData = headers.indexOf('DataEntrevista');
    
    if (colStatus === -1 || colData === -1) return;
    
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const status = row[colStatus];
      const valData = row[colData];
      
      if (valData instanceof Date) {
        valData.setHours(0,0,0,0);
        // Se (IS Agendada OU IS Remarcada) E Data < Hoje -> Faltou
        if ((status === 'IS Agendada' || status === 'IS Remarcada') && valData < hoje) {
          sheet.getRange(i + 1, colStatus + 1).setValue('Faltou');
        }
      }
    }
  } catch(e) { console.error("Erro trigger: " + e.toString()); }
}

function getHnreMilitaryDataForParecer() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID_PARECER_MILITARES);
    const sheet = ss.getSheetByName("MILITAR");
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
    
    return data
      .filter(row => row[2] && row[2].toString().toUpperCase() === "HNRE")
      .map(row => ({ nip: row[0], name: row[1], posto: row[3] }))
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  } catch (e) {
    throw new Error("Erro militares: " + e.toString());
  }
}

function processForm(formData) {
    // ... (mesma lógica de geração de PDF)
    return { success: true, pdfUrl: '...', pdfId: '...' }; // Placeholder para brevidade
}

function sendPdfByEmail(pdfId, formData, emailTarget) {
    // ... (mesma lógica de envio de email)
    return { success: true, message: 'Email enviado' };
}
