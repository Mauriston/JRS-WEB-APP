![JRS HNRe](https://i.imgur.com/QJOmuG0.png)  


# ‼️ ESTRUTURA DO APPWEB ‼️

##  ACESSE:    [DASHBOARD](https://script.google.com/macros/s/AKfycbwQrRBreeORWB4CwwB1r9gK03GcLDEH_WQohCIbhRO5NDAY5otXhQFT6lw1tUJVMBIOQA/exec)      |    [PLANILHA](https://docs.google.com/spreadsheets/d/12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw/edit?usp=sharing)    

# 1. BACKEND

## Código descrito no arquivo [`Code.gs`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs) 

## ESTRUTURA DA PLANILHA DE DADOS DO GOOGLE SHEETS:
- ID:`12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw`
- Principais Abas: `ListaControle`, `ListasRef`, `MilitaresHNRe` e `IconsRef`

A planilha **"ListaControle"** (Intervalo A1:O592) é uma tabela de controle de Inspeções de Saúde (IS), que monitora o processo desde a abertura até a conclusão e envio do Termo de Inspeção de Saúde (TIS).

### 1.1 Detalhes das Colunas da "ListaControle"

A tabela possui 19 colunas com diferentes tipos e formatos de dados:

| Coluna | Tipo de Dado Primário | Formato/Natureza dos Dados | Exemplos de Dados Possíveis (Amostra) | Menu Suspenso (Validação)? | Correlação com Outras Abas (Menu Suspenso) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **IS** | Numérico/Texto | Número de protocolo da Inspeção de Saúde. | 1127905, 11320-8 | Não | Não |
| **DataAberturaIS** | Data | Data no formato DD/MM/AAAA. | 05/06/2025, 03/09/2025 | Não | Não |
| **DataEntrevista** | Data | Data no formato DD/MM/AAAA. | 11/06/2025, 16/09/2025 | Não | Não |
| **HoraEntrevista** | Hora | Hora no formato HH:MM. | 07:30, 08:00 | Não | Não |
| **Finalidade** | Texto | Descrição do motivo da Inspeção. | BENEFÍCIO, TÉRMINO DE INCAPACIDADE | **Sim** | **ListasRef!FINALIDADES** |
| **AMP** | Texto | Sigla da Agência (JRS ou MPI). Preenchido automaticamente pelo script. | JRS, MPI | Não (Automático) | Derivado da aba **FinalidadesAMP** baseado na Finalidade escolhida. |
| **Médico** | Texto | Nome/Patente do Médico encarregado. | CT LUZ, CT MAURISTON | **Sim** (Dinâmico) | **AMPMedicos** (Menu criado pelo script, filtrado por AMP e Dia da Semana). |
| **OM** | Texto (Sigla) | Sigla da Organização Militar. | CPAL, HNRe, CPPE | **Sim** | **ListasRef!OM** |
| **P/G/Q** | Texto (Sigla) | Posto/Graduação/Quadro. | DEP, 3SG-AD, 1T (MD) | **Sim** | **ListasRef!P/G** (Ou preenchido automaticamente para HNRe). |
| **NIP** | Numérico/Texto | Número de Identificação Pessoal. | 03.8589.61, 113.207.654-40 | Não | Preenchido automaticamente para HNRe (Aba **MilitaresHNRe**). |
| **Inspecionado** | Texto | Nome Completo. | MARIA DALVA LEITE TITO | **Sim** (Condicional) | **MilitaresHNRe** (Menu aparece apenas se OM for HNRe). |
| **StatusIS** | Texto | Status atual do fluxo da Inspeção. | TIS assinado, IS aberta, IS Cancelada | **Sim** | **ListasRef!StatusIS** (Atualizado automaticamente pelo script). |
| **DataLaudo** | Data | Data de emissão do laudo. | 26/08/2025, 22/10/2025 | Não | Não (Preenchido autom. pelo script). |
| **Laudo** | Texto | Parecer final do laudo. | "Apto para o SAM.", "Incapaz temporariamente..." | Não | Não |
| **Observações** | Texto | Notas adicionais sobre o processo. | "Toxicológico pendente", "Aguarda parecer" | Não | Não |
| **Restrições** | Texto | Restrições laborais/físicas. | Marchas, TAF/TFM | **Sim** | **ListasRef!Restrições** |
| **TIS** | Texto/Numérico | Número do Termo de Inspeção. | 025.000.58169 | Não | Não |
| **DS-1a** | Texto | Documento anexo ao TIS. | 2025Z1135E1 | Não | Não |
| **MSG** | Texto | Status da comunicação (Mensagem). | MSG ENVIADA, MSG PENDENTE | **Sim** | **ListasRef!MSG** (Atualizado autom. pelo script). |

### 1.2 Correlação de Validação e Automação de Dados com Outras Abas

As colunas da planilha utilizam duas formas distintas de conexão com abas externas para garantir a integridade dos dados:
1.  **Validação de Dados Estática:** Menus suspensos nativos do Google Sheets, baseados na aba **"ListasRef"**.
2.  **Correlação Dinâmica (Script):** Preenchimento automático e menus inteligentes gerados pelo Google Apps Script, baseados nas abas de regras **"FinalidadesAMP"**, **"AMPMedicos"** e **"MilitaresHNRe"**.

A tabela abaixo detalha o funcionamento de cada coluna:

| Coluna em "ListaControle" | Aba/Fonte de Referência | Como Funciona a Correlação |
| :---: | :---: | :--- |
| **Finalidade** | **ListasRef** (Coluna FINALIDADES) | **Menu Suspenso (Nativo):** Garante que apenas finalidades padronizadas sejam selecionadas pelo usuário. |
| **AMP** | **FinalidadesAMP** | **Automação (Script):** O código consulta esta aba. Ao escolher uma *Finalidade*, ele busca a correspondência nesta tabela para preencher automaticamente se é **JRS** ou **MPI**. |
| **Médico** | **AMPMedicos** | **Menu Dinâmico (Script):** O código consulta esta aba. Ele cruza o tipo de **AMP** (JRS/MPI) com o **Dia da Semana** da entrevista para gerar um menu suspenso exclusivo, exibindo apenas os médicos disponíveis naquele dia. |
| **OM** | **ListasRef** (Coluna OM) | **Menu Suspenso (Nativo):** Padroniza as siglas das Organizações Militares. |
| **P/G/Q** | **ListasRef** (Coluna P/G) | **Menu Suspenso (Nativo) / Automação:** Padroniza os Postos/Graduações. Se a OM for "HNRe", esta coluna é preenchida automaticamente pelo script. |
| **StatusIS** | **ListasRef** (Coluna StatusIS) | **Menu Suspenso (Nativo) / Automação:** Padroniza os estágios da Inspeção. O script utiliza estes termos exatos para atualizar o fluxo de trabalho (Workflow) automaticamente. |
| **Restrições** | **ListasRef** (Coluna Restrições) | **Menu Suspenso (Nativo):** Padroniza as restrições médicas aplicáveis. |
| **MSG** | **ListasRef** (Coluna MSG) | **Menu Suspenso (Nativo) / Automação:** Padroniza os status de comunicação. O script usa estes termos para definir pendências ou atrasos. |
| **Inspecionado** | **MilitaresHNRe** | **Menu Dinâmico (Script):** Este menu aparece **apenas** se a OM selecionada for "HNRe". Ele lista os nomes contidos na coluna C desta aba para facilitar a busca. |

### Diferença Importante para Manutenção:
* **Colunas baseadas em `ListasRef`:** São atualizadas nativamente. Se você adicionar um novo item na aba `ListasRef`, ele aparecerá imediatamente no menu suspenso da planilha principal.
* **Colunas baseadas em Script (`AMP`, `Médico`, `Inspecionado`):** Dependem da execução do código.
    * A aba `FinalidadesAMP` funciona como um "dicionário" para o robô saber qual AMP atribuir.
    * A aba `AMPMedicos` funciona como a "escala" que o robô lê para construir o menu correto.
    * A aba `MilitaresHNRe` funciona como o "banco de dados" de pessoal para o preenchimento automático.

### 1.3 Estrutura da Aba 'MilitaresHNRe' (A1:E261)

A folha **"MilitaresHNRe"** parece ser uma lista ou cadastro detalhado dos militares inspecionados ou a serem inspecionados, contendo dados de identificação e contato.

| Coluna                      | Tipo de Dado Primário | Formato/Natureza dos Dados                                                                  | Exemplos de Dados Possíveis (Amostra)                          | Menu Suspenso (Validação)? |
| :-------------------------- | :-------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------- | :------------------------- |
| **P/G/Q** (Coluna A)        | Texto (Sigla)         | Posto/Graduação/Quadro do inspecionado.                                                     | CMG (MD), CF (CD), CC (S), CT (IM)                             | Não (Dados de entrada)     |
| **NIP** (Coluna B)          | Texto/Numérico        | Número de Identificação Pessoal, formato geralmente `XX.XXXX.XX`. Inclui células em branco. | 97.0429.27, 00.0617.43, (vazio)                                | Não                        |
| **INSPECIONADO** (Coluna C) | Texto                 | Nome Completo do inspecionado.                                                              | LISA TIEMI OGAWA, ARNALDO OLIVEIRA DE JESUS, ELIZABETH LACERDA | Não                        |
| **E-MAIL** (Coluna D)       | Texto                 | Endereço de e-mail. Inclui células em branco.                                               | lisa@marinha.mil.br, fernanda.rocha@marinha.mil.br, (vazio)    | Não                        |
| **Column 5** (Coluna E)     | Texto                 | Gênero ou Categoria. Valores binários.                                                      | Feminino, Masculino                                            | **Sim** (Provável)         |

### 1.4 FUNÇÕES DE AUTOMAÇÕES INTRÍNSECAS À PLANILHA:

# 📋 Documentação das Funcionalidades do Script - Controle de Inspeções JRS

Este documento descreve todas as automações implementadas no Google Apps Script para a gestão do fluxo de trabalho da planilha.

## 1.4.1. Inicialização Automática e Abertura
**O que faz:**
* **Data de Abertura:** Assim que uma nova linha é iniciada (ex: preenchendo a Finalidade ou ID), o sistema insere automaticamente a data atual na coluna `DataAbertura`.
* **Status Inicial:** Se a coluna `StatusIS` estiver vazia na criação da linha, ela é definida automaticamente como **"IS aberta"**.

## 1.4.2. Inteligência de Agendamento (Médicos e AMP)
**O que faz:**
* **Definição de AMP:** Ao selecionar a `Finalidade`, o script consulta a aba de referência e define se é **MPI** ou **JRS** na coluna `AMP`.
* **Menu de Médicos Dinâmico:** Cria um menu dropdown na coluna `Médico` filtrando os profissionais baseados em dois critérios:
    1.  O tipo de AMP (JRS ou MPI).
    2.  O **dia da semana** da `DataEntrevista` (ex: só mostra médicos que atendem às segundas se a data cair numa segunda).
* **Aviso de Indisponibilidade:** Se não houver médico na escala para o dia selecionado, o sistema escreve automaticamente *"s/ médico disponível nesse dia"*.

## 1.4.3. Gestão de Remarcações (Alerta Visual)
**O que faz:**
* Se a `DataEntrevista` for alterada (e já existia uma data anterior), o sistema entende como uma remarcação.
* **Ação:** O sistema apaga o médico selecionado anteriormente e pinta a célula de **vermelho claro**, forçando visualmente o usuário a escolher um novo médico adequado à nova data.
* **Reset:** Ao selecionar o novo médico, a cor de fundo volta ao padrão.

## 1.4.4. Automação de Dados Militares (HNRe)
**O que faz:**
* **Gatilho:** Ao digitar "HNRe" na coluna `OM`:
    * As colunas `P/G/Q` e `NIP` ficam com fundo **cinza** (indicando preenchimento automático).
    * A coluna `Inspecionado` fica com fundo **amarelo** e ganha um menu dropdown com a lista de militares do HNRe.
* **Preenchimento:** Ao selecionar o nome no dropdown, o sistema busca o `P/G/Q` e `NIP` correspondentes, preenche as células e restaura as cores de fundo originais.

## 1.4.5. Gestor de Status Inteligente (Workflow)
**O que faz:**
Uma função central analisa a linha inteira a cada edição e define o `StatusIS` (e `MSG`) seguindo esta hierarquia de prioridade:

1.  **TIS assinado:** Se `DS-1a`, `TIS` e `Laudo` estão preenchidos → Define status e altera `MSG` para "MSG PENDENTE".
2.  **IS Votada s/ assinatura:** Se tem `TIS` e `Laudo`, mas sem `DS-1a`.
3.  **IS Concluída s/ voto:** Se tem apenas o `Laudo`.
    * *Nota:* Preenche automaticamente a `DataLaudo` com a data atual neste momento.
4.  **IS Remarcada:** Se a `DataEntrevista` foi editada manualmente (e não é uma nova linha).
5.  **Conclusão Pendente:** Se tem `DataEntrevista` e `Observações` preenchidas, mas não tem `Laudo`.
6.  **IS Agendada:** Se tem apenas a `DataEntrevista`.
7.  **IS aberta:** Se não tem data definida.

## 1.4.6. Verificação de Prazos (Diário às 06h00)
**O que faz:**
Uma função acionada por tempo varre a planilha todos os dias úteis, calculando prazos (utilizando uma função matemática que ignora sábados e domingos):

* **Cancelamento Automático:** Se `StatusIS` = "IS aberta" e a `DataAbertura` foi há mais de **7 dias úteis**, muda o status para **"IS Cancelada"** e `MSG` para "MSG PENDENTE".
* **Alerta de Atraso na Conclusão:** Se `StatusIS` = "Conclusão Pendente" e a entrevista ocorreu há mais de **20 dias úteis**, pinta a **linha inteira de vermelho**.
* **Alerta de Mensagem Atrasada:** Se `MSG` = "MSG PENDENTE" e o laudo foi feito há mais de **10 dias úteis**, muda para **"MSG ATRASADA"** e pinta a **linha inteira de vermelho**.

## 1.4.7. Limpeza de Alertas (Reset)
**O que faz:**
O sistema remove a cor vermelha da linha automaticamente assim que o usuário resolve a pendência:
* Quando o `StatusIS` deixa de ser "Conclusão Pendente".
* Ou quando a `MSG` é alterada para "MSG ENVIADA".

----- 

# 2. FRONTEND

## O FRONTEND É COMPOSTO POR 3 PÁGINAS QUE APRESENTAM UM MENU DE NAVEGAÇÃO EM COMUM:
* Dashboard: [`Dashboard.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Dashbpard.html)
* Inspeções: [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Inspecoes.html)
* Parecer: [`Parecer.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Parecer.html)


## 2.1 Inspeções: [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Inspecoes.html)

### 📎 LÓGICAS DOS ÍCONES E EDIÇÕES DE STATUS DA TABELA DE [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs)  

**NOTA IMPORTANTE:** A referência visual oficial para os ícones, cores e estilos descritos abaixo encontra-se na aba **`IconsRef`** da planilha `12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw`. O código do Frontend deve refletir exatamente as definições desta aba para manter a consistência do Design System.

# ⚓️ REGRAS DE CORRELAÇÕES E EXIBIÇÃO DOS ÍCONES ⚓️

## 📝 LISTAS DE ÍCONES  📝    

### ÍCONES DE ⏩ AÇÃO DA COLUNA `FINALIDADE` DA TABELA DA PÁGINA [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs)  

|         `Action`        |    `Icon Name`   |  `Color`  |                    `Style`                    | `Icon` |
|:-----------------------:|:----------------:|:---------:|:-------------------------------------------:|:------:|
|       `Agendar IS`      | "event_upcoming" | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/15bb0b0e-bf5b-4a9d-9b6d-facc6359bd71" /> |   |
|       `Reagendar IS`        |  "event_repeat"  | `#FAB932` |  `FILL 0`, `wght 700`, `GRAD 0`, `opsz 40`  | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/faa744e4-95e5-4442-8608-9e3dad1c62a2" /> |   |
|         `Editar IS`         |       "Edit"      | `#050F41` |  `FILL 0`, `wght 400`, `GRAD 0`, `opsz 48`  | <img src="https://github.com/user-attachments/assets/4280fda5-e7d6-4e58-a282-f4aec1c91d48" alt="Edit" width="36" height="36">      |   |
|        `Cancelar IS`        |       "close"      | `#B71C1C` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 24` | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/18afcb36-eb57-4394-bc10-f476b7b0fa70" /> |   |
|       `Registrar IS restituida` |       "reply"      | `#FAB932` |  `FILL 0`, `wght 700`, `GRAD 0`, `opsz 24`  | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/cccd802a-7f00-430f-af9c-326a9b5650fc" /> |   |
| `Registrar MSG enviada` |  "outgoing_mail" | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` | <img src="https://github.com/user-attachments/assets/cd2b2f36-5869-4ccb-80a3-300ae72520ad" alt="outgoing_mail" width="36" height="36"> |   |
| `Abrir Detalhamento IS` |   "visibility"   | `#050F41` |  `FILL 0`, `wght 400`, `GRAD 0`, `opsz 48`  | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/b78ed295-1c66-4985-ac96-fe0cf75a1113" /> |   |


### 🛑 ÍCONES DA COLUNA `STATUS` DA TABELA DA PÁGINA [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs) 🛑 


|             `StatusIS`             |      `Icon Name`      |  `Color`  |                    `Style`                    |                    `Icon`                    |
|:--------------------------------:|:-------------------:|:---------:|:-------------------------------------------:|:-------------------------------------------:|
|             `IS aberta`            |    "folder_open"    | `#050F41` | `FILL 1`, `wght 400`, `GRAD -25`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/77487421-ff09-4915-af18-2e3a00887fac" /> |
| `Declínio de competência de MPI` |       "input"       | `#050F41` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/7f4c5585-a045-41c2-945e-480c0b24c4d9" /> |
|    `Revisão Ex-officio de MPI`    |  "document_search"  | `#050F41` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/bad966bc-efe6-44b1-9a46-6fb1e64a6b39" /> |
|  `Homologada Ex-officio de MPI`  |       "gavel"       | `#050F41` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/a3365faf-0da0-496e-bacb-944860c85711" />      |
|       `Inspecionado atrasado`      |       "acute"       | `#B71C1C` | `FILL 0`, `wght 600`, `GRAD -25`, `opsz 24` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/6348cf28-1695-48bb-a17b-bea87f8bd5c7" /> |
|           `IS Cancelada`           |   "folder_delete"   | `#B71C1C` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/88dc069a-375d-4ea8-a768-d690f917dc6c" />      |
|            `IS Agendada`           |   "calendar_check"  | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/15696efe-ebf2-4885-9814-5881ca6878bf" /> |
|              `Faltou`              |   "person_cancel"   | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img src="https://github.com/user-attachments/assets/0e2f75ad-c85f-4395-b960-9adc34d5201c" alt="event_busy" width="36" height="36"> |
|             `IS Remarcada`         |   "calendar_clock"  | `#FAB932` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/118d2032-81c4-461d-b52a-9df7d19c12cf"/>    |
|        `Conclusão Pendente`       |  "unknown_document" | `#B71C1C` |  `FILL 1`, `wght 500`, `GRAD 0`, `opsz 40`  |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/fb76cc51-47e1-4427-8965-692d00d512e7" />      |
|          `AUDITORIA CPMM`          |  "document_search"  | `#FAB932` | `FILL 1`, `wght 400`, `GRAD -25`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/75531def-443b-4bf7-a239-865676d888be" /> |
|      `Aprovada AUDITORIA CPMM`    |         "task"       | `#079551` |  `FILL 1`, `wght 400`, `GRAD 0`, `opsz 24`  |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/6d44708c-7ee5-49b9-83d0-78e1cf41d7fd" /> |
|            `REVISÃO JSD`           |       "gavel"       | `#FAB932` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/11fb92ae-f16c-4014-a8aa-75c74f6e4e3b" />      |
|          `Homologada  JSD`         |    "folder_check"   | `#079551` | `FILL 1`, `wght 600`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/25c16a28-b0e4-4a94-8c6d-4e1df91e41d7" />      |
|       `Restituída AUDITORIA CPMM`    | "assignment_return" | `#FAB932` | `FILL 0`, `wght 700`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/8620753d-5ecb-4536-88d4-9f15ff32bd66" /> |
|          `Restituída JSD`         | "assignment_return" | `#FAB932` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/8620753d-5ecb-4536-88d4-9f15ff32bd66" />      |
|       `IS Concluída s/ voto`       |    "how_to_vote"    | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/2b34e0bd-7511-4bae-9da2-fcf0c4fe082b"/>  |
|      `IS Votada s/ assinatura`    |      "signature"      | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/0e7b01b2-2d82-43be-9622-c5fac7ecba2e"/> |
|           `MSG PENDENTE`           |    "unsubscribe"    | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img src="https://github.com/user-attachments/assets/fb72cab9-688e-4b19-85ed-57e96e916c53" alt="unsubscribe" width="36" height="36"> |
|           `MSG ATRASADA`           |         "bomb"        | `#B71C1C` | `FILL 1`, `wght 700`, `GRAD 400`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/80c5972e-0493-4959-860f-9cd848bbe50e" />      |
|            `MSG ENVIADA`           |  "mark_email_read"  | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img src="https://github.com/user-attachments/assets/81e473d7-f8c5-42ac-8ad4-7db764e5bc33" alt="mark_email_read" width="36" height="36"> |  
  

   ***


### REGRAS GERAIS DOS ÍCONES NA PÁGINA `INSPEÇÕES`

1. A coluna da tabela `FINALIDADE` deverá ter o texto correspondente à coluna na planiha alinhado à esquerda e um ou mais ícones de ação alinhados à direita. `Na ordem da direita para esquerda (NÃO OBRIGATORIAMENTE SIMULTÂNEOS) os ícones devem ser`:
    1.1 `Icon Name = "visibility"` - Tooltip: `Abrir Detalhamento da IS` | Ação: Abrir o modal de Detalhamento da IS relacionada
        2.1.1 `RESTRIÇÕES:` Esse ícone só deverá ser exibido em 2 grupos de situações: Quando a `IS ainda não foi iniciada` (coluna `StatusIS` = `IS aberta`, `Inspecionado atrasado`, `IS Cancelada` OU `Faltou`) ou quando a `IS já foi encerrada` (coluna `StatusIS` = `Homologada  JSD`, `AUDITORIA CPMM`, `REVISÃO JSD`  ou coluna `MSG` = `ENVIADA`
    1.2. `Icon Name = "Edit"` - Tooltip: `Editar IS` | Ação: Abrir o modal de Edição da IS relacionada
         1.2.1 `RESTRIÇÕES:` esse ícone tem lógica de exibição oposta à lógica do ícone "visibility", ou seja ele só deverá ser exibido quando a IS já tiver sido iniciada mas ainda não encerrada. | `Condições:` quando a coluna da planilha `StatusIS` for igual a `Declínio de competência de MPI`, `Revisão Ex-officio de MPI`, `Revisão Ex-officio de MPI`,  `IS Agendada`, `IS Remarcada`, `Conclusão  Pendente`, `Aprovada AUDITORIA CPMM`, `Restituída AUDITORIA CPMM`, Restituída JSD`, `IS Concluída s/ voto`, `IS Votada s/ assinatura` ou coluna `MSG` = 'PENDENTE' OU `ATRASADA`
    1.3 `Icon name = "event_repeat"`- Tooltip: `Reagendar IS` | Ação: abrir o modal de reagendamento para inserir um valor de data na coluna da planilha `DataEntrevista`, desde que essa coluna já esteja previamente preenchida com outra data
         1.3.1 `RESTRIÇÕES:` Esse ícone só deverá ser exibido se a coluna da planilha `StatusIS` = `Agendada`, `Remarcada` ou `Faltou`, desde que a coluna `MSG` não seja igual a `ENVIADA`. // OU SEJA: SE `StatusIS` = `Faltou` + `MSG` = `ENVIADA`; <> Ícone `Reagendar IS`  
    1.4 `Icon name = "close"`- Tooltip = `Cancelar IS` | Ação: Altera o valor da coluna `StatusIs` na planilha para `Cancelada` e altera o valor da coluna `MSG` na planilha para `PENDENTE`, desde que `MSG` <> `ENVIADA` // VIDE ITEM 2 EXCEÇÃO 2  
        1.4.1 `RESTRIÇÕES:` esse ícone só deverá ser exibido ser a coluna `StatusIS` for igual a `Aberta`, `Agendada`, `Remarcada` ou `Conclusão Pendente`  
    1.5 `Icon name = "outgoing_mail"`- tooltip = `Registrar MSG enviada` | Ação: altera o valor da coluna `MSG` na planilha para `ENVIADA` desde que `MSG` = `PENDENTE` OU `ATRASADA`    
        1.5.1 `RESTRIÇÕES:` Esse ícone só deverá ser exibido ser se a coluna da planilha `MSG` `PENDENTE` OU `ATRASADA` OU se a coluna da planilha `StatusIS` = `TIS assinado` + coluna `TIS` <> VAZIO + coluna `DS-1A` <> VAZIO  
    1.6 `Icon name = "event_upcoming"`- Tooltip = `Agendar IS` | Ação: abrir o modal de reagendamento para inserir um valor de data na coluna da planilha `DataEntrevista`, desde que `DataEntrevista` = VAZIO + `Status IS` = `IS Aberta`, `Declínio de competência de MPI` OU `Revisão Ex-officio de MPI`  
    1.7 `Icon name = "reply"`- Tooltip = `Registrar IS restituida`| Ação: Altera a coluna da planilha `StatusIS` - se `StatusIS` = `AUDITORIA CPMM` é alterada para `Restituida AUDITORIA CPMM`, se `StatusIS` = `REVISÃO JSD` é alterada para `Restituida JSD` | Ou seja, `este ícone só deverá ser exibido se` `StatusIS` = `AUDITORIA CPMM` ou `REVISÃO JSD`  
2. A coluna da tabela `STATUS` deverá ter 01 ícone relativo às colunas da planilha `StatusIS` OU `MSG`, ⚠️ onde há prioridade de alocar o ícone referente à coluna `MSG` caso ela esteja preenchida.⚠️  
    - 🛑 Exceção 1: se `StatusIS = `Homologada JSD`, o ícone relativo a esse valor (""folder_check"") `tem proridade` sobre os ícones relativos à `MSG` e deverá ocupar a coluna sozinho  
    - 🛑 Exceção 2: se `StatusIS = `Cancelada` ou `Faltou`, os ícones referentes a esses valores deverão ocupar a coluna `STATUS` na tabela da página `Inspeções` simultaneamente ao ícone relativo à coluna `MSG`. Ou seja: `STATUS` - `Icon name = "person_cancel" OU "folder_delete" + "unsubscribe" OU "bomb" ou "mark_email_read"  
    2.1 O ícone referente à `MSG` = `PENDENTE` ("unsubscribe") e o ícone referente à `MSG` = `ATRASADA` ("bomb") só deverão surgir na coluna `STATUS` da tabela SE: `STATUS` -> Icon name =  "person_cancel" OU "folder_delete" OU colunas da planilha `StatusIS` = `TIS assinado` + 'TIS' <> VAZIO + `DS-1a` <> VAZIO| Já o ícone referente à `MSG` = `ENVIADA` ("mark_email_read") só surgirá através do botão de ação `Registrar MSG enviada` ("outgoing_mail")  
3. O ícone de `StatusIS` = `IS Aberta` ("folder_open") é o ícone de `STATUS` padrão para novas IS inseridas através do modal de Nova Inspeção, exceto se no momento da inserção da nova IS já seja inserida uma data na coluna da planilha `DataEntrevista` -> 'StatusIS' = `IS Agendada` ("calendar_check")  
4. O ícone de `MSG` = `ENVIADA` ("mark_email_read") é o ícone de `STATUS` final da IS. Uma vez com esse STATUS, nenhuma edição deverá ser permitida e deverá haver apenas o ícone de ação para abrir o modal de detalhamento (("visibility"))
