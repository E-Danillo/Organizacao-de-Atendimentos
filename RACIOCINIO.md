# RACIOCÍNIO - Organização de Atendimentos

## Parte 1 — Modelagem do problema

### 1. Classificação do problema

Classifiquei o problema como um **problema de escalonamento (scheduling)**.

Isso porque:
- Existem tarefas com início e fim (atendimentos)
- Há recursos limitados (consultórios)
- É necessário evitar conflitos de horário
- O objetivo é organizar a alocação temporal dos recursos

Esse tipo de problema é comum em sistemas que lidam com agenda e distribuição de tarefas ao longo do tempo.

---

### 2. Problema clássico semelhante

O problema se assemelha ao **Interval Scheduling / Job Scheduling**.

A analogia é:

- cada atendimento = uma tarefa com intervalo de tempo
- cada consultório = um recurso disponível
- tarefas não podem se sobrepor no mesmo recurso

O objetivo é distribuir os intervalos de forma eficiente.

---

### 3. Estruturas de dados utilizadas

Utilizei principalmente:

- **Array**
  - para armazenar lista de atendimentos
  - para representar consultórios e suas agendas

- **Objetos**
  - para representar cada atendimento com `nome`, `inicio`, `fim` e `tipo`

Essas estruturas foram escolhidas por simplicidade e facilidade de manipulação.

Alternativas como heaps ou filas de prioridade poderiam ser usadas, mas não eram necessárias para o escopo do problema.

---

## Parte 2 — Estratégia algorítmica

### 4. Descrição do algoritmo

O algoritmo funciona da seguinte forma:

1. Leitura dos atendimentos do arquivo de entrada
2. Conversão dos horários para minutos
3. Ordenação dos atendimentos:
   - prioridade para EXPRESSO
   - depois por horário de início
4. Criação de uma lista vazia de consultórios
5. Para cada atendimento:
   - tenta encaixar no primeiro consultório disponível
   - se houver conflito, testa o próximo
   - se nenhum servir, cria um novo consultório
6. Retorno da organização final

---

### 5. Tipo de abordagem

A solução é uma **abordagem gulosa (greedy)**.

Isso porque:
- decisões são tomadas localmente
- não há revisão de decisões anteriores
- busca uma solução eficiente, não necessariamente ótima global

---

### 6. Existe caso não ótimo?

Sim.

Como o algoritmo é guloso, pode existir casos em que ele não encontra a solução com o menor número possível de consultórios.

Isso ocorre porque decisões locais não garantem otimização global.

---

### 7. Complexidade do algoritmo

- Ordenação: O(n log n)
- Distribuição: O(n²) no pior caso

Complexidade total:

O(n log n + n²)

---

## Parte 3 — Decisões de implementação

### 8. Como decide quantos consultórios abrir?

Os consultórios são criados dinamicamente.

Um novo consultório só é criado quando nenhum dos existentes pode acomodar o atendimento sem conflito.

---

### 9. Tratamento de atendimentos expressos

Atendimentos do tipo EXPRESSO têm prioridade na ordenação inicial.

Isso garante que sejam alocados primeiro, reduzindo risco de conflito.

---

### 10. Parte mais inteligente da solução

O ponto principal da solução é a verificação de conflito:

``if (ultimoAtendimento.fim <= atendimento.inicio)

Ele permite reutilizar consultórios corretamente, evitando criação desnecessária de novos recursos.

Isso é essencial para eficiência do algoritmo.

### 11. Parte que poderia ser melhorada

A verificação de consultórios é feita de forma linear:

pode ser ineficiente com muitos dados
poderia ser otimizada com uma estrutura de prioridade (heap)

Melhoria possível:

usar uma fila de prioridade ordenada pelo horário de término

### 12. Observação final

A solução prioriza:

simplicidade
legibilidade
facilidade de defesa em entrevista

Mesmo não sendo otimização perfeita, ela é eficiente e robusta para o problema proposto.