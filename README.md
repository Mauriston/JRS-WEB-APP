![JRS HNRe](https://i.imgur.com/QJOmuG0.png)  



# ‼️ LÓGICAS IMPORTANTES DO SCRIPT ‼️

---  


## 📎 LÓGICAS DOS ÍCONES E EDIÇÕES DE STATUS DA TABELA DE [`Inspecoes.html`](https://github.com/Mauriston/JRS-WEB-APP/tree/main/Code.gs)  


### 🚫 _ERROS A SEREM AJUSTADOS NA PÁGINA DASHBOARD_ 🚫
1. Retire os filtros `OM Solicitante`e `Especialidade`    
2. Ajuste o botão `FILTRAR` para que se os dados estejam sendo filtrados pelas datas, o botão seja alterado para `LIMPAR FILTROS` - Altere o texto do botão, a cor e o seu ícone.    
3. Altere os KPI cards para os seguintes:
    - 1º KPI card: `Total Inspeções` (Mantido): Porém a referência dele não deve ser os últimos 30 dias como consta na legenda abaixo do numeral e sim o total de Inspeções registradas, desde que os filtros de data não estejam sendo usados. 
    - 2º KPI card: ~~`Concluídas`~~ ˜MSG Pendentes`: Deverá mostrar o número de inspeções cuja coluna `MSG` da planilha = `PENDENTE`  
        - A cor da fonte do numeral e do ícone do card deverão ser alterados para vermelho. O ícone do card também deverá ser alterado para um mais apropriado.
        - O valor de comparação embaixo do numeral, ex: "68% do total" deverá ser mantido, porém deverá ser alterado dinamicamente de acordo com a seleção de filtros.
    - 3º KPI card: `Pendentes`: Mantido  
    - 4º KPI card: ~~`Tempo Médio`~~ `REVISÃO JSD`: Deverá mostrar o número de IS cujo `StatusIS` = `REVISÃO JSD`
         - Na linha abaixo do numeral, onde nos outros cards há a referência de comparação, nesse card deverá haver o número de IS cujo `StatusIS` = `Restituída JSD`da seguinte forma - Ex: "Restituídas = 3"  \
    - 5º KPI card: `AUDITORIA CPMM`: Deverá mostrar o número de IS cujo `StatusIS` = `AUDITORIA CPMM`
        - Na linha abaixo do numeral, onde nos outros cards há a referência de comparação, nesse card deverá haver o número de IS cujo `StatusIS` = `Restituída Auditoria`da seguinte forma - Ex: "Restituídas = 2"  \
    - 6º KPI card: `CANCELADAS`: Deverá mostrar o número de IS cujo `StatusIS` = `CANCELADA`  
    - 7º KPI card: `FALTAS`: Deverá mostrar o número de IS cujo `StatusIS` = `FALTOU`  
    - 8º KPI card: `CONCURSOS`: Deverá mostrar o número de IS cuja `Finalidade` se inicie pela palavra "Ingresso" - **Exs: "INGRESSO NA EFOMM" e "INGRESSO CFSD-FN"**
        - ⚠️  **ESSE CARD SÓ DEVERÁ SER EXIBIDO SE OS FILTROS DE DATAS ESTIVEREM SELECIONADOS E SE O NÚMERO DE IS de `Concursos` para o período selecionado seja diferente de zero.**  
4. Altere os gráficos presentes após os KPI cards:  
- Gráfico `Evolução de Atendimentos` deverá ser um gráfico de barras verticais empilhadas cujos marcados do eixo horizontal deverão ser o mês desde o início dos registros das IS na planilha. Ex: "SET25", "OUT25", "JAN26".
    - Os valores do eixo vertical deverão ser os totais de IS de 'CONCURSOS' e de IS de 'ROTINA' (todas as outras que não são de CONCURSOS)
    - A porção da barra referente as IS de 'CONCURSOS' deverão estar posicionadas acima de IS de 'ROTINA' e deverão ter uma cor vermelha, enquanto as IS de 'ROTINA' na cor azul.
    - As subpartes das barras verticais deverão ter o marcado númerico nos seus interiores com alinhamento vertical ao meio da subbarra e de cor de fundo branca.
    - ⚠️ **ESSE GRÁFICO NÃO DEVERÁ SOFRER ALTERAÇÕES DE ACORDO COM OS FILTROS DE DATA**
    - ⚠️ **RETIRE O GRÁFICO `Por Especialidade`**, em seu lugar insira um gráfico do tipo donut com a distrubuição das IS de acordo com a `OM`
    - ⚠️ **CRIE UM TERCEIRO GRÁFICO: `IS de ROTINA`**: Ele deverá mostrar apenas as IS que não tem `Finalidade` = `CONCURSO` e a sua distribuição em um gráfico de barras horizontais de acordo com a `Finalidade` da IS na planilha. Esse gráfico deverá ter no máximo 6 barras horizontais, onde as 5 primeiras serão as `Finalidades` com maior número de IS e a 6ª barra será referente a `Outras`. Cada barra horizontal deverá ter uma cor diferente, porém obedecendo a paleta de cores do app web. ⚠️ **Esse gráfico deverá ser alterado dinamicamente de acordo com os filtros de data.**  
5. Diminua o padding inferior da logo da Marinha do rodapé e aumento o tamanho da logo em cerca de 30%


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
         1.3.1 `RESTRIÇÕES:` Esse ícone só deverá ser exibido se a coluna da planilha `StatusIS` = `Agendada`, `Remarcada` ou `Faltou`, desde que a coluna `MSG` não seja igual a `ENVIADA`. // OU SEJA: SE `StatusIS` = `Faltou` + `MSG` = `ENVIADA`; <> `Ícone Reagendar IS`  
    1.4 `Icon name = "close"`- Tooltip = `Cancelar IS` | Ação: Altera o valor da coluna `StatusIs` na planilha para `Cancelada` e altera o valor da coluna `MSG` na planilha para `PENDENTE`, desde que `MSG` <> `ENVIADA` // VIDE ITEM 2 EXCEÇÃO 2  
        1.4.1 `RESTRIÇÕES:` esse ícone só deverá ser exibido ser a coluna `StatusIS` for igual a `Aberta`, `Agendada`, `Remarcada` ou `Conclusão Pendente`  
    1.5 `Icon name = "outgoing_mail"`- tooltip = `Registrar MSG enviada` | Ação: altera o valor da coluna `MSG` na planilha para `ENVIADA` desde que `MSG` = `PENDENTE` OU `ATRASADA`   
        1.5.1 `RESTRIÇÕES:` Esse ícone só deverá ser exibido ser se a coluna da planilha `MSG` `PENDENTE` OU `ATRASADA` OU se a coluna da planilha `StatusIS` = `TIS assinado` + coluna `TIS` <> "" + coluna `DS-1A` <> ""  
    1.6 `Icon name = "event_upcoming"`- Tooltip = `Agendar IS` | Ação: abrir o modal de reagendamento para inserir um valor de data na coluna da planilha `DataEntrevista`, desde que `DataEntrevista` = "" + `Status IS` = `IS Aberta`, `Declínio de competência de MPI` OU `Revisão Ex-officio de MPI`  
    1.7 `Icon name = "reply"`- Tooltip = `Registrar IS restituida`| Ação: Altera a coluna da planilha `StatusIS` - se `StatusIS` = `AUDITORIA CPMM` é alterada para `Restituida AUDITORIA CPMM`, se `StatusIS` = `REVISÃO JSD` é alterada para `Restituida JSD` | Ou seja, `este ícone só deverá ser exibido se` `StatusIS` = `AUDITORIA CPMM` ou `REVISÃO JSD`  
2. A coluna da tabela `STATUS` deverá ter 01 ícone relativo às colunas da planilha `StatusIS` OU `MSG, ⚠️ onde há prioridade de alocar o ícone referente à coluna `MSG` caso ela esteja preenchida.⚠️  
    - 🛑 Exceção 1: se `StatusIS = `Homologada JSD`, o ícone relativo a esse valor (""folder_check"") `tem proridade` sobre os ícones relativos à `MSG` e deverá ocupar a coluna sozinho  
    - 🛑 Exceção 2: se `StatusIS = `Cancelada` ou `Faltou`, os ícones referentes a esses valores deverão ocupar a coluna `STATUS` na tabela da página `Inspeções` simultaneamente ao ícone relativo à coluna `MSG`. Ou seja: `STATUS` - `Icon name = "person_cancel" OU "folder_delete" + "unsubscribe" OU "bomb" ou "mark_email_read"  
    2.1 O ícone referente à `MSG` = `PENDENTE` ("unsubscribe") e o ícone referente à `MSG` = `ATRASADA` ("bomb") só deverão surgir na coluna `STATUS` da tabela SE: `STATUS` -> Icon name =  "person_cancel" OU "folder_delete" OU colunas da planilha `StatusIS` = `TIS assinado` + 'TIS' <> "" + `DS-1a` <> ""| Já o ícone referente à `MSG` = `ENVIADA` ("mark_email_read") só surgirá através do botão de ação `Registrar MSG enviada` ("outgoing_mail")  
3. O ícone de `StatusIS` = `IS Aberta` ("folder_open") é o ícone de `STATUS` padrão para novas IS inseridas através do modal de Nova Inspeção, exceto se no momento da inserção da nova IS já seja inserida uma data na coluna da planilha `DataEntrevista` -> 'StatusIS' = `IS Agendada` ("calendar_check")  
4. O ícone de `MSG` = `ENVIADA` ("mark_email_read") é o ícone de `STATUS` final da IS. Uma vez com esse STATUS, nenhuma edição deverá ser permitida e deverá haver apenas o ícone de ação para abrir o modal de detalhamento (("visibility"))   

```  

---

![MB](https://i.imgur.com/lYp37Ar.png)  
