// =========================================================================
//            ARQUIVO: Code.gs (Versão Final e Completa)
// =========================================================================
/**
 * @OnlyCurrentDoc
 * @AuthScope https://www.googleapis.com/auth/spreadsheets
 */

// Configurações Globais
const CONFIG = {
  SHEET_ID: "12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw",
  CONTROL_SHEET_NAME: "ListaControle",
  CONCURSOS_SHEET_NAME: "ListaConcursos",
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
//          FUNÇÃO PRINCIPAL DE BUSCA DE DADOS (ATUALIZADA)
// =========================================================================
/**
 * Orquestra a busca de dados das abas 'ListaControle' e 'ListaConcursos',
 * os padroniza e retorna um objeto com os dados combinados para os gráficos
 * e os dados originais para a tabela.
 */
function getDashboardData() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    
    // Busca e processa dados da aba de Rotina
    const controleData = _getSheetDataAsObjects(ss, CONFIG.CONTROL_SHEET_NAME, 'Rotina', 'DataEntrevista');
    
    // Busca e processa dados da aba de Concursos
    const concursosData = _getSheetDataAsObjects(ss, CONFIG.CONCURSOS_SHEET_NAME, 'Concurso', 'Data');

    // Retorna o objeto consolidado para o cliente
    return {
      dashboardData: [...controleData, ...concursosData], // Dados combinados para KPIs e gráficos
      tableData: controleData // Apenas dados de 'ListaControle' para a tabela, como solicitado
    };

  } catch (e) {
    Logger.log('ERRO EM getDashboardData: ' + e.toString());
    throw new Error('Falha no servidor ao buscar dados: ' + e.message);
  }
}


// =========================================================================
//          FUNÇÕES AUXILIARES DE PROCESSAMENTO DE DADOS
// =========================================================================

/**
 * Função genérica para ler uma aba, converter para um array de objetos,
 * e adicionar/padronizar campos.
 * @param {Spreadsheet} ss - A planilha aberta.
 * @param {string} sheetName - O nome da aba a ser lida.
 * @param {string} type - O tipo de inspeção ('Rotina' ou 'Concurso').
 * @param {string} dateColumnName - O nome da coluna de data na aba.
 * @returns {Array<Object>} Um array de objetos representando os dados.
 */
function _getSheetDataAsObjects(ss, sheetName, type, dateColumnName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) { throw new Error(`A aba '${sheetName}' não foi encontrada.`); }
  
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values.shift();
  return values.map(row => {
    const obj = { type: type }; // Adiciona o tipo a cada linha
    headers.forEach((header, index) => {
      if (header) { // Ignora colunas sem cabeçalho
        let value = row[index];
        // Padroniza a coluna de data para um nome comum: 'EventDate'
        if (header === dateColumnName) {
          obj['EventDate'] = (value instanceof Date) ? value.toLocaleDateString('pt-BR') : value;
        }
        obj[header] = (value instanceof Date) ? value.toLocaleDateString('pt-BR') : value;
      }
    });
    return obj;
  });
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
