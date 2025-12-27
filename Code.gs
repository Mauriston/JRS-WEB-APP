// ================================================================= //
//                      CONFIGURAÇÕES GLOBAIS                        //
// ================================================================= //

const ss = SpreadsheetApp.getActiveSpreadsheet();
// Mapeamento das Abas - Certifique-se que os nomes batem com sua planilha
const listasRefSheet = ss.getSheetByName('ListasRef');
const listaControleSheet = ss.getSheetByName('ListaControle');
const militaresHnreSheet = ss.getSheetByName('MilitaresHNRe');
const concursosSheet = ss.getSheetByName('ListaConcursos');

// --- Configs do Gerador de Pareceres ---
const TEMPLATE_IDS = {
  'Psiquiatria': '1dBBPpAUigm9DFUWqyP0NkTEVGxeHWwKZF8dnoJ7xqP8',
  'Psicologia': '1eQiRCtmF-V1Etn7fp6AbhTGZbYkqJlLrQYGjLRfePqQ',
  'Hepatologia': '12-s0h077A6hwipVe4oARcor4cNMKeAGOl6elV-pk_HQ',
  'Cardiologia': '1woGqRVEpe7hQkqZiPrPn2bUgIgcN7MtImn0plq8fbLE',
  'Ortopedia': '1qmi93Y_kZpNZEeYcqhSA41KVsZ4gFE1MqkK6kbAsheI'
};
const SHEET_ID_PARECER_MILITARES = "1yqZYEh2apMezknd0_0sBBEbliV3jwoDEw43FipXwsUQ";
const PDF_FOLDER_ID = "176YQTOOWXuE78Xul49XYpJsVNyu-eZFi"; // Pasta onde os PDFs serão salvos

const PERITO_EMAILS = {
  'CT Mauriston': 'mauriston.martins@marinha.mil.br',
  'CT Júlio César': 'julio.xaiver@marinha.mil.br',
  '1T Salyne': 'salyne.martins@marinha.mil.br',
  '1T Luz': 'lucas.luz@marinha.mil.br',
  '2T Trindade': 'marcelo.trindade@marinha.mil.br'
};

// ================================================================= //
//          ROTEADOR PRINCIPAL (doGet)                               //
// ================================================================= //

function doGet(e) {
  let page = e.parameter.page;
  
  // Definições de segurança e meta tags padrão para todos os templates
  const output = (filename, title) => {
    return HtmlService.createTemplateFromFile(filename)
      .evaluate()
      .setTitle(title)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  };

  if (page == 'dashboard') {
    return output('Dashboard', 'Dashboard JRS');
  } else if (page == 'inspecoes') {
    return output('Inspecoes', 'Gerenciar Inspeções');
  } else if (page == 'formulario') {
    return output('Formulario', 'Formulário de Inspeção');
  } else if (page == 'parecer') {
    return output('Parecer', 'Gerador de Pareceres');
  }
  
  // Rota padrão (pode alterar para 'Dashboard' se preferir)
  return output('Dashboard', 'JRS App');
}

function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}

// ================================================================= //
//      BACKEND: DADOS PARA O DASHBOARD E TABELA (Inspecoes.html)    //
// ================================================================= //

function getDashboardData() {
  try {
    // 1. Dados de Rotina (ListaControle)
    // Assumindo colunas A a N conforme seu código original
    const lastRow = listaControleSheet.getLastRow();
    const rotinaData = lastRow > 1 ? listaControleSheet.getRange('A2:N' + lastRow).getValues() : [];
    
    // 2. Dados de Concursos
    let concursoData = [];
    if(concursosSheet && concursosSheet.getLastRow() > 1) {
        concursoData = concursosSheet.getRange('A2:I' + concursosSheet.getLastRow()).getValues();
    }

    // 3. Formata dados para os Gráficos/KPIs do Dashboard
    const dashboardData = rotinaData.map(r => ({
      EventDate: r[1] ? new Date(r[1]).toLocaleDateString('pt-BR') : '', 
      StatusIS: r[7], 
      Finalidade: r[2], 
      MSG: r[13], 
      type: 'Rotina'
    }));
    
    concursoData.forEach(r => {
      dashboardData.push({
        EventDate: r[0] ? new Date(r[0]).toLocaleDateString('pt-BR') : '', 
        StatusIS: r[8], 
        Finalidade: r[6], 
        MSG: '', 
        type: 'Concurso'
      });
    });
    
    // 4. Formata dados para a TABELA (Inspecoes.html)
    // CRÍTICO: As chaves (Keys) AQUI devem bater com o JS do Inspecoes.html (row.Inspecionado, row.StatusIS, etc.)
    const tableData = rotinaData.map(r => ({
      IS: r[0],               // Coluna A
      DataEntrevista: r[1] ? new Date(r[1]).toLocaleDateString('pt-BR') : '', // Coluna B
      Finalidade: r[2],       // Coluna C
      OM: r[3],               // Coluna D
      'P/G/Q': r[4],          // Coluna E (Atenção às aspas devido às barras)
      NIP: r[5],              // Coluna F
      Inspecionado: r[6],     // Coluna G
      StatusIS: r[7],         // Coluna H
      DataLaudo: r[8] ? new Date(r[8]).toLocaleDateString('pt-BR') : '', // Coluna I
      Laudo: r[9],            // Coluna J
      Restrições: r[10],      // Coluna K
      TIS: r[11],             // Coluna L
      'DS-1a': r[12],         // Coluna M
      MSG: r[13]              // Coluna N
    }));
    
    // 5. Opções de Restrições (usado no Modal de Edição do Inspecoes.html)
    const restricoesOptions = listasRefSheet.getRange('G2:G' + listasRefSheet.getLastRow()).getValues().flat().filter(String);
    
    return { dashboardData, tableData, restricoesOptions }; 
  } catch(e) {
    console.error("Erro em getDashboardData: " + e.message);
    throw new Error("Falha ao carregar dados: " + e.message);
  }
}

// ================================================================= //
//      BACKEND: DADOS PARA O FORMULÁRIO (Formulario.html)           //
// ================================================================= //

function getDropdownData() {
  try {
    const lastRow = listasRefSheet.getLastRow();
    if (lastRow < 2) return { omOptions:[], pgOptions:[], finalidadeOptions:[], statusOptions:[], restricoesOptions:[] };

    const omOptions = listasRefSheet.getRange('B2:B' + lastRow).getValues().flat().filter(String);
    const pgOptions = listasRefSheet.getRange('C2:C' + lastRow).getValues().flat().filter(String);
    const finalidadeOptions = listasRefSheet.getRange('A2:A' + lastRow).getValues().flat().filter(String);
    const statusOptions = listasRefSheet.getRange('F2:F' + lastRow).getValues().flat().filter(String);
    const restricoesOptions = listasRefSheet.getRange('G2:G' + lastRow).getValues().flat().filter(String);
    
    return { omOptions, pgOptions, finalidadeOptions, statusOptions, restricoesOptions };
  } catch (e) {
    console.error("Erro em getDropdownData: " + e.message);
    throw new Error("Erro ao buscar listas.");
  }
}

function getHnreMilitaryDataForForm() {
  try {
    const data = militaresHnreSheet.getRange('A2:C' + militaresHnreSheet.getLastRow()).getValues();
    // Mapeia para o formato esperado pelo Select2 no Formulario.html
    return data.map(row => ({ 
      pg: row[0], 
      nip: row[1],
      inspecionado: row[2] 
    })).filter(m => m.inspecionado);
  } catch (e) {
    console.error("Erro em getHnreMilitaryDataForForm: " + e.message);
    throw new Error("Erro ao buscar militares.");
  }
}

function addNewInspection(formData) {
  try {
    const headers = listaControleSheet.getRange(1, 1, 1, listaControleSheet.getLastColumn()).getValues()[0];
    
    // Tratamento de Restrições (Array -> String)
    let restricoesString = "";
    if (formData.restricoes && Array.isArray(formData.restricoes)) {
        restricoesString = formData.restricoes.join(', ');
        if (formData.restricoes.includes('Outros') && formData.outrosRestricao) {
          restricoesString = restricoesString.replace('Outros', `Outros: ${formData.outrosRestricao}`);
        }
    }

    // Gera ID/IS se não vier do form (fallback)
    const isVal = formData.is || Math.floor(Math.random() * 900000) + 100000;

    const rowData = {
      'OM': formData.om,
      'Inspecionado': formData.inspecionado,
      'P/G/Q': formData.pg,
      'NIP': formData.nip,
      'IS': isVal, 
      'Finalidade': formData.finalidade,
      'DataEntrevista': formData.dataEntrevista, // O Google Sheets converte strings de data 'yyyy-mm-dd' automaticamente
      'StatusIS': formData.statusIS || "Agendada",
      'TIS': formData.tis || "",
      'DS-1a': formData.ds1a || "",
      'Laudo': formData.laudo || "",
      'DataLaudo': formData.dataLaudo || "",
      'Restrições': restricoesString,
      'MSG': "ENVIADA" // Default
    };

    const newRow = headers.map(header => rowData[header]);
    listaControleSheet.appendRow(newRow);
    
    return { status: 'success', message: 'Inspeção adicionada com sucesso!' };
  } catch(e) {
    console.error("Erro em addNewInspection: " + e.message);
    return { status: 'error', message: `Falha ao adicionar: ${e.message}` };
  }
}

// ================================================================= //
//      BACKEND: AÇÕES DE EDIÇÃO/ATUALIZAÇÃO (Inspecoes.html)        //
// ================================================================= //

function updateMsgStatus(isNumber) {
  try {
    const headers = listaControleSheet.getRange(1, 1, 1, listaControleSheet.getLastColumn()).getValues()[0];
    const isColIndex = headers.indexOf('IS');
    const msgColIndex = headers.indexOf('MSG');
    
    if (isColIndex === -1 || msgColIndex === -1) throw new Error("Colunas não encontradas.");

    const data = listaControleSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) { // Começa em 1 para pular cabeçalho
      if (String(data[i][isColIndex]) == String(isNumber)) {
        listaControleSheet.getRange(i + 1, msgColIndex + 1).setValue('ENVIADA');
        return { success: true, message: 'Status atualizado.' };
      }
    }
    return { success: false, message: 'IS não encontrada.' };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

function updateInspectionConclusion(formData) {
  try {
    const headers = listaControleSheet.getRange(1, 1, 1, listaControleSheet.getLastColumn()).getValues()[0];
    const colIndices = {
      is: headers.indexOf('IS'),
      laudo: headers.indexOf('Laudo'),
      dataLaudo: headers.indexOf('DataLaudo'),
      tis: headers.indexOf('TIS'),
      ds1a: headers.indexOf('DS-1a'),
      restricoes: headers.indexOf('Restrições')
    };

    const data = listaControleSheet.getDataRange().getValues();
    let rowIndex = -1;

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][colIndices.is]) == String(formData.isNumber)) {
        rowIndex = i + 1; // +1 pois getRange é 1-based
        break;
      }
    }

    if (rowIndex === -1) throw new Error("IS não encontrada.");

    // Tratamento Restrições
    let restricoesString = "";
    if (formData.restricoes && Array.isArray(formData.restricoes)) {
        restricoesString = formData.restricoes.join(', ');
        if (formData.restricoes.includes('Outros') && formData.outrosRestricao) {
          restricoesString = restricoesString.replace('Outros', `Outros: ${formData.outrosRestricao}`);
        }
    }

    // Atualiza células
    listaControleSheet.getRange(rowIndex, colIndices.laudo + 1).setValue(formData.laudo);
    listaControleSheet.getRange(rowIndex, colIndices.dataLaudo + 1).setValue(formData.dataLaudo);
    listaControleSheet.getRange(rowIndex, colIndices.tis + 1).setValue(formData.tis);
    listaControleSheet.getRange(rowIndex, colIndices.ds1a + 1).setValue(formData.ds1a);
    listaControleSheet.getRange(rowIndex, colIndices.restricoes + 1).setValue(restricoesString);

    return { 
      success: true, 
      updatedData: { // Retorna dados para atualizar a tabela no front sem reload
        Laudo: formData.laudo,
        DataLaudo: formData.dataLaudo ? new Date(formData.dataLaudo).toLocaleDateString('pt-BR') : '',
        TIS: formData.tis,
        'DS-1a': formData.ds1a,
        'Restrições': restricoesString
      }
    };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

function remarcarInspecao(formData) {
  try {
    const headers = listaControleSheet.getRange(1, 1, 1, listaControleSheet.getLastColumn()).getValues()[0];
    const isCol = headers.indexOf('IS');
    const dataCol = headers.indexOf('DataEntrevista');
    const statusCol = headers.indexOf('StatusIS');

    const data = listaControleSheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][isCol]) == String(formData.isNumber)) {
        // Ajuste de fuso horário simples para data (evita o problema de dia anterior)
        const parts = formData.novaData.split('-');
        const dateObj = new Date(parts[0], parts[1]-1, parts[2]);

        listaControleSheet.getRange(i + 1, dataCol + 1).setValue(dateObj);
        listaControleSheet.getRange(i + 1, statusCol + 1).setValue('Remarcada');
        
        return { 
          success: true, 
          updatedData: { 
            DataEntrevista: dateObj.toLocaleDateString('pt-BR'),
            StatusIS: 'Remarcada'
          }
        };
      }
    }
    throw new Error("IS não encontrada.");
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// ================================================================= //
//      BACKEND: GERADOR DE PARECERES (Parecer.html)                 //
// ================================================================= //

function getHnreMilitaryDataForParecer() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID_PARECER_MILITARES).getSheetByName("MILITAR");
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
    // Filtra apenas HNRE e mapeia
    return data
      .filter(row => row[2] === "HNRE" && row[1])
      .map(row => ({ nip: row[0], name: row[1], posto: row[3] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    return { error: e.toString() };
  }
}

function processForm(formData) {
  try {
    const pdfFolder = DriveApp.getFolderById(PDF_FOLDER_ID);
    const templateId = TEMPLATE_IDS[formData.ESPECIALIDADE];
    if (!templateId) throw new Error("Template não encontrado para a especialidade.");

    const templateDoc = DriveApp.getFileById(templateId);
    const newDocName = `Parecer - ${formData.NOME} - ${new Date().toLocaleDateString('pt-BR').replace(/\//g,'-')}`;
    const newDocFile = templateDoc.makeCopy(newDocName, pdfFolder);
    const doc = DocumentApp.openById(newDocFile.getId());
    const body = doc.getBody();

    // Helpers
    const getFullName = (p) => PERITO_EMAILS[p] ? getPeritoFullName(p) : p;
    const getPosto = (p) => getPeritoPosto(p);

    const hoje = new Date();
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const dataExtenso = `${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`;

    // Substituições
    body.replaceText(`{{NOME}}`, formData.NOME || '');
    body.replaceText(`{{GRAU_HIERARQUICO}}`, formData.GRAU_HIERARQUICO || '');
    body.replaceText(`{{NIP_MAT}}`, formData.NIP_MAT || '');
    body.replaceText(`{{FINALIDADE_INSP}}`, formData.FINALIDADE_INSP || '');
    body.replaceText(`{{INFO_COMPLEMENTARES}}`, formData.INFO_COMPLEMENTARES || 'Nada consta.');
    body.replaceText(`{{PERITO}}`, getFullName(formData.PERITO_SELECAO).toUpperCase());
    body.replaceText(`{{POSTO}}`, getPosto(formData.PERITO_SELECAO));
    body.replaceText(`{{DATA}}`, dataExtenso);
    
    // Lógica do Membro
    let membroValue = 'Membro da Junta Regular de Saúde';
    if (formData.PERITO_SELECAO.includes('Mauriston')) membroValue = 'Presidente';
    else if (formData.PERITO_SELECAO.includes('Júlio') || formData.PERITO_SELECAO.includes('Trindade')) membroValue = 'Médico Perito Isolado';
    body.replaceText(`{{MEMBRO}}`, membroValue);

    doc.saveAndClose();
    
    const pdfFile = pdfFolder.createFile(newDocFile.getAs(MimeType.PDF)).setName(newDocName + ".pdf");
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    newDocFile.setTrashed(true); // Remove o doc temporário

    return { success: true, pdfUrl: pdfFile.getUrl(), pdfId: pdfFile.getId() };
  } catch (error) {
    return { success: false, message: error.toString() };
  }
}

function sendPdfByEmail(pdfId, formData, emailTarget) {
  try {
    const pdfFile = DriveApp.getFileById(pdfId);
    const peritoSel = formData.PERITO_SELECAO;
    const peritoEmail = PERITO_EMAILS[peritoSel];
    const peritoNome = getPeritoFullName(peritoSel);

    const recipient = emailTarget === 'zimbra' ? peritoEmail : 'hnre.jrs@marinha.mil.br';
    const subject = `SOL PARECER PSIQ ${formData.GRAU_HIERARQUICO} ${formData.NOME}`;
    const htmlBody = `
      TRM em anexo SOL de parecer psiquiátrico para conclusão de IS ${formData.FINALIDADE_INSP} <br>
      atinente a ${formData.NIP_MAT} ${formData.GRAU_HIERARQUICO} ${formData.NOME}.<br><br>
      Atenciosamente,<br><br>
      <b>${peritoNome.toUpperCase()}</b><br>JRS/HNRe
    `;

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody,
      name: peritoNome,
      replyTo: peritoEmail,
      attachments: [pdfFile.getAs(MimeType.PDF)]
    });

    return { success: true, message: 'E-mail enviado para ' + recipient };
  } catch (e) {
    return { success: false, message: 'Erro ao enviar e-mail: ' + e.toString() };
  }
}

// Helpers de Perito
function getPeritoFullName(selection) { 
  const map = { 
    'CT Mauriston': 'Mauriston Renan Martins Silva', 
    'CT Júlio César': 'Júlio César Xavier Filho', 
    '1T Salyne': 'Salyne Regina Martins Roberto', 
    '1T Luz': 'Lucas Luz Nunes', 
    '2T Trindade': 'Marcelo Fulco Trindade' 
  };
  return map[selection] || selection; 
}

function getPeritoPosto(selection) { 
  const map = { 
    'CT Mauriston': 'Capitão-Tenente (Md)', 
    '1T Salyne': 'Primeiro-Tenente (Md)', 
    '1T Luz': 'Primeiro-Tenente (Md)', 
    'CT Júlio César': 'Capitão-Tenente (RM2-Md)', 
    '2T Trindade': 'Segundo-Tenente (RM2-Md)' 
  };
  return map[selection] || ''; 
}
