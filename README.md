![JRS HNRe](https://i.imgur.com/QJOmuG0.png)  



# ‼️ LÓGICAS IMPORTANTES DO SCRIPT ‼️

##  ACESSE:    [DASHBOARD](https://script.google.com/macros/s/AKfycbwQrRBreeORWB4CwwB1r9gK03GcLDEH_WQohCIbhRO5NDAY5otXhQFT6lw1tUJVMBIOQA/exec)     |    [PLANILHA](https://docs.google.com/spreadsheets/d/12_X8hKR4T_ok33Tv-M8rwpKSUeJNwIAjo9rWzfoA2Nw/edit?usp=sharing)   


   
---  


## 📎 LÓGICAS DOS ÍCONES E EDIÇÕES DE STATUS DA TABELA DE [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs)  


---  

```md

# ⚓️ REGRAS DE CORRELAÇÕES E EXIBIÇÃO DOS ÍCONES DA TABELA DA PÁGINA [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs) ⚓️

## 📝 LISTAS DE ÍCONES  📝    

### ÍCONES DE ⏩ AÇÃO DA COLUNA `FINALIDADE` DA TABELA DA PÁGINA [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs)  

|         `Action`        |    `Icon Name`   |  `Color`  |                   `Style`                   | `Icon` |
|:-----------------------:|:----------------:|:---------:|:-------------------------------------------:|:------:|
|       `Agendar IS`      | "event_upcoming" | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/15bb0b0e-bf5b-4a9d-9b6d-facc6359bd71" /> |   |
|       `Reagendar IS`       |  "event_repeat"  | `#FAB932` |  `FILL 0`, `wght 700`, `GRAD 0`, `opsz 40`  | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/faa744e4-95e5-4442-8608-9e3dad1c62a2" /> |   |
|         `Editar IS`        |      "Edit"      | `#050F41` |  `FILL 0`, `wght 400`, `GRAD 0`, `opsz 48`  | <img src="https://github.com/user-attachments/assets/4280fda5-e7d6-4e58-a282-f4aec1c91d48" alt="Edit" width="36" height="36">     |   |
|        `Cancelar IS`       |      "close"     | `#B71C1C` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 24` | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/18afcb36-eb57-4394-bc10-f476b7b0fa70" /> |   |
|       `Registrar IS restituida` |      "reply"     | `#FAB932` |  `FILL 0`, `wght 700`, `GRAD 0`, `opsz 24`  | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/cccd802a-7f00-430f-af9c-326a9b5650fc" /> |   |
| `Registrar MSG enviada` |  "outgoing_mail" | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` | <img src="https://github.com/user-attachments/assets/cd2b2f36-5869-4ccb-80a3-300ae72520ad" alt="outgoing_mail" width="36" height="36"> |   |
| `Abrir Detalhamento IS` |   "visibility"   | `#050F41` |  `FILL 0`, `wght 400`, `GRAD 0`, `opsz 48`  | <img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/b78ed295-1c66-4985-ac96-fe0cf75a1113" /> |   |


### 🛑 ÍCONES DA COLUNA `STATUS` DA TABELA DA PÁGINA [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs) 🛑 


|            `StatusIS`            |     `Icon Name`     |  `Color`  |                   `Style`                   |                   `Icon`                   |
|:--------------------------------:|:-------------------:|:---------:|:-------------------------------------------:|:-------------------------------------------:|
|            `IS aberta`           |    "folder_open"    | `#050F41` | `FILL 1`, `wght 400`, `GRAD -25`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/77487421-ff09-4915-af18-2e3a00887fac" /> |
| `Declínio de competência de MPI` |       "input"       | `#050F41` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/7f4c5585-a045-41c2-945e-480c0b24c4d9" /> |
|    `Revisão Ex-officio de MPI`   |  "document_search"  | `#050F41` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/bad966bc-efe6-44b1-9a46-6fb1e64a6b39" /> |
|  `Homologada Ex-officio de MPI`  |       "gavel"       | `#050F41` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/a3365faf-0da0-496e-bacb-944860c85711" />     |
|      `Inspecionado atrasado`     |       "acute"       | `#B71C1C` | `FILL 0`, `wght 600`, `GRAD -25`, `opsz 24` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/6348cf28-1695-48bb-a17b-bea87f8bd5c7" /> |
|          `IS Cancelada`          |   "folder_delete"   | `#B71C1C` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/88dc069a-375d-4ea8-a768-d690f917dc6c" />     |
|           `IS Agendada`          |   "calendar_check"  | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/15696efe-ebf2-4885-9814-5881ca6878bf" /> |
|             `Faltou`             |   "person_cancel"   | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img src="https://github.com/user-attachments/assets/0e2f75ad-c85f-4395-b960-9adc34d5201c" alt="event_busy" width="36" height="36"> |
|            `IS Remarcada`        |   "calendar_clock"  | `#FAB932` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/118d2032-81c4-461d-b52a-9df7d19c12cf"/>   |
|       `Conclusão Pendente`      |  "unknown_document" | `#B71C1C` |  `FILL 1`, `wght 500`, `GRAD 0`, `opsz 40`  |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/fb76cc51-47e1-4427-8965-692d00d512e7" />     |
|         `AUDITORIA CPMM`         |  "document_search"  | `#FAB932` | `FILL 1`, `wght 400`, `GRAD -25`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/75531def-443b-4bf7-a239-865676d888be" /> |
|     `Aprovada AUDITORIA CPMM`    |        "task"       | `#079551` |  `FILL 1`, `wght 400`, `GRAD 0`, `opsz 24`  |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/6d44708c-7ee5-49b9-83d0-78e1cf41d7fd" /> |
|           `REVISÃO JSD`          |       "gavel"       | `#FAB932` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/11fb92ae-f16c-4014-a8aa-75c74f6e4e3b" />     |
|         `Homologada  JSD`        |    "folder_check"   | `#079551` | `FILL 1`, `wght 600`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/25c16a28-b0e4-4a94-8c6d-4e1df91e41d7" />     |
|      `Restituída AUDITORIA CPMM`   | "assignment_return" | `#FAB932` | `FILL 0`, `wght 700`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/8620753d-5ecb-4536-88d4-9f15ff32bd66" /> |
|         `Restituída JSD`        | "assignment_return" | `#FAB932` | `FILL 1`, `wght 700`, `GRAD 200`, `opsz 40` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/8620753d-5ecb-4536-88d4-9f15ff32bd66" />     |
|      `IS Concluída s/ voto`      |    "how_to_vote"    | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/2b34e0bd-7511-4bae-9da2-fcf0c4fe082b"/>  |
|     `IS Votada s/ assinatura`    |     "signature"     | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/0e7b01b2-2d82-43be-9622-c5fac7ecba2e"/> |
|          `MSG PENDENTE`          |    "unsubscribe"    | `#B71C1C` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img src="https://github.com/user-attachments/assets/fb72cab9-688e-4b19-85ed-57e96e916c53" alt="unsubscribe" width="36" height="36"> |
|          `MSG ATRASADA`          |        "bomb"       | `#B71C1C` | `FILL 1`, `wght 700`, `GRAD 400`, `opsz 48` |<img width="36" height="36" alt="image" src="https://github.com/user-attachments/assets/80c5972e-0493-4959-860f-9cd848bbe50e" />     |
|           `MSG ENVIADA`          |  "mark_email_read"  | `#079551` | `FILL 1`, `wght 500`, `GRAD 200`, `opsz 48` |<img src="https://github.com/user-attachments/assets/81e473d7-f8c5-42ac-8ad4-7db764e5bc33" alt="mark_email_read" width="36" height="36"> |  
  

  ***


### REGRAS GERAIS DOS ÍCONES NA PÁGINA `INSPEÇÕES`

1. A coluna da tabela `FINALIDADE`deverá ter o texto correspondente à coluna na planiha alinhado à esquerda e um ou mais ícones de ação alinhados à direita. `Na ordem da direita para esquerda (NÃO OBRIGATORIAMENTE SIMULTÂNEOS) os ícones devem ser`:
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

```  
---  

## LÓGICAS EM RASCUNHO

  ### Após a seção de KPIs e gráficos, deverá haver uma tabela com a função CRUD
* Colunas da tabela: 'Status', 'MSG', 'Data (entrevista)', 'Inspecionado', 'Finalidade'
* Nessa tabela deverá haver artíficios para editar/inserir dos na planilha de dados, de acordo com as seguintes funções:
    * 'Remarcação de IS': Apenas para as IS com 'Status'  igual a 'AGENDADA', onde será possível editar a 'Data da Entrevista'. Essa edição ao ser executada, deverá alterar o 'Status' automaticamente para 'Remarcada'
    * 'Inserir laudo': Apenas para as IS com 'Status'  igual a 'AGENDADA' ou 'REMARCADA' e que estejam com a coluna 'Laudo' em branco. Deverá inserir dados na coluna 'Laudo'. Ao ser inserido um 'LAUDO', o 'Status' deverá ser automaticamente alterado para 'Concluída'
    * 'Auditoria': Função para alterar o 'Status' da IS para 'Auditoria' apenas para as IS que estejam com 'Status' igual a 'Concluída'
    * 'Restituída Auditoria': Função para alterar o 'Status' da IS para 'Restituída Auditoria' apenas para as IS que estejam com 'Status' igual a 'Auditoria' 
    * 'Revisão JSD': função para alterar o 'Status' da IS para 'JSD' apenas para as IS que estejam com 'Status' igual a 'Concluída'
    * 'Restituída JSD': função para alterar o 'Status' da IS para 'Restituída JSD' apenas para as IS que estejam com 'Status' igual a 'JSD'
    * 'Inserir Nº TIS': Apenas para as IS com 'Status'  igual a  'Concluída', 'Restituída Auditoria' ou 'Restituída JSD e que estejam com a coluna 'TIS' em branco. Deverá inserir dados na coluna 'TIS' com a máscara "000.000.00000". Ao ser inserido um ' Nº TIS', o 'Status' deverá ser automaticamente alterado para 'Votada JRS'.
    * 'Inserir Código DS-1A': Apenas para as IS com 'Status'  igual a  ''Votada JRS' e que estejam com a coluna 'DS-1a' em branco. Deverá inserir dados na coluna 'DS-1a' ". Ao ser inserido um 'Código DS-1A', deverá haver 2 ajustes automáticos:
        * A coluna 'StatusIS' deverá ser alterada para 'TIS Assinado'
        * A coluna 'MSG' deverá ser alterada para 'PENDENTE'
    * 'Registrar MSG': Apenas para as IS com 'Status'  igual a  'TIS Assinado' e deverá alterar a coluna 'MSG' para 'ENVIADA'
        * Uma vez que a IS esteja com a coluna 'MSG' igual a 'ENVIADA', toda e qualquer edição dessa IS deverá ser desabilitada.

#### Para as funções: 'Inserir laudo', 'Inserir Nº TIS' e 'Inserir Código DS-1A', eu sugiro que seja colocado um ícone "more_vert" alinhado à direita na coluna 'Finalidade', que ao ser clicado abrirá um modal com os respectivos campos para inserção/edição desses campos (ou qualquer outra forma que ache mais apropriada)  



    Prezado Presidente,

A tabela "ListaControle" é um registro abrangente das Inspeções de Saúde (IS) realizadas pela Junta Regular de Saúde (JRS). Ela contém informações detalhadas sobre cada inspeção, desde a sua identificação e data da entrevista até o laudo final, passando pelos dados do inspecionado, sua Organização Militar (OM), Posto/Graduação/Quadro (P/G/Q) e o status do processo.

**Possíveis Análises:**

Com base nos dados desta tabela, é possível realizar diversas análises para otimizar os processos e entender melhor o perfil das inspeções:

  * **Produtividade da JRS:**
      * Quantificar o número de IS realizadas em períodos específicos.
      * Calcular o tempo médio entre a "DataEntrevista" e a "DataLaudo" para avaliar a agilidade do processo.
      * Analisar a proporção de laudos que resultam em "LTS" (Licença para Tratamento de Saúde) ou "Restrições".
  * **Perfil dos Inspecionados:**
      * Identificar os "P/G/Q" (Posto/Graduação/Quadro) mais frequentemente inspecionados.
      * Determinar as "OM" (Organizações Militares) com maior demanda por Inspeções de Saúde.
      * Mapear as "Finalidade" mais comuns das inspeções (e.g., "CONTROLE TRIENAL", "TÉRMINO DE INCAPACIDADE", "BENEFÍCIO").
  * **Tendências de Saúde:**
      * Observar a prevalência de diferentes tipos de "Laudo" (e.g., "Apto para o SAM com restrições", "Incapaz temporariamente para o SAM").
      * Analisar a incidência e a duração das "LTS" e "Restrições" para identificar padrões de saúde na força.
  * **Eficiência do Processo:**
      * Verificar a completude dos registros, identificando colunas com valores ausentes (NaN).
      * Monitorar o "StatusIS" para garantir que todas as inspeções estejam sendo devidamente processadas e assinadas.

**Colunas e Possíveis Valores:**

A tabela possui as seguintes colunas, com seus respectivos tipos de dados e exemplos de valores:

  * **IS** (`float64`): Número de identificação da Inspeção de Saúde.
      * *Exemplos:* `1125268`, `1074354`, `1104806`.
  * **DataEntrevista** (`object`): Data em que a entrevista da Inspeção de Saúde foi realizada.
      * *Exemplos:* `25/08/2025`, `04/09/2025`, `09/09/2025`.
  * **Finalidade** (`object`): Propósito da Inspeção de Saúde.
      * *Exemplos:* `TÉRMINO DE INCAPACIDADE`, `CONTROLE TRIENAL`, `BENEFÍCIO`, `CONTROLE SEMESTRAL DE RAIO-X`.
  * **OM** (`object`): Organização Militar do inspecionado.
      * *Exemplos:* `HNRe`, `EAMPE`, `CPAL`, `CPPE`.
  * **P/G/Q** (`object`): Posto, Graduação ou Quadro do inspecionado.
      * *Exemplos:* `3SG-AD`, `1T (MD)`, `SO`, `CT (MD)`.
  * **NIP** (`object`): Número de Identificação Pessoal do inspecionado.
      * *Exemplos:* `13.1308.46`, `19.0294.11`, `85.7336.44`.
  * **Inspecionado** (`object`): Nome completo do militar inspecionado.
      * *Exemplos:* `HELOIZA GLÓRIA MOREIRA DE MATOS`, `JOSÉ ELIAS BASTOS NETO`, `MAURISTON RENAN MARTINS SILVA`.
  * **StatusIS** (`object`): Status atual da Inspeção de Saúde.
      * *Exemplos:* `TIS assinado`.
  * **DataLaudo** (`object`): Data de emissão do laudo da Inspeção de Saúde.
      * *Exemplos:* `28/08/2025`, `04/09/2025`, `08/11/2025`.
  * **Laudo** (`object`): Descrição do laudo médico pericial.
      * *Exemplos:* `"Incapaz temporariamente para o SAM, necessitando de LTS de 30 dias."`, `"Apto para o SAM com restrições"`, `"Apto para operar com RX e radioções ionizantes por 6 meses."`.
  * **Restrições** (`object`): Detalhes sobre quaisquer restrições impostas ao inspecionado.
      * *Exemplos:* `LTS`, `Marchas, TAF/TFM(Exceto Caminhadas e Natação), Formatura`, `Embarque, Manobras Operativas, Serviço Armado, Serviço Noturno`.
  * **TIS** (`object`): Provável número do Termo de Inspeção de Saúde.
      * *Exemplos:* `025.000.25645`, `025.000.55984`, `025.000.44435`.
  * **DS-1a** (`object`): Provável número do Documento de Saúde 1a.
      * *Exemplos:* `298749849`, `2025Z10B7D5`, `2025D75694`.
  * **MSG** (`object`): Status da mensagem ou comunicação relacionada à IS.
      * *Exemplos:* `ENVIADA`.
   








     https://gemini.google.com/gem/coding-partner/a0b241178a57c28b

Está perfeito!

## AJUSTES NA PRIMEIRA PARTE DO DASHBOARD (antes da tabela com as inspeções) :
1.  Na primeira parte do dashboard crie um filtro para o mês (Ex: SET/2025). Esse filtro servirá para todos os elementos do dahsboard (card, gráficos e tabela), exceto para o gráfico 'Entrevistas por Mês'
2. Ajuste o terceiro card KPI 'Pendentes/Outros' para 'MSG Pendentes' de acordo com os dados da coluna N da aba 'ListaControle' (soma de 'PENDENTE').  Deixe o numeral desse KPI na cor vermelha (#990000)
3. Crie novos card KPI: 
* Quarto card KPI: 'MSG Enviadas' de acordo com os dados da coluna N da aba 'ListaControle' (soma de 'ENVIADA'). Deixe o numeral desse KPI na cor verde um pouco mais escuro.
* Quinto card KPI: 'Conclusões Pendentes' que será a soma das inspeções com Status 'AGU exame' (coluna H da aba 'ListaControle')
* Sexto card KPI: 'Votações Pendentes' que será a soma das inspeções com Status 'Concluída' (coluna H da aba 'ListaControle')
* Sétimo card KPI: 'Assinaturas Pendentes' que será a soma das inspeções com Status 'Votada JRS' (coluna H da aba 'ListaControle')
* Oitavo card KPI: 'Auditoria CPMM' que será a soma das inspeções com Status 'Auditoria' (coluna H da aba 'ListaControle')
* Nono card KPI: 'Revisão Ex-Officio JSD' que será a soma das inspeções com Status 'JSD' (coluna H da aba 'ListaControle')
* Décimo card KPI: 'Canceladas' que será a soma das inspeções com Status 'Cancelada' (coluna H da aba 'ListaControle')
* Décimo primeiro card KPI: 'Faltas' que será a soma das inspeções com Status 'Faltou' (coluna H da aba 'ListaControle')
4. Insira ícones do google fonts adequados nos títulos dos cards KPI
5. Altere o gráfico de pizza de 'Inspeções por Finalidade' para um gráfico de barras horizontais.
6. Altere o gráfico de barras de 'Entrevistas por Mês' para um gráfico do mesmo tipo o exemplo que eu anexei (print de tela).

## AJUSTES NA SEGUNDA PARTE DO DASHBOARD (Tabela 'Detalhe das Inspeções') : 
1. Acrescente uma coluna após a coluna 'Laudo' chamada 'MSG' para colocar os dados da coluna 'MSG' da planilha (coluna N)
* Se a MSG for 'PENDENTE' deixe a fonte de toda a linha correspondente em negrito na cor vermelha (#990000)
* Se a MSG for 'ENVIADA': coloque apenas um ícone do goole fonts que signifique check na cor verde um pouco mais escuro.
2. Em relação à coluna 'Status' faça os seguintes ajustes:
* Quando o Status inspeção for 'AGU exames': 
    * Escreva 'Conclusão Pendente' em negrito e na cor vermelha (#990000)
    * Apenas nesse cenário, se houver a IS na planilha tiver algo escrito na coluna 'Laudo', coloque ao lado da palavra 'Conclusão Pendente' um ícone do google fonts que signifique um lupa, que ao ser clicado, abrirá um modal de título 'Observações' onde será mostrado o texto que há na coluna 'Laudo' da planilha.
        * Crie um tooltip ao passar o mouse em cima do ícone de lupa com o texto "Observações"
    * Deixe a coluna 'Laudo' em branco, mesmo que na planilha haja algo escrito (já que essa informação poderá ser mostrada no modal através do ícone de lupa)
* Quando o Status inspeção for 'Concluída': 
    * Escreva 'Votação Pendente' em negrito e na cor vermelha (#990000)
* Quando o Status inspeção for 'Votada JRS': 
    * Escreva 'Assinaturas Pendentes' em negrito e na cor vermelha (#990000)
3. Em relação à coluna 'Laudo': Se houver algo inserido, faça com o texto seja um link clicável (com um tooltip com o texto "Detalhes") para abrir um modal com as seguintes informações:
* Laudo (Escrever o texto do laudo completo conforme está na planilha)
* Data (Colocar a informação da coluna DataLaudo da planilha (coluna I))
* TIS (Colocar a informação da coluna TIS da planilha (coluna L))
* Código DS-1A (Colocar a informação da coluna DS-1a da planilha (coluna M))
4. Inverta a posição nas colunas 'IS' e 'Data Entrevista' nessa tabela
4. Em relação aos filtros dessa tabela:
* Coloque um filtro em destaque para filtrar as inspeções cuja coluna 'MSG' seja 'PENDENTE' utlizando um botão do tipo Switch (no estilo na segunda imagem anexada, porém, quando esse switch estiver selecionado, a sua cor deverá ser vermelha #990000)
* Para os filtros 'Finalidade' e 'Status' deixe-os em alert dialogs com checkboxes, de modo que se possa filtrar mais de uma condição. Depois de selecionado uma ou mais opções, mostre as opções escolhidas para filtro no formato de chips.
* Ajuste a lista do filtro 'Status' de acordo com as mesmas orientações do item 2.
* Ajuste o campos de busca pelo nome do inspecionado de acordo com a terceira imagem anexada
    * Mantenha a mesma curvatura dos ângulos dos demais campos do dashboard
    * Deixe-o sem borda e com a mesma cor da fundo da imagem anexada
    * Coloque um ícone de lupa semelhante ao exemplo da imagem (não coloque o ícone de microfone)
    * Ajuste a label do campos para "Nome do Inspecionado"


---

![MB](https://i.imgur.com/lYp37Ar.png)  
