# RACIOCÍNIO - Organização de Atendimentos

## Parte 1 — Modelagem do problema

### 1. Como classifiquei esse problema?

Eu classifiquei esse problema como um problema de **escalonamento de tarefas com restrição de tempo**, com uma ideia parecida com **empacotamento**.

No começo, eu pensei nele como uma agenda: existem vários atendimentos, cada um com uma duração, e eu preciso colocá-los em horários válidos. Porém, diferente de uma agenda comum, os horários dos atendimentos não vêm prontos no arquivo. O próprio programa precisa decidir onde cada atendimento começa.

Também existe uma parte parecida com empacotamento, porque cada consultório funciona como um espaço limitado de tempo. Um consultório tem uma sessão de manhã, das 08:00 até 11:30, e uma sessão de tarde, a partir das 13:30. Então eu preciso encaixar os atendimentos nesses blocos, sem ultrapassar os limites.

Por isso, eu não tratei o problema como apenas "ordenar horários". O programa precisa montar uma agenda do zero, respeitando a capacidade de cada sessão.

---

### 2. Semelhança com problemas clássicos da computação

Esse problema lembra o **Bin Packing Problem**.

No Bin Packing, temos itens de tamanhos diferentes e tentamos colocá-los em caixas com capacidade limitada. A ideia é usar o menor número possível de caixas.

Neste desafio:

- cada atendimento é como um item;
- a duração do atendimento é o tamanho do item;
- cada consultório é como uma caixa;
- a manhã e a tarde são os espaços disponíveis dentro dessa caixa.

Por exemplo, um atendimento de 120 minutos ocupa muito mais espaço na agenda do que um atendimento expresso de 10 minutos. Se eu colocar muitos atendimentos grandes primeiro, pode sobrar pouco espaço para outros. Então existe uma preocupação em distribuir bem as durações.

Também existe semelhança com **scheduling**, ou escalonamento, porque além de escolher o consultório, o programa também define a ordem e o horário de início de cada atendimento.

---

### 3. Estruturas de dados escolhidas

Para representar um atendimento, usei um objeto com `nome`, `duracao` e `tipo`.

Exemplo:

```js
{
    nome: "Castração de gato adulto",
    duracao: 90,
    tipo: "NORMAL"
}

Escolhi objeto porque fica fácil entender o que cada valor significa. Em vez de usar um array como ["Castração", 90, "NORMAL"], eu consigo acessar diretamente atendimento.nome e atendimento.duracao, deixando o código mais legível.

Para representar um consultório, usei um objeto com duas listas principais:

{
    manha: [],
    tarde: [],
    proximoHorarioManha: 480,
    proximoHorarioTarde: 810,
    higienizacao: 690,
    reuniao: 1021
}

A lista manha guarda os atendimentos encaixados na sessão da manhã.
A lista tarde guarda os atendimentos encaixados na sessão da tarde.

Também guardei proximoHorarioManha e proximoHorarioTarde, porque o programa precisa saber qual é o próximo horário livre naquela sessão.

Os horários foram salvos em minutos. Por exemplo:

08:00 vira 480;
11:30 vira 690;
13:30 vira 810;
17:01 vira 1021.

Eu escolhi trabalhar com minutos porque facilita muito os cálculos. Para saber o fim de um atendimento, basta fazer:

fim = inicio + atendimento.duracao

Se eu tivesse guardado os horários como texto, por exemplo "08:00", teria que converter toda vez antes de somar. Isso deixaria o código mais trabalhoso e mais sujeito a erro.

Parte 2 — Estratégia algorítmica
4. Descrição do algoritmo em linguagem natural

O programa funciona em etapas.

Primeiro, ele lê o arquivo atendimentos.txt.

Depois, cada linha do arquivo passa pelo parser. O parser identifica se o atendimento é normal ou expresso.

Se a linha termina com expresso, o programa entende que a duração é de 10 minutos.
Por exemplo:

Aplicação de vacina antirrábica expresso

vira um objeto com duração 10.

Se a linha termina com algo como 90min, o programa extrai o número e usa como duração.

Depois disso, o organizador recebe a lista de atendimentos. Antes de distribuir, ele ordena os atendimentos do maior para o menor tempo de duração. Eu fiz isso porque atendimentos longos são mais difíceis de encaixar. Se eu deixar eles para o final, pode acontecer de sobrarem apenas buracos pequenos na agenda.

Em seguida, o programa percorre os atendimentos um por um.

Para cada atendimento, ele tenta encaixar primeiro em algum consultório já existente.

Dentro de um consultório, ele tenta primeiro a manhã. Se não couber na manhã, tenta a tarde. Se não couber nem na manhã nem na tarde daquele consultório, ele testa o próximo consultório.

Se o atendimento não couber em nenhum consultório existente, o programa abre um novo consultório e coloca o atendimento nele.

No final, o programa imprime a agenda de cada consultório, mostrando:

atendimentos da manhã;
higienização às 11:30;
atendimentos da tarde;
reunião de encerramento depois das 17:00 e antes das 18:00.
5. Minha solução é gulosa, exata ou heurística?

Minha solução é gulosa com heurística.

Ela é gulosa porque toma decisões locais. Quando o programa encontra o primeiro consultório onde o atendimento cabe, ele coloca o atendimento ali e não tenta reorganizar tudo depois.

Ela também usa uma heurística chamada First Fit Decreasing. Isso significa que eu ordeno os atendimentos do maior para o menor e depois tento encaixar cada um no primeiro espaço disponível.

Eu escolhi essa abordagem porque ela combina com o tamanho do desafio. Uma solução exata teria que testar várias combinações possíveis de atendimentos, o que deixaria o código bem mais complexo.

Como o objetivo era criar uma solução funcional, explicável e adequada para um desafio júnior, preferi uma estratégia que respeita as regras e mantém o código simples.

6. Existe alguma entrada em que o algoritmo não encontra a melhor solução possível?

Sim. Como minha solução é gulosa, ela não garante a menor quantidade possível de consultórios em todos os casos.

Um exemplo simples:

Atendimento A 110min
Atendimento B 100min
Atendimento C 100min
Atendimento D 60min
Atendimento E 50min
Atendimento F 50min

Como o algoritmo coloca primeiro os maiores atendimentos e aceita o primeiro encaixe possível, ele pode acabar ocupando os espaços de uma forma que parece boa no momento, mas que deixa sobras difíceis de aproveitar.

Uma solução mais completa poderia testar várias combinações, por exemplo tentando colocar um atendimento de 100 minutos junto com dois de 50 minutos, dependendo do espaço disponível.

Meu algoritmo não faz esse tipo de troca. Depois que um atendimento é colocado, ele não volta atrás. Isso torna a solução mais simples e rápida, mas pode impedir que ela encontre a distribuição perfeita em alguns casos.

7. Complexidade de tempo aproximada

A primeira etapa importante é a ordenação dos atendimentos por duração.

Ordenar uma lista com n atendimentos tem complexidade:

O(n log n)

Depois disso, o programa percorre todos os atendimentos. Para cada atendimento, ele pode precisar verificar vários consultórios até encontrar espaço.

No pior caso, pode acontecer de quase todo atendimento abrir um consultório novo. Assim, para cada atendimento, o programa pode verificar uma quantidade grande de consultórios.

Por isso, a parte de distribuição pode chegar a:

O(n²)

Somando as duas partes:

O(n log n + n²)

Como n² cresce mais rápido que n log n, a complexidade aproximada final fica:

O(n²)

Para esse desafio, considerei essa complexidade aceitável, porque o código fica simples e a lista de atendimentos não parece exigir uma solução extremamente otimizada.

Parte 3 — Decisões de implementação
8. Como o programa decide quantos consultórios abrir?

O programa não recebe um número fixo de consultórios.

Ele começa com uma lista vazia. Quando chega o primeiro atendimento, como ainda não existe consultório, ele cria o Consultório 1.

Depois, para cada novo atendimento, ele tenta usar os consultórios que já existem.

O critério é:

tentar encaixar o atendimento em um consultório existente;
verificar se cabe na manhã;
se não couber, verificar se cabe na tarde;
se não couber em nenhum consultório, abrir um novo.

Então o número de consultórios surge naturalmente durante a execução. O programa só abre outro consultório quando não existe espaço suficiente nos consultórios atuais.

9. Como tratei os atendimentos expressos?

Eu tratei os atendimentos expressos como atendimentos de 10 minutos.

Essa decisão veio diretamente do enunciado, que diz que os atendimentos expressos são procedimentos rápidos de 10 minutos, como aplicação de vacina.

No parser.js, quando uma linha termina com a palavra expresso, eu removo essa palavra do nome e crio o objeto assim:

{
    nome: "Aplicação de vacina antirrábica",
    duracao: 10,
    tipo: "EXPRESSO"
}

Eu mantive o campo tipo: "EXPRESSO" mesmo já tendo a duração, porque isso deixa a informação mais clara. No futuro, se a clínica quiser imprimir os expressos de forma diferente ou dar prioridade para eles, o tipo já estará salvo.

10. Parte mais inteligente da solução

A parte mais importante da solução é a lógica de encaixe nas sessões.

No meu código, isso aparece nas funções que tentam colocar um atendimento na manhã ou na tarde.

A ideia principal é calcular:

inicio = proximoHorarioDaSessao
fim = inicio + atendimento.duracao

Depois o programa verifica se esse fim ultrapassa o limite da sessão.

Na manhã, o atendimento não pode passar de 11:30.

Na tarde, o atendimento não pode impedir que a reunião aconteça antes das 18:00.

Essa parte é a mais inteligente porque transforma as regras do texto em contas simples com minutos. Em vez de trabalhar com várias comparações de texto ou horários formatados, o programa usa números.

Isso deixou a regra mais fácil de implementar e de testar.

11. Parte que poderia ser melhorada

A parte que eu mais melhoraria é a estratégia de distribuição.

Hoje, o programa usa uma estratégia gulosa: coloca o atendimento no primeiro consultório onde ele couber. Isso é simples e funciona, mas não testa se existe uma combinação melhor.

Por exemplo, às vezes colocar um atendimento grande em outro consultório poderia liberar espaço para dois atendimentos menores. O programa atual não percebe isso, porque ele não reorganiza os atendimentos depois de encaixar.

Uma melhoria possível seria usar backtracking, testando várias distribuições diferentes. Outra possibilidade seria usar uma fila de prioridade ou calcular melhor o consultório com menor sobra de tempo.

Mesmo assim, para este desafio, eu preferi manter a solução gulosa porque ela é mais fácil de entender, explicar e manter.

12. Conclusão

A solução foi construída pensando nas regras reais da clínica.

O programa não depende de horários já prontos na entrada. Ele recebe apenas o nome e a duração dos atendimentos, monta os horários automaticamente, separa manhã e tarde, adiciona higienização e calcula a reunião de encerramento.

As principais escolhas foram:

usar minutos para facilitar os cálculos;
representar atendimentos e consultórios com objetos;
usar arrays para guardar os atendimentos de cada sessão;
tratar expressos como 10 minutos;
ordenar os atendimentos do maior para o menor;
abrir novos consultórios apenas quando necessário.

A solução não é matematicamente perfeita, mas é prática, legível e adequada para um desafio júnior, porque respeita as regras principais do problema sem deixar o código desnecessariamente complexo.