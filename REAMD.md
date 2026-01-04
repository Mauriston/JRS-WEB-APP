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

### _🚫 ERROS A SEREM AJUSTADOS NA PÁGINA INSPEÇÕES 🚫_
1. Altere as colunas da tabela de forma que tem a seguinte ordem:
    - `STATUS`: Deverá ter os ícones relativos às colunas `StatusIS` e `MSG`. Sempre apenas um dos ícones, nunca os dois ao mesmo (vide lógica no item 3)
    - `DATA` = coluna `DataEntrevista` da planilha
    - `INSPECIONADO`: Deverá ser a concatenação textual, separadas por um espaço em branco, das colunas da planilha `P/G/Q` `Inspecionado`e `OM`. Porém `OM` deverá estar em um fonte de menor destaque (menor tamanho e cor mais clara) e entre parenteses. Exs: "1T (MD) NELIA NOGUEIRA VIEIRA (HNRe)", "SO JOSÉ ELIAS BASTOS NETO (CPAL)" e "1T (RM2-CD) ANA BEATRIZ FERNANDES AZEVEDO (EAMPE)"
    - `FINALIDADE`: deverá ter:
        - os dados da coluna da planilha `Finalidade`, alinhado à esquerda na coluna
        - o ícone de ação "more_vert" alinhado à direita na coluna que abrirá o modal de detalhamento da IS
        - à esquerda desse primeiro ícone de ação deverão estar os ícones de `Editar`, `Reagendar`, 'Cancelar' e`Registrar MSG ENVIADA`, respeitando as respectivas lógicas que determinam a exibição deles ou não.  
2. Lógica para exibição dos ícones de ação e abertura de modais, quando aplicável:
    - Icone editar ("Edit"): Só deverá surgir se a coluna da planilha 'StatusIs' **NÃO** FOR IGUAL A `Faltou`, `Cancelada`, `Auditoria`, `JSD ` ou `TIS assinado`. Deverá abrir o modal de edição.
    -  Icone Reagendar ("event_repeat"): Só deverá surgir se a coluna da planilha 'StatusIs' **FOR IGUAL A** `Agendada`, `Remarcada` ou `Faltou`
    - Icone de ação Cancelar ("cancel"): Só deverá surgir se a coluna da planilha 'StatusIs' **FOR IGUAL A** `Agendada`, `Remarcada`ou `Conclusão Pendente`
        - Uma vez clicado nesse ícone o `StatusIS` deverá ser atualizado para `Cancelada` e o ícone da primeira coluna da tabela deverá ser (("person_cancel"  - <style> 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48))
    - Icone Registrar MSG ENVIADA ("outgoing_mail"): Só deverá surgir se a coluna da planilha 'StatusIs' **FOR IGUAL A** 'TIS assinado' e as colunas `TIS` e `DS-1a` estiverem preenchidas na planilha.  
3. Lógicas para exibiçãos dos ícones da coluna 'STATUS' da tabela de acordo com as colunas da planilha 'StatusIS' e `MSG`:
- O ícone de `MSG PENDENTE`("unsubscribe") só deverá surgir se a coluna `StatusIS`= `TIS assinado` e as colunas `TIS` e `DS-1a` estiverem preenchidas na planilha.
    - Esse ícone deverá substituir o ícone de `StatusIS`= `TIS assinado`, caso esteja eventualmente presente previamente, na primeira coluna da tabela.
- O ícone de `Agendada` ("calendar_check"): esse é o ícone de `STATUS` padrão para novas IS inseridas através do modal de Nova Inspeção, **a não ser que no momento da inserção de nova IS:**
    - A coluna `Laudo` da planilha esteja preenchida - o `STATUS` deverá ser `Concluída` ("check")
    - As colunas `Laudo` e `TIS` da planilha estejam preenchidas - o `STATUS` deverá ser `Votada JRS` ("how_to_vote")
    - As colunas `Laudo`, `TIS` e `DS-1a` da planilha estejam preenchidas -  ⚠️ **nesse cenário  `STATUS` deverá ser `MSG PENDENTE` ("unsubscribe")** - não deverá ser `TIS assinado`
- ⚠️  **ATENÇÃO** - **Ou seja, sempre que forem editadas informação (nas colunas da planilha 🔎 `Laudo`, 🔎 `TIS` ou 🔎 `DS-1a`) através do modal ou até mesmo diretamente na própria planilha, as colunas da planilha `StatusIS` e `MSG` deverão ser 🔁 alteradas automaticamente de acordo com a lógica explicada acima**
- Se no modal de edição for inserida informações no `Laudo` mas não forem inseridos `TIS` e/ou `DS-1a`, ao tentar fechar o modal deverá surgir um dialog alert com a pergunta: "Qual o Status da IS no momento?" e com 3 text buttom para ser escolhido obrigatoriamente 1: `Concluída`, `AUDITORIA CPMM` e `REVISÃO EX-OFFICIO JSD` - e a coluna `StatusIS` deverá ser alterada de acordo com a opção escolhida.
    - ⚠️  **ATENÇÃO** - Se esse padrão de edição for feito diretamente na planilha do google sheets, deverá surgir um modal com a mesma pergunta e os mesmos text buttons (e a mesma estilização do app web) e com a mesma lógica de alteração da coluna `StatusIS`
- Se o `StatusIS` for igual a `AUDITORIA` ou 'JSD' deverá surgir o ícone de ação Restituída (("reply")). O mesmo ícone para os dois `StatusIS`, no entanto serão diferentes o tooltip e a ação sobre a coluna da planilha `StatusIS`:
    - Se o `StatusIS` for igual a `AUDITORIA`: tooltip "Restituída pela Auditoria CPMM" | Ação: altera a coluna `StatusIS` para `Restituída Auditoria`
    - Se o `StatusIS` for igual a `JSD`: tooltip "Restituída pela JSD" | Ação: altera a coluna `StatusIS` para `Restituída JSD`
    - Nessas duas situações, o ícone a ser colocado na primeira coluna da tabela da página Inspeções deverá ser o mesmo (("reply"))
- ⚠️ Diariamente as 6h da manhã deverá ser acionada um função em segundo plano na planilha do google sheets que vai **checar em todas as IS com `StatusIS` = `Agendada` ou `Remarcada` se `DataEntrevista` > a DATA ATUAL**, pois se for a coluna **`StatusIS` deverá ser ajustada automaticamente para ⌛️ `Faltou`**
- `STATUS` `MSG ENVIADA` com ícone (("mark_email_read" - <style> 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48)) originário de dados da coluna `MSG` da planilha, é o **STATUS final da IS**. Uma vez com esse STATUS, nenhuma edição deverá ser permitida e deverá haver apenas o ícone de ação para abrir o modal de detalhamento (("visibility"))  
4. Todos os ícones da tabela deverão ter os respectivos tooltips  
5. Deverão estar na cor vermelha os ícones: "unsubscribe" "cancel" "person_cancel"  
6. Deverão estar na cor verde os ícones: "calendar_check" "outgoing_mail"  
7. Deverão estar na cor cinza os ícones: "visibility" "how_to_vote" "Edit" "check"  
8. Deverão estar na cor amarelo escuro os ícones: "event_repeat" "reply"  

#### Também diminua o padding inferior da logo da Marinha do rodapé e aumento o tamanho da logo em cerca de 30% na página Inspeções.

---

### _🔗 LISTA DE ÍCONES_  



| Icon | `StatusIS` | Action |
| :---------- | :--------- | :---------- |
| <img src="https://github.com/user-attachments/assets/62657bf1-d09e-47b1-90af-91528b737648" alt="cencel" width="36" height="36">   | -    | `Cancelar`   |
| <img src="https://github.com/user-attachments/assets/0e2f75ad-c85f-4395-b960-9adc34d5201c" alt="cencel" width="36" height="36">   | `Cancelada`   | -   |
| <img src="https://github.com/user-attachments/assets/78f6a8fd-fdcc-4612-9296-31de5599afa2" alt="cencel" width="36" height="36">   | `Restituída AUDITORIA  
/ JSD`   | `Restituir`  | 
| <img src="https://github.com/user-attachments/assets/59d4addd-210c-463f-a70d-ad4cad198825" alt="cencel" width="36" height="36">   | `Votada JRS`   | -   | 
| <img src="https://github.com/user-attachments/assets/735f053e-bb8b-44f4-bbb0-d65bd266bd80" alt="cencel" width="36" height="36">   | `Concluída`   | -   | 
| <img src="https://github.com/user-attachments/assets/4280fda5-e7d6-4e58-a282-f4aec1c91d48" alt="cencel" width="36" height="36">   | -   | `Editar`   | 
| <img src="https://github.com/user-attachments/assets/fb72cab9-688e-4b19-85ed-57e96e916c53" alt="cencel" width="36" height="36">   | `MSG PENDENTE`   | -   |
| <img src="https://github.com/user-attachments/assets/423f7dc1-a9a0-4719-b3b5-9f0ea8975551" alt="cencel" width="36" height="36">   | `Agendada`   | -   | 
| <img src="https://github.com/user-attachments/assets/254dc1a3-cea2-44de-9691-c2c2735f14d9" alt="cencel" width="36" height="36">   | -   | `Reagendar`   | 


<img width="384" height="384" alt="image" src="https://github.com/user-attachments/assets/4280fda5-e7d6-4e58-a282-f4aec1c91d48" />


---


![MB](https://i.imgur.com/qt97XzO.png)  









