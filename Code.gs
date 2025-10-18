// =========================================================================
//            ARQUIVO: Code.gs (Versão Estável com Correção Definitiva)
// =========================================================================
/**
 * @OnlyCurrentDoc
 * @AuthScope https://www.googleapis.com/auth/spreadsheets
 */

// Configurações Globais
const CONFIG = {
  SHEET_ID: "12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw",
  CONTROL_SHEET_NAME: "ListaControle",
  REF_SHEET_NAME: "ListasRef",
  MILITARY_SHEET_NAME: "MilitaresHNRe",
  HEADER_ROW: 1
};

function doGet(e) {
  let page = e.parameter.page;
  if (!page || page == 'form') {
    return HtmlService.createTemplateFromFile('Formulario').evaluate().setTitle('JRS - Adicionar Inspeção').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
  } else if (page == 'dashboard') {
    return HtmlService.createTemplateFromFile('Dashboard').evaluate().setTitle('JRS - Dashboard de Inspeções').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
  }
}

// =========================================================================
//          FUNÇÃO DE BUSCA DE DADOS CORRIGIDA E ROBUSTA
// =========================================================================
function getDashboardData() {
  try {
    // ESTA É A CORREÇÃO: Usa o ID explícito da planilha
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID); 
    const sheet = ss.getSheetByName(CONFIG.CONTROL_SHEET_NAME);

    if (!sheet) { throw new Error(`A aba '${CONFIG.CONTROL_SHEET_NAME}' não foi encontrada.`); }
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values.shift(); 
    const data = values.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        if (row[index] instanceof Date) {
          obj[header] = row[index].toLocaleDateString('pt-BR');
        } else {
          obj[header] = row[index];
        }
      });
      return obj;
    });
    return data;
  } catch (e) {
    Logger.log('ERRO EM getDashboardData: ' + e.toString());
    throw new Error('Falha no servidor ao buscar dados: ' + e.message);
  }
}

// =========================================================================
//          FUNÇÕES PARA O FORMULÁRIO (CÓDIGO ORIGINAL INALTERADO)
// =========================================================================
function getHnreMilitaryData() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.MILITARY_SHEET_NAME);
    if (!sheet) return [];
    const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3);
    return range.getValues().map(row => ({ pg: row[0], nip: row[1], inspecionado: row[2] })).filter(m => m.inspecionado);
  } catch (e) {
    throw new Error(e.message);
  }
}

function getDropdownData() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    if (!ss) throw new Error("Não foi possível abrir a planilha.");
    const refSheet = ss.getSheetByName(CONFIG.REF_SHEET_NAME);
    if (!refSheet) throw new Error(`A aba '${CONFIG.REF_SHEET_NAME}' não foi encontrada.`);
    const data = refSheet.getDataRange().getValues();
    if (data.length < 2) throw new Error(`A aba '${CONFIG.REF_SHEET_NAME}' está vazia.`);
    const headers = data[0].map(h => h.toString().toUpperCase().trim()); 
    const getUniqueColumnValues = (columnName) => {
      const colIndex = headers.indexOf(columnName.toUpperCase());
      if (colIndex === -1) { throw new Error(`A coluna '${columnName}' não foi encontrada.`); }
      return [...new Set(data.slice(1).map(row => row[colIndex]).filter(String))];
    };
    return {
      finalidadeOptions: getUniqueColumnValues('FINALIDADES'),
      omOptions: getUniqueColumnValues('OM'),
      pgOptions: getUniqueColumnValues('P/G'),
      statusOptions: getUniqueColumnValues('STATUS'),
      restricoesOptions: getUniqueColumnValues('RESTRIÇÕES')
    };
  } catch (e) {
    throw new Error(e.message); 
  }
}

function addNewInspection(formData) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.CONTROL_SHEET_NAME);
    if (!sheet) throw new Error(`A aba '${CONFIG.CONTROL_SHEET_NAME}' não foi encontrada.`);
    const headers = sheet.getRange(CONFIG.HEADER_ROW, 1, 1, sheet.getLastColumn()).getValues()[0];
    let restricoesString = '';
    if (formData.restricoes && formData.restricoes.length > 0) {
      const outrosIndex = formData.restricoes.indexOf('Outros');
      if (outrosIndex > -1 && formData.outrosRestricao) {
        formData.restricoes.splice(outrosIndex, 1, formData.outrosRestricao.trim());
      }
      restricoesString = formData.restricoes.join(', ');
    }
    const newRow = headers.map(header => {
      switch (header) {
        case 'IS': return formData.is || '';
        case 'DataEntrevista': return formData.dataEntrevista ? new Date(formData.dataEntrevista.replace(/-/g, '/')) : null;
        case 'Finalidade': return formData.finalidade || '';
        case 'OM': return formData.om || '';
        case 'P/G/Q': return formData.pg || '';
        case 'NIP': return formData.nip || '';
        case 'Inspecionado': return formData.inspecionado || '';
        case 'StatusIS': return formData.statusIS || '';
        case 'DataLaudo': return formData.dataLaudo ? new Date(formData.dataLaudo.replace(/-/g, '/')) : null;
        case 'Laudo': return formData.laudo || '';
        case 'Restrições': return restricoesString;
        case 'TIS': return formData.tis || '';
        case 'DS-1a': return formData.ds1a || '';
        default: return '';
      }
    });
    sheet.appendRow(newRow);
    return { status: 'success', message: 'Inspeção adicionada com sucesso!' };
  } catch (e) {
    throw new Error('Falha ao salvar: ' + e.message);
  }
}
