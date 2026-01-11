/**
 * ======================================================================
 * SCRIPT DE AUTOMAÇÃO - CONTROLE DE INSPEÇÕES JRS
 * ======================================================================
 */

// --- CONFIGURAÇÕES DE NOMES DAS ABAS ---
var NOMES_ABAS = {
  PRINCIPAL: "ListaControle",
  FINALIDADES: "FinalidadesAMP",
  MEDICOS: "AMPMedicos",
  MILITARES_HNRE: "MilitaresHNRe",
  LISTAS_REF: "ListasRef"
};

// --- MAPEAMENTO DAS COLUNAS (A=1, B=2, C=3, ...) ---
var COLUNAS = {
  IS_ID: 1,           // A
  DATA_ABERTURA: 2,   // B
  DATA_ENTREVISTA: 3, // C
  FINALIDADE: 5,      // E
  AMP: 6,             // F
  MEDICO: 7,          // G
  OM: 8,              // H
  PGQ: 9,             // I
  NIP: 10,            // J
  INSPECIONADO: 11,   // K
  STATUS_IS: 12,      // L
  DATA_LAUDO: 13,     // M
  LAUDO: 14,          // N
  OBSERVACOES: 15,    // O
  TIS: 17,            // Q
  DS1A: 18,           // R
  MSG: 19             // S
};

// --- NOMES EXATOS DOS STATUS E MSG ---
var STATUS_NAMES = {
  ABERTA: "IS aberta",
  AGENDADA: "IS Agendada",          
  REMARCADA: "IS Remarcada",        
  PENDENTE: "Conclusão Pendente",
  CONCLUIDA: "IS Concluída s/ voto",
  VOTADA: "IS Votada s/ assinatura",
  ASSINADO: "TIS assinado",
  CANCELADA: "IS Cancelada" // Novo status adicionado
};

var MSG_STATUS = {
  PENDENTE: "MSG PENDENTE",
  ENVIADA: "MSG ENVIADA",
  ATRASADA: "MSG ATRASADA"
};

// --- ESCALA E CORES ---
var ESCALA_MEDICOS = {
  "CT JÚLIO CÉSAR": [1],          
  "CT MAURISTON":   [3, 4, 5],    
  "CT SALYNE":      [1, 2, 3, 4], 
  "CT LUZ":         [2, 5],       
  "2T TRINDADE":    [1, 3, 4]     
};

var CORES = {
  ALERTA_VERMELHO: "#F4CCCC", // Vermelho Claro 3
  CINZA_TEMP: "#A9A9A9",
  AMARELO_TEMP: "#FFF2CC"
};

/**
 * ======================================================================
 * FUNÇÃO DE VERIFICAÇÃO DIÁRIA (GATILHO DE TEMPO)
 * Configure esta função para rodar todos os dias às 06h00
 * ======================================================================
 */
function verificarPrazosDiarios() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(NOMES_ABAS.PRINCIPAL);
  if (!aba) return;

  var rangeDados = aba.getDataRange();
  var valores = rangeDados.getValues();
  var backgrounds = rangeDados.getBackgrounds();
  var hoje = new Date();
  var houveAlteracao = false;

  // Loop começa em 1 para pular cabeçalho
  for (var i = 1; i < valores.length; i++) {
    var linha = i + 1; // Número da linha na planilha (base 1)
    
    // Extrai dados da linha
    var vDataAbertura = valores[i][COLUNAS.DATA_ABERTURA - 1];
    var vDataEntrevista = valores[i][COLUNAS.DATA_ENTREVISTA - 1];
    var vDataLaudo = valores[i][COLUNAS.DATA_LAUDO - 1];
    var vStatus = String(valores[i][COLUNAS.STATUS_IS - 1]);
    var vMsg = String(valores[i][COLUNAS.MSG - 1]);

    // --- CASO 1: IS ABERTA EXPIRADA (> 7 dias úteis) ---
    if (vStatus == STATUS_NAMES.ABERTA && vDataAbertura instanceof Date) {
      if (contarDiasUteis(vDataAbertura, hoje) > 7) {
        // Altera Status para Cancelada e MSG para Pendente
        aba.getRange(linha, COLUNAS.STATUS_IS).setValue(STATUS_NAMES.CANCELADA);
        aba.getRange(linha, COLUNAS.MSG).setValue(MSG_STATUS.PENDENTE);
        houveAlteracao = true;
      }
    }

    // --- CASO 2: CONCLUSÃO PENDENTE ATRASADA (> 20 dias úteis) ---
    if (vStatus == STATUS_NAMES.PENDENTE && vDataEntrevista instanceof Date) {
      if (contarDiasUteis(vDataEntrevista, hoje) > 20) {
        // Pinta a linha inteira de vermelho
        aba.getRange(linha, 1, 1, 25).setBackground(CORES.ALERTA_VERMELHO);
        houveAlteracao = true;
      }
    }

    // --- CASO 3: MENSAGEM PENDENTE ATRASADA (> 10 dias úteis) ---
    if (vMsg == MSG_STATUS.PENDENTE && vDataLaudo instanceof Date) {
      if (contarDiasUteis(vDataLaudo, hoje) > 10) {
        // Altera MSG para Atrasada e Pinta linha de vermelho
        aba.getRange(linha, COLUNAS.MSG).setValue(MSG_STATUS.ATRASADA);
        aba.getRange(linha, 1, 1, 25).setBackground(CORES.ALERTA_VERMELHO);
        houveAlteracao = true;
      }
    }
  }

  if (houveAlteracao) {
    console.log("Verificação diária concluída com atualizações.");
  }
}

/**
 * Função Auxiliar para contar dias úteis (Seg-Sex) entre duas datas
 */
function contarDiasUteis(dataInicio, dataFim) {
  // Clona as datas para não alterar as originais
  var inicio = new Date(dataInicio.getTime());
  var fim = new Date(dataFim.getTime());
  
  // Zera as horas para comparar apenas os dias
  inicio.setHours(0,0,0,0);
  fim.setHours(0,0,0,0);

  if (inicio >= fim) return 0;

  var diasUteis = 0;
  var cursor = new Date(inicio);
  cursor.setDate(cursor.getDate() + 1); // Começa a contar do dia seguinte

  while (cursor <= fim) {
    var diaSemana = cursor.getDay();
    // 0 = Dom, 6 = Sáb. Se não for 0 nem 6, é dia útil.
    if (diaSemana !== 0 && diaSemana !== 6) {
      diasUteis++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return diasUteis;
}


/**
 * ======================================================================
 * FUNÇÃO PRINCIPAL (GATILHO DE EDIÇÃO)
 * ======================================================================
 */
function onEdit(e) {
  if (!e) return;
  
  var range = e.range;
  var abaAtual = range.getSheet();
  var linha = range.getRow();
  
  if (abaAtual.getName() != NOMES_ABAS.PRINCIPAL || linha <= 1) return;

  var colunaEditada = range.getColumn();
  var valorEditado = String(range.getValue()).trim();
  var oldValue = e.oldValue; // Valor anterior à edição

  // 1. INICIALIZAÇÃO DE NOVA LINHA
  var celulaDataAbertura = abaAtual.getRange(linha, COLUNAS.DATA_ABERTURA);
  if (celulaDataAbertura.getValue() === "") {
    celulaDataAbertura.setValue(new Date());
    var celulaStatus = abaAtual.getRange(linha, COLUNAS.STATUS_IS);
    if (celulaStatus.getValue() === "") celulaStatus.setValue(STATUS_NAMES.ABERTA);
  }

  // 2. LÓGICA DE FINALIDADE e DATA
  if (colunaEditada == COLUNAS.FINALIDADE || colunaEditada == COLUNAS.DATA_ENTREVISTA) {
    // Visual para Remarcação
    if (colunaEditada == COLUNAS.DATA_ENTREVISTA && oldValue) {
      var celulaMedico = abaAtual.getRange(linha, COLUNAS.MEDICO);
      celulaMedico.clearContent();
      celulaMedico.setBackground(CORES.ALERTA_VERMELHO);
    }
    tratarFinalidadeEMedico(e, abaAtual, range, colunaEditada, valorEditado);
  }

  // 3. LÓGICA ESCOLHA MÉDICO (Tira cor de alerta)
  if (colunaEditada == COLUNAS.MEDICO && valorEditado != "") {
    range.setBackground(null);
  }

  // 4. LÓGICA HNRe
  if (colunaEditada == COLUNAS.OM) {
    tratarColunaOM(e, abaAtual, range, valorEditado);
  }

  // 5. LÓGICA INSPECIONADO
  if (colunaEditada == COLUNAS.INSPECIONADO) {
    tratarColunaInspecionado(e, abaAtual, range, valorEditado);
  }

  // 6. GESTÃO DE STATUS E MSG
  var colunasQueAfetamStatus = [COLUNAS.DATA_ENTREVISTA, COLUNAS.LAUDO, COLUNAS.OBSERVACOES, COLUNAS.TIS, COLUNAS.DS1A];
  if (colunasQueAfetamStatus.indexOf(colunaEditada) > -1) {
    atualizarStatusDaInspecao(e, abaAtual, linha, colunaEditada);
  }

  // 7. LÓGICA DE RESET DE CORES (Se o usuário corrigir o problema)
  
  // A) Se mudar o StatusIS de "Conclusão Pendente" para outra coisa -> Limpa cor da linha
  if (colunaEditada == COLUNAS.STATUS_IS) {
    // Nota: Como o Status é dropdown ou automático, verificamos se saiu do estado de alerta
    // e se a linha estava vermelha (opcional, ou simplesmente limpamos)
    if (valorEditado != STATUS_NAMES.PENDENTE) {
       abaAtual.getRange(linha, 1, 1, 25).setBackground(null);
    }
  }

  // B) Se mudar MSG para "MSG ENVIADA" -> Limpa cor da linha
  if (colunaEditada == COLUNAS.MSG) {
    if (valorEditado == MSG_STATUS.ENVIADA) {
      abaAtual.getRange(linha, 1, 1, 25).setBackground(null);
    }
  }
}


/**
 * --- FUNÇÃO: GESTÃO DE STATUS (WORKFLOW) ---
 */
function atualizarStatusDaInspecao(e, aba, linha, colunaEditada) {
  var rangeLinha = aba.getRange(linha, 1, 1, 25); 
  var valores = rangeLinha.getValues()[0]; 

  var vDataEntrevista = valores[COLUNAS.DATA_ENTREVISTA - 1];
  var vLaudo = String(valores[COLUNAS.LAUDO - 1]);
  var vObs = String(valores[COLUNAS.OBSERVACOES - 1]);
  var vTIS = String(valores[COLUNAS.TIS - 1]);
  var vDS1a = String(valores[COLUNAS.DS1A - 1]);
  var vDataLaudo = valores[COLUNAS.DATA_LAUDO - 1];
  var vStatusAtual = String(valores[COLUNAS.STATUS_IS - 1]);

  var novoStatus = "";
  var atualizarMsg = false;
  var atualizarDataLaudo = false;

  // -- VERIFICAÇÃO HIERÁRQUICA --
  if (vDS1a !== "" && vTIS !== "" && vLaudo !== "") {
    novoStatus = STATUS_NAMES.ASSINADO;
    atualizarMsg = true;
  }
  else if (vTIS !== "" && vLaudo !== "") {
    novoStatus = STATUS_NAMES.VOTADA;
  }
  else if (vLaudo !== "") {
    novoStatus = STATUS_NAMES.CONCLUIDA;
    if (vDataLaudo === "" || colunaEditada == COLUNAS.LAUDO) atualizarDataLaudo = true;
  }
  else if (vDataEntrevista !== "") {
    if (colunaEditada == COLUNAS.DATA_ENTREVISTA && e.oldValue) {
      novoStatus = STATUS_NAMES.REMARCADA;
    } 
    else if (vObs !== "") {
      novoStatus = STATUS_NAMES.PENDENTE;
    }
    else {
      if (vStatusAtual == STATUS_NAMES.REMARCADA && colunaEditada != COLUNAS.DATA_ENTREVISTA) {
        novoStatus = STATUS_NAMES.REMARCADA;
      } else {
        novoStatus = STATUS_NAMES.AGENDADA;
      }
    }
  }
  else {
    novoStatus = STATUS_NAMES.ABERTA;
  }

  // -- APLICAÇÃO --
  // Reset de cor: Se o status mudou E era "Conclusão Pendente" (ou a linha estava vermelha), limpa a cor
  if (novoStatus != vStatusAtual) {
    aba.getRange(linha, COLUNAS.STATUS_IS).setValue(novoStatus);
    
    // Se o status deixou de ser Pendente, limpa a cor da linha
    if (vStatusAtual == STATUS_NAMES.PENDENTE && novoStatus != STATUS_NAMES.PENDENTE) {
      aba.getRange(linha, 1, 1, 25).setBackground(null);
    }
  }

  if (atualizarMsg && novoStatus == STATUS_NAMES.ASSINADO) {
    aba.getRange(linha, COLUNAS.MSG).setValue(MSG_STATUS.PENDENTE);
  }

  if (atualizarDataLaudo) {
    aba.getRange(linha, COLUNAS.DATA_LAUDO).setValue(new Date());
  }
}

/**
 * --- FUNÇÕES AUXILIARES ---
 */
function tratarFinalidadeEMedico(e, aba, range, colunaEditada, valorEditado) {
  var linha = range.getRow();
  var celulaFinalidade = aba.getRange(linha, COLUNAS.FINALIDADE);
  var celulaAMP = aba.getRange(linha, COLUNAS.AMP);
  var celulaMedico = aba.getRange(linha, COLUNAS.MEDICO);
  var celulaData = aba.getRange(linha, COLUNAS.DATA_ENTREVISTA);
  
  var textoFinalidade = (colunaEditada == COLUNAS.FINALIDADE) ? valorEditado : String(celulaFinalidade.getValue()).trim();
  
  if (textoFinalidade == "") {
    celulaAMP.clearContent();
    celulaMedico.clearContent().clearDataValidations();
    range.setBackground(null);
    return;
  }

  var abaRef = e.source.getSheetByName(NOMES_ABAS.FINALIDADES);
  if (!abaRef) return;
  var dados = abaRef.getDataRange().getValues();
  var amp = "";

  for (var i = 1; i < dados.length; i++) {
    if (String(dados[i][0]).trim().toUpperCase() == textoFinalidade.toUpperCase()) {
      amp = dados[i][1];
      break;
    }
  }

  if (amp != "") {
    if (colunaEditada == COLUNAS.FINALIDADE) celulaAMP.setValue(amp);
    
    var dataRaw = celulaData.getValue();
    var diaSemana = (dataRaw instanceof Date) ? dataRaw.getDay() : -1;
    criarDropdownMedico(e.source, celulaMedico, amp, diaSemana);
  } else {
    if (colunaEditada == COLUNAS.FINALIDADE) celulaAMP.setValue("Não encontrado");
  }
}

function criarDropdownMedico(planilha, celulaAlvo, tipoAMP, diaSemana) {
  var abaMedicos = planilha.getSheetByName(NOMES_ABAS.MEDICOS);
  if (!abaMedicos) return;
  var dados = abaMedicos.getDataRange().getValues();
  
  var colLeitura = (String(dados[0][0]).trim() == tipoAMP) ? 0 : (String(dados[0][1]).trim() == tipoAMP) ? 1 : -1;
  if (colLeitura == -1) return;

  var lista = [];
  for (var i = 1; i < dados.length; i++) {
    var medico = String(dados[i][colLeitura]).trim();
    if (medico != "") {
      if (diaSemana >= 0) {
        var dias = ESCALA_MEDICOS[medico];
        if (dias && dias.indexOf(diaSemana) > -1) lista.push(medico);
      } else {
        lista.push(medico);
      }
    }
  }

  if (lista.length > 0) {
    var regra = SpreadsheetApp.newDataValidation().requireValueInList(lista, true).setAllowInvalid(false).build();
    if (celulaAlvo.getValue() == "s/ médico disponível nesse dia") celulaAlvo.setValue("");
    celulaAlvo.setDataValidation(regra);
  } else {
    celulaAlvo.clearDataValidations();
    celulaAlvo.setValue("s/ médico disponível nesse dia");
  }
}

function tratarColunaOM(e, aba, range, valorEditado) {
  var linha = range.getRow();
  var celulaPGQ = aba.getRange(linha, COLUNAS.PGQ);
  var celulaNIP = aba.getRange(linha, COLUNAS.NIP);
  var celulaInspecionado = aba.getRange(linha, COLUNAS.INSPECIONADO);

  if (valorEditado.toUpperCase() == "HNRE") {
    if (celulaPGQ.getValue() === "" && celulaNIP.getValue() === "" && celulaInspecionado.getValue() === "") {
      celulaPGQ.setBackground(CORES.CINZA_TEMP);
      celulaNIP.setBackground(CORES.CINZA_TEMP);
      celulaInspecionado.setBackground(CORES.AMARELO_TEMP);

      var abaMilitares = e.source.getSheetByName(NOMES_ABAS.MILITARES_HNRE);
      if (abaMilitares) {
        var dadosMilitares = abaMilitares.getDataRange().getValues();
        var listaNomes = [];
        for (var i = 1; i < dadosMilitares.length; i++) {
          var nome = String(dadosMilitares[i][2]).trim();
          if (nome != "") listaNomes.push(nome);
        }
        if (listaNomes.length > 0) {
          var regra = SpreadsheetApp.newDataValidation().requireValueInList(listaNomes, true).setAllowInvalid(false).build();
          celulaInspecionado.setDataValidation(regra);
        }
      }
    }
  }
}

function tratarColunaInspecionado(e, aba, range, valorEditado) {
  var linha = range.getRow();
  var valorOM = aba.getRange(linha, COLUNAS.OM).getValue();
  
  if (String(valorOM).toUpperCase() == "HNRE" && valorEditado != "") {
    var abaMilitares = e.source.getSheetByName(NOMES_ABAS.MILITARES_HNRE);
    if (!abaMilitares) return;

    var dados = abaMilitares.getDataRange().getValues();
    var pgqEncontrado = "", nipEncontrado = "", achou = false;

    for (var i = 1; i < dados.length; i++) {
      if (String(dados[i][2]).trim().toUpperCase() == valorEditado.toUpperCase()) {
        pgqEncontrado = dados[i][0];
        nipEncontrado = dados[i][1];
        achou = true;
        break;
      }
    }

    if (achou) {
      aba.getRange(linha, COLUNAS.PGQ).setValue(pgqEncontrado).setBackground(null);
      aba.getRange(linha, COLUNAS.NIP).setValue(nipEncontrado).setBackground(null);
      aba.getRange(linha, COLUNAS.INSPECIONADO).setBackground(null);
    }
  }
}

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
