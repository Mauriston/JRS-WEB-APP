/**
 * @OnlyCurrentDoc
 */

// --- CONFIGURAções GLOBAIS ---
// ID da Planilha (você mencionou que já corrigiu este)
const SS_ID = '12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw'; 

// Nomes das Abas (VERIFIQUE SE ESTÃO IDÊNTICOS AOS DA SUA PLANILHA)
const DATA_SHEET_NAME = 'ListaControle';       
const LISTS_SHEET_NAME = 'ListasRef';          
const CONCURSOS_SHEET_NAME = 'ListaConcursos';   
const RESTRICOES_SHEET_NAME = 'ListasRef';     
const RESTRICOES_RANGE = 'G2:G50'; // Coluna G, com base na sua lista "Restrições"

// Cache do Script
const cache = CacheService.getScriptCache();

// --- FUNÇÕES DE NAVEGAÇÃO E INICIALIZAÇÃO ---

/**
 * Ponto de entrada principal para o Web App.
 * @param {object} e - Parâmetros do evento (ex: e.parameter.page).
 * @returns {HtmlOutput} O HTML da página solicitada.
 */
function doGet(e) {
  let page = e.parameter.page || 'Dashboard'; // Página padrão é o Dashboard
  let htmlOutput;

  switch (page) {
    case 'Dashboard':
      htmlOutput = HtmlService.createTemplateFromFile('Dashboard').evaluate()
        .setTitle('JRS - Dashboard de Inspeções')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
      break;
    case 'formulario':
      htmlOutput = HtmlService.createTemplateFromFile('Formulario').evaluate()
        .setTitle('JRS - Formulário de Inspeção')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
      break;
    case 'parecer':
      htmlOutput = HtmlService.createTemplateFromFile('Parecer').evaluate()
        .setTitle('JRS - Gerador de Parecer')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
      break;
    default:
      htmlOutput = HtmlService.createTemplateFromFile('Dashboard').evaluate()
        .setTitle('JRS - Dashboard de Inspeções')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  return htmlOutput;
}

/**
 * Retorna a URL base do Web App.
 * @returns {string} A URL do script.
 */
function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}

/**
 * Busca e processa os dados para o Dashboard.
 * Esta é a função principal que o Dashboard.html chama ao carregar.
 * @returns {object} Um objeto contendo dados para KPIs/Gráficos e para a Tabela.
 */
function getDashboardData() {
  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    
    // 1. Obter dados da "ListaControle" (Rotina)
    const dataSheet = ss.getSheetByName(DATA_SHEET_NAME);
    const dataRange = dataSheet.getDataRange();
    const allData = dataRange.getValues(); 
    const dataHeaders = allData.shift(); // Remove a linha de cabeçalho
    const dataColIndices = getHeaderIndices(dataHeaders);

    // Confere se as colunas essenciais existem
    if (dataColIndices.DataEntrevista === undefined || dataColIndices.StatusIS === undefined) {
      throw new Error(`Não foi possível encontrar colunas essenciais (ex: 'DataEntrevista', 'StatusIS') na aba '${DATA_SHEET_NAME}'. Verifique os cabeçalhos.`);
    }

    const dashboardDataRotina = allData.map(row => ({
      EventDate: row[dataColIndices.DataEntrevista], 
      StatusIS: row[dataColIndices.StatusIS],       
      Finalidade: row[dataColIndices.Finalidade],    
      MSG: row[dataColIndices.MSG],                
      type: 'Rotina'
    }));

    // 2. Obter dados da "ListaConcursos"
    const concursosSheet = ss.getSheetByName(CONCURSOS_SHEET_NAME);
    const concursosRange = concursosSheet.getDataRange();
    const allConcursosData = concursosRange.getValues(); 
    const concursosHeaders = allConcursosData.shift(); 
    const concursosColIndices = getHeaderIndices(concursosHeaders);

    // Confere se as colunas essenciais existem
    if (concursosColIndices.Data === undefined || concursosColIndices.StatusIS === undefined) {
      throw new Error(`Não foi possível encontrar colunas essenciais (ex: 'Data', 'StatusIS') na aba '${CONCURSOS_SHEET_NAME}'. Verifique os cabeçalhos.`);
    }
    
    const dashboardDataConcursos = allConcursosData.map(row => ({
      EventDate: row[concursosColIndices.Data],        
      StatusIS: row[concursosColIndices.StatusIS],       
      Finalidade: row[concursosColIndices.Finalidade],    
      MSG: '', 
      type: 'Concurso'
    }));

    // 3. Combinar dados para KPIs e Gráficos
    const combinedDashboardData = dashboardDataRotina.concat(dashboardDataConcursos);

    // 4. Preparar dados da Tabela (Apenas Rotina - 'allData' já é da ListaControle)
    const tableData = allData.map(row => { 
      let rowObject = {};
      dataHeaders.forEach((header, index) => {
        // CORREÇÃO: Usa header.trim() para criar a chave do objeto
        if (header) { // Ignora colunas sem cabeçalho
          if (row[index] instanceof Date) {
            rowObject[header.trim()] = Utilities.formatDate(row[index], Session.getScriptTimeZone(), 'dd/MM/yyyy');
          } else {
            rowObject[header.trim()] = row[index];
          }
        }
      });
      return rowObject;
    });

    // 5. Obter lista de Restrições
    const restricoesSheet = ss.getSheetByName(RESTRICOES_SHEET_NAME);
    const restricoesOptions = restricoesSheet.getRange(RESTRICOES_RANGE)
      .getValues()
      .flat() 
      .filter(item => item.trim() !== ''); 

    console.log(`Dados carregados: ${combinedDashboardData.length} para KPIs, ${tableData.length} para tabela, ${restricoesOptions.length} restrições.`);
    
    // 6. Retornar o objeto formatado que o 'onDataLoaded' no HTML espera
    return {
      dashboardData: combinedDashboardData,
      tableData: tableData,
      restricoesOptions: restricoesOptions
    };
  } catch (e) {
    console.error('Erro em getDashboardData:', e);
    throw new Error(`Falha ao buscar dados: ${e.message}. Verifique os NOMES DAS ABAS e NOMES DAS COLUNAS no seu Code.gs e na Planilha.`);
  }
}

// --- FUNÇÕES DE ATUALIZAÇÃO (MODAL) ---

/**
 * Atualiza o status da MSG de PENDENTE para ENVIADA.
 * @param {string} isNumber - O número da IS a ser atualizada.
 * @returns {object} Objeto de sucesso ou falha.
 */
function updateMsgStatus(isNumber) {
  if (!isNumber) {
    return { success: false, message: 'Número da IS não fornecido.' };
  }

  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(DATA_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const colIndices = getHeaderIndices(headers);

    const isColIndex = colIndices.IS;
    const msgColIndex = colIndices.MSG;

    if (isColIndex === undefined || msgColIndex === undefined) {
      throw new Error('Não foi possível encontrar as colunas "IS" ou "MSG".');
    }

    // Encontra a linha correspondente (começa do fim para pegar a mais recente)
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i][isColIndex] == isNumber) {
        // Encontrou a linha, atualiza a coluna MSG (índice baseado em 1)
        sheet.getRange(i + 1, msgColIndex + 1).setValue('ENVIADA');
        console.log(`Status da MSG atualizado para ENVIADA para IS: ${isNumber} (Linha ${i + 1})`);
        return { success: true };
      }
    }

    return { success: false, message: 'Número da IS não encontrado.' };
  } catch (e) {
    console.error('Erro em updateMsgStatus:', e);
    return { success: false, message: `Erro do servidor: ${e.message}` };
  }
}


/**
 * Atualiza os detalhes da conclusão da inspeção (Data Entrevista, Laudo, Data, TIS, DS-1a, Restrições).
 * @param {object} formData - Os dados vindos do formulário do modal.
 * @returns {object} Objeto de sucesso (com dados atualizados) ou falha.
 */
function updateInspectionConclusion(formData) {
  if (!formData || !formData.isNumber) {
    return { success: false, message: 'Dados do formulário ou IS inválidos.' };
  }

  console.log("Recebendo dados para atualização:", formData);

  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(DATA_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const colIndices = getHeaderIndices(headers); // Nomes de coluna vêm da Planilha

    const isColIndex = colIndices.IS;
    if (isColIndex === undefined) {
      throw new Error('Coluna "IS" não encontrada.');
    }

    // 1. Encontrar a linha
    let rowIndex = -1;
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i][isColIndex] == formData.isNumber) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      return { success: false, message: 'IS não encontrada na planilha.' };
    }

    // 2. Pegar a range da linha (linha + 1 para índice de planilha)
    const range = sheet.getRange(rowIndex + 1, 1, 1, headers.length);
    const rowValues = range.getValues(); // Array 2D: [[val1, val2, ...]]

    // 3. Helper para converter data 'yyyy-mm-dd' para 'dd/mm/yyyy' (definido no final do arquivo)
    const ptBrDataEntrevista = convertToPtBrDate(formData.dataEntrevista);
    const ptBrDataLaudo = convertToPtBrDate(formData.dataLaudo);

    // 4. Montar string de Restrições
    let restricoesString = '';
    if (Array.isArray(formData.restricoes) && formData.restricoes.length > 0) {
      restricoesString = formData.restricoes
        .map(r => {
          if (r === 'Outros' && formData.outrosRestricao) {
            return `Outros: ${formData.outrosRestricao}`;
          }
          return r;
        })
        .filter(r => r !== 'Outros') // Filtra "Outros" se o campo de texto estiver vazio
        .join(', ');
    }

    // 5. Atualizar valores na planilha
    rowValues[0][colIndices.DataEntrevista] = ptBrDataEntrevista; 
    rowValues[0][colIndices.Laudo] = formData.laudo;
    rowValues[0][colIndices.DataLaudo] = ptBrDataLaudo;
    rowValues[0][colIndices.TIS] = formData.tis;
    rowValues[0][colIndices['DS-1a']] = formData.ds1a; // Nome da coluna 'DS-1a'
    rowValues[0][colIndices.Restrições] = restricoesString;
    
    // Atualiza o StatusIS para 'Votada JRS' se estava pendente
    if (rowValues[0][colIndices.StatusIS] === 'Concluída') {
      rowValues[0][colIndices.StatusIS] = 'Votada JRS';
    }

    range.setValues(rowValues);
    console.log(`Linha ${rowIndex + 1} (IS ${formData.isNumber}) atualizada com sucesso.`);

    // 6. Preparar resposta de sucesso para atualizar a UI
    const updatedData = {
      'DataEntrevista': ptBrDataEntrevista, 
      'Laudo': formData.laudo,
      'DataLaudo': ptBrDataLaudo,
      'TIS': formData.tis,
      'DS-1a': formData.ds1a,
      'Restrições': restricoesString,
      'StatusIS': rowValues[0][colIndices.StatusIS] // Retorna o status atualizado
    };

    return { success: true, updatedData: updatedData };

  } catch (e) {
    console.error('Erro em updateInspectionConclusion:', e);
    return { success: false, message: `Erro do servidor: ${e.message}` };
  }
}


// --- FUNÇÕES DO FORMULÁRIO (Formulario.html) ---

/**
 * Busca dados de listas (Finalidade, OM, P/G, etc.) e restrições para o Formulario.html.
 * @returns {object} Objeto contendo as listas para os dropdowns e checkboxes.
 */
function getFormularioData() {
  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(LISTS_SHEET_NAME);
    
    // Mapeamento de colunas para intervalos (A=1, B=2, etc.)
    // Com base na sua lista de colunas: A=FINALIDADES, B=OM, C=P/G, G=Restrições
    const listColumns = {
      finalidades: 'A2:A50', // Coluna FINALIDADES
      om: 'B2:B50',          // Coluna OM
      pgq: 'C2:C50',         // Coluna P/G
      restricoes: RESTRICOES_RANGE // Coluna Restrições (G2:G50)
    };

    let formData = {};

    for (const key in listColumns) {
      const range = listColumns[key];
      const values = sheet.getRange(range)
        .getValues()
        .flat() // Transforma array 2D em 1D
        .filter(item => item.trim() !== ''); // Remove células vazias
      formData[key] = [...new Set(values)].sort(); // Remove duplicatas e ordena
    }

    return formData;
  } catch (e) {
    console.error('Erro em getFormularioData:', e);
    throw new Error(`Falha ao buscar dados das listas: ${e.message}`);
  }
}

/**
 * Salva uma nova inspeção na planilha "ListaControle".
 * @param {object} formData - Dados do formulário.
 * @returns {object} Objeto de sucesso ou falha.
 */
function saveInspection(formData) {
  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(DATA_SHEET_NAME);
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const colIndices = getHeaderIndices(headers);

    // 1. Gerar número da IS (Ano + Sequencial)
    const year = new Date().getFullYear().toString();
    // Encontra a última IS na coluna, mesmo que não seja a última linha da planilha
    const isColumnValues = sheet.getRange(2, colIndices.IS + 1, sheet.getLastRow() - 1, 1).getValues().flat();
    const lastIS = isColumnValues.filter(String).pop() || (year + "000"); // Pega a última IS ou 'ANO000'
    
    let nextSeq = '001';
    if (lastIS.startsWith(year)) {
      const lastSeq = parseInt(lastIS.substring(year.length), 10);
      nextSeq = (lastSeq + 1).toString().padStart(3, '0');
    }
    const newIS = year + nextSeq;

    // 2. Converter datas (yyyy-mm-dd -> dd/mm/yyyy)
    const dataEntrevista = convertToPtBrDate(formData.dataEntrevista);
    const dataLaudo = convertToPtBrDate(formData.dataLaudo);

    // 3. Montar string de Restrições
    let restricoesString = '';
    if (Array.isArray(formData.restricoes) && formData.restricoes.length > 0) {
      restricoesString = formData.restricoes
        .map(r => {
          if (r === 'Outros' && formData.outrosRestricao) {
            return `Outros: ${formData.outrosRestricao}`;
          }
          return r;
        })
        .filter(r => r !== 'Outros') // Filtra "Outros" se o campo de texto estiver vazio
        .join(', ');
    }

    // 4. Montar a nova linha
    let newRow = new Array(headers.length).fill(''); // Cria array vazio com o tamanho dos headers
    
    newRow[colIndices.IS] = newIS;
    newRow[colIndices.DataEntrevista] = dataEntrevista;
    newRow[colIndices.Finalidade] = formData.finalidade;
    newRow[colIndices.OM] = formData.om;
    newRow[colIndices['P/G/Q']] = formData.pgq; // Nome da coluna 'P/G/Q'
    newRow[colIndices.NIP] = formData.nip;
    newRow[colIndices.Inspecionado] = formData.inspecionado;
    newRow[colIndices.StatusIS] = formData.statusIS;
    newRow[colIndices.DataLaudo] = dataLaudo;
    newRow[colIndices.Laudo] = formData.laudo;
    newRow[colIndices.Restrições] = restricoesString;
    newRow[colIndices.TIS] = formData.tis;
    newRow[colIndices['DS-1a']] = formData.ds1a; // Nome da coluna 'DS-1a'
    newRow[colIndices.MSG] = 'PENDENTE'; // Valor padrão

    // 5. Adicionar a linha na planilha
    sheet.appendRow(newRow);

    return { success: true, newIS: newIS, message: `Inspeção ${newIS} salva com sucesso.` };

  } catch (e) {
    console.error('Erro em saveInspection:', e);
    return { success: false, message: `Erro do servidor: ${e.message}` };
  }
}

/**
 * Busca dados de um militar pelo NIP na aba "MilitaresHNRe" (função de autocompletar).
 * @param {string} nip - NIP a ser buscado.
 * @returns {object|null} Objeto com dados do militar ou null se não encontrado.
 */
function getMilitarData(nip) {
  if (!nip || nip.length < 8) { // NIPs têm 8 dígitos
    return null;
  }
  
  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName('MilitaresHNRe'); // Nome da aba
    if (!sheet) {
      console.warn('Aba "MilitaresHNRe" não encontrada.');
      return null;
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    const colIndices = getHeaderIndices(headers);

    const nipCol = colIndices.NIP;
    
    if (nipCol === undefined) {
      console.warn('Coluna "NIP" não encontrada em "MilitaresHNRe".');
      return null;
    }

    // Procura o NIP na coluna
    for (const row of data) {
      const rowNip = row[nipCol].toString().replace(/\D/g, ''); // Limpa formatação
      if (rowNip === nip) {
        let militarData = {};
        headers.forEach((header, index) => {
          if(header) { // Ignora colunas sem cabeçalho
            militarData[header.trim()] = row[index]; // CORREÇÃO: Usa .trim()
          }
        });
        return militarData;
      }
    }
    
    return null; // Não encontrado
  } catch (e) {
    console.error('Erro em getMilitarData:', e);
    return null;
  }
}


// --- FUNÇÕES DO GERADOR DE PARECER (Parecer.html) ---

/**
 * Busca dados de uma inspeção específica pelo número da IS para o Parecer.
 * @param {string} isNumber - O número da IS.
 * @returns {object|null} Objeto com os dados da IS ou null se não encontrada.
 */
function getInspectionDataByIS(isNumber) {
  if (!isNumber) return null;
  
  try {
    const ss = SpreadsheetApp.openById(SS_ID);
    const sheet = ss.getSheetByName(DATA_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    const colIndices = getHeaderIndices(headers);
    
    const isCol = colIndices.IS;
    
    // Procura do fim para o começo para achar a IS mais recente
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i][isCol] == isNumber) {
        let inspectionData = {};
        headers.forEach((header, index) => {
          if (header) { // Ignora colunas sem cabeçalho
            // Formata datas
            if (data[i][index] instanceof Date) {
              inspectionData[header.trim()] = Utilities.formatDate(data[i][index], Session.getScriptTimeZone(), 'dd/MM/yyyy'); // CORREÇÃO: Usa .trim()
            } else {
              inspectionData[header.trim()] = data[i][index]; // CORREÇÃO: Usa .trim()
            }
          }
        });
        return inspectionData;
      }
    }
    return null; // Não encontrado
  } catch (e) {
    console.error('Erro em getInspectionDataByIS:', e);
    return null;
  }
}

// --- FUNÇÕES AUXILIARES ---

/**
 * Cria um mapa de índices de cabeçalho (Nome da Coluna -> Índice).
 * Esta função agora usa .trim() para ser resistente a espaços extras.
 * @param {Array<string>} headers - Array de nomes de coluna.
 * @returns {object} Objeto mapeando nome da coluna ao seu índice.
 */
function getHeaderIndices(headers) {
  let indices = {};
  headers.forEach((header, index) => {
    if (header) {
      indices[header.trim()] = index; // .trim() ignora espaços em branco antes/depois
    }
  });
  return indices;
}

/**
 * Converte data do formato 'yyyy-mm-dd' (input) para 'dd/mm/yyyy' (planilha).
 * @param {string} isoDate - Data no formato 'yyyy-mm-dd'.
 * @returns {string} Data no formato 'dd/mm/yyyy' ou string vazia.
 */
function convertToPtBrDate(isoDate) {
  if (!isoDate || typeof isoDate !== 'string' || !isoDate.includes('-')) {
    return '';
  }
  const parts = isoDate.split('-'); // [yyyy, mm, dd]
  if (parts.length !== 3) return '';
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
