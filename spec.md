# Especificação de desenvolvimento - Protótipo TrampoIA

> Documento de orientação para implementação por agente de IA no OpenCode.

## 1. Objetivo

Desenvolver um protótipo web estático chamado **TrampoIA**, usando **Angular**, para validar a compreensão, a utilidade percebida e a usabilidade de uma experiência guiada de apoio a jovens na:

1. organização de informações para um currículo;
2. valorização de experiências escolares, comunitárias e informais;
3. preparação inicial para entrevistas de Jovem Aprendiz, estágio ou primeiro emprego.

O protótipo deve demonstrar a ideia do produto, e não implementar um sistema real de inteligência artificial.

## 2. Regra central do escopo

A aplicação deve ser inteiramente demonstrativa e funcionar somente no navegador.

### Deve existir

- aplicação Angular responsiva;
- navegação entre páginas ou etapas;
- formulários demonstrativos;
- dados fictícios pré-carregados;
- geração visual de um currículo simulado;
- perguntas de entrevista predefinidas;
- dicas e respostas-modelo predefinidas;
- estados locais para demonstrar interações;
- opção de reiniciar a demonstração;
- impressão do currículo pelo navegador, se viável;
- avisos explícitos sobre a natureza simulada do protótipo.

### Não deve existir

- consumo de API de IA;
- integração com OpenAI, Azure OpenAI, Gemini, Claude ou qualquer LLM;
- servidor backend;
- banco de dados;
- autenticação ou criação de conta;
- persistência remota;
- envio de formulários para servidores;
- coleta real de dados pessoais;
- indicação ou busca real de vagas;
- análise automatizada real de currículo;
- upload de arquivos;
- geração real de PDF no servidor;
- telemetria ou ferramentas de analytics;
- qualquer funcionalidade apresentada como IA real.

Não criar serviços, endpoints, mocks HTTP ou arquiteturas preparadas para backend. O foco é uma página estática para validação acadêmica.

## 3. Mensagem obrigatória de transparência

Exibir no início da experiência, no formulário e na visualização do currículo:

> **Protótipo demonstrativo:** o TrampoIA não utiliza inteligência artificial generativa nesta versão. As informações, currículos, perguntas e respostas são simulados. Nenhum dado é enviado para servidor ou armazenado em banco de dados. Não informe dados pessoais reais.

O aviso deve permanecer acessível durante toda a navegação, por exemplo em um componente de alerta no cabeçalho ou em uma página "Sobre o protótipo".

## 4. Público e contexto de uso

O protótipo será avaliado principalmente por pessoas com 18 anos ou mais, priorizando jovens de Salvador que:

- estejam buscando o primeiro emprego;
- tenham interesse em vagas de Jovem Aprendiz ou estágio;
- possuam pouca experiência na preparação de currículos;
- sintam insegurança em entrevistas;
- usem o celular como principal forma de acesso à internet.

A linguagem deve ser simples, direta e acolhedora, sem infantilização, promessas de contratação ou jargões técnicos de Recursos Humanos.

## 5. Tecnologia

### Obrigatório

- Angular na versão estável disponível no ambiente;
- TypeScript com modo estrito;
- Angular standalone components;
- Angular Router;
- Reactive Forms;
- HTML semântico;
- CSS ou SCSS local, sem dependência obrigatória de biblioteca visual;
- estado local em serviços Angular ou signals;
- testes unitários para regras e componentes críticos;
- build estático compatível com hospedagem no GitHub Pages, Netlify ou Vercel.

### Preferências

- usar Angular Signals para o estado da demonstração;
- usar `ChangeDetectionStrategy.OnPush`;
- evitar dependências externas quando HTML, CSS e Angular forem suficientes;
- não usar NgRx, pois o escopo não justifica a complexidade;
- não usar Angular Material apenas para acelerar a implementação, salvo se já estiver instalado no projeto;
- não usar fontes, scripts ou imagens que dependam de carregamento externo.

## 6. Arquitetura sugerida

```text
src/app/
  core/
    models/
      candidate-profile.model.ts
      resume.model.ts
      interview-question.model.ts
    services/
      demo-state.service.ts
      simulated-resume.service.ts
      interview-demo.service.ts
    constants/
      demo-data.ts
      interview-questions.ts
  shared/
    components/
      simulation-alert/
      step-indicator/
      empty-state/
      confirmation-dialog/
  features/
    home/
    guided-form/
    resume-preview/
    interview-preparation/
    about/
  app.routes.ts
  app.component.ts
```

Os nomes podem ser adaptados à estrutura já existente, mas a separação entre dados simulados, regras locais e componentes visuais deve ser mantida.

## 7. Rotas e experiência

| Rota | Tela | Finalidade |
|---|---|---|
| `/` | Início | Explicar o propósito, as limitações e iniciar a demonstração. |
| `/curriculo` | Formulário guiado | Coletar apenas informações fictícias em etapas. |
| `/curriculo/visualizar` | Currículo demonstrativo | Mostrar o resultado estruturado e permitir edição ou impressão. |
| `/entrevista` | Preparação para entrevista | Exibir perguntas e orientações simuladas. |
| `/sobre` | Sobre o protótipo | Explicar dados simulados, ausência de IA real e limites. |

Rotas inexistentes devem direcionar para a página inicial ou para uma página 404 simples.

## 8. Fluxo principal

1. A pessoa acessa a página inicial.
2. A página apresenta o aviso de simulação.
3. A pessoa seleciona **Iniciar demonstração**.
4. O formulário é preenchido inicialmente com dados fictícios, que podem ser editados.
5. A pessoa avança por etapas curtas.
6. O sistema aplica somente regras determinísticas locais para montar o currículo demonstrativo.
7. A pessoa revisa o currículo, retorna para editar ou usa a impressão do navegador.
8. A pessoa acessa a preparação para entrevistas.
9. O sistema mostra de 3 a 5 perguntas predefinidas com dicas e respostas-modelo.
10. A pessoa pode reiniciar a demonstração, restaurando os dados fictícios iniciais.

## 9. Página inicial

### Conteúdo

- logotipo textual ou nome **TrampoIA**;
- título: **Seu primeiro passo para apresentar sua trajetória profissional**;
- explicação curta da proposta;
- aviso obrigatório de protótipo simulado;
- dois cartões de funcionalidades:
  - **Organizar currículo**;
  - **Preparar entrevista**;
- botão principal **Iniciar demonstração**;
- link para **Entenda como este protótipo funciona**.

### Não usar

- frases como "currículo criado por IA";
- promessas como "garanta sua vaga";
- números de sucesso simulados;
- depoimentos fictícios apresentados como reais;
- logos de empresas ou instituições sem autorização.

## 10. Formulário guiado de currículo

Usar Reactive Forms e dividir o fluxo em etapas. Não solicitar CPF, RG, data de nascimento, endereço, telefone ou e-mail real.

### Etapa 1 - Objetivo profissional

Campos:

- `targetOpportunity`: seleção única:
  - Jovem Aprendiz;
  - Estágio;
  - Primeiro emprego;
- `interestArea`: seleção única:
  - Atendimento;
  - Administrativo;
  - Tecnologia;
  - Vendas;
  - Logística;
  - Outra;
- `professionalGoal`: texto curto, com exemplo fictício.

### Etapa 2 - Formação

Campos:

- `educationLevel`;
- `courseOrSchoolArea`;
- `educationStatus`;
- `expectedCompletion` opcional e fictício;
- cursos e oficinas demonstrativos.

### Etapa 3 - Vivências e competências

Campos:

- participação em projeto escolar;
- voluntariado;
- apoio em negócio familiar;
- trabalho informal;
- atividades comunitárias;
- competências selecionáveis.

Competências disponíveis:

- comunicação;
- organização;
- pontualidade;
- trabalho em equipe;
- atendimento ao público;
- responsabilidade;
- facilidade com tecnologia;
- resolução de problemas.

### Etapa 4 - Revisão

- mostrar resumo dos dados;
- permitir voltar e editar;
- checkbox obrigatório confirmando que os dados usados são fictícios;
- botão **Gerar currículo demonstrativo**.

### Validações

- campos obrigatórios devem ter mensagens claras;
- limitar campos longos a aproximadamente 300 caracteres;
- permitir avanço somente quando a etapa estiver válida;
- preservar os dados apenas na memória da aplicação;
- ao recarregar a página, pode restaurar os dados fictícios padrão;
- não usar `localStorage`, `sessionStorage`, IndexedDB ou cookies.

## 11. Dados fictícios iniciais

Usar um perfil claramente fictício, sem dados de contato reais.

```ts
export const DEMO_PROFILE = {
  displayName: 'Pessoa Candidata - Exemplo',
  targetOpportunity: 'Jovem Aprendiz',
  interestArea: 'Atendimento',
  professionalGoal:
    'Busco uma oportunidade de Jovem Aprendiz para desenvolver minhas habilidades de comunicação, organização e atendimento ao público.',
  educationLevel: 'Ensino médio em andamento',
  courseOrSchoolArea: 'Formação geral',
  educationStatus: 'Cursando',
  experiences: [
    {
      type: 'Apoio em negócio familiar',
      description:
        'Auxílio na organização de produtos, no atendimento e na comunicação com clientes.'
    },
    {
      type: 'Projeto escolar',
      description:
        'Participação na organização de uma apresentação em grupo, com divisão de tarefas e cumprimento de prazo.'
    }
  ],
  skills: [
    'Comunicação',
    'Organização',
    'Responsabilidade',
    'Trabalho em equipe'
  ],
  courses: [
    {
      name: 'Informática básica - curso demonstrativo',
      status: 'Concluído'
    }
  ]
} as const;
```

Os dados devem conter identificadores como "Exemplo", "Demonstrativo" ou "Fictício" quando necessário para impedir interpretação como dado real.

## 12. Simulação de estruturação curricular

A montagem do currículo deve ser determinística. Não chamar o comportamento de geração por IA.

### Regras permitidas

- organizar campos preenchidos em seções;
- ocultar seções vazias;
- mapear uma vivência para uma descrição predefinida;
- escolher um texto entre opções locais conforme o tipo da vivência;
- concatenar competências selecionadas;
- aplicar formatação visual;
- permitir edição antes da impressão.

### Exemplo de regra

Entrada fictícia:

> Ajudei minha tia na loja e atendia clientes.

Saída demonstrativa predefinida:

> Apoio no atendimento ao cliente, organização do espaço e comunicação com o público.

A interface deve informar:

> Esta descrição é um exemplo predefinido para demonstrar como uma vivência informal pode ser apresentada. Nenhuma IA analisou o texto.

### Proibições

- não inferir duração de experiência;
- não criar cargo profissional;
- não acrescentar cursos não informados;
- não atribuir conhecimentos técnicos;
- não incluir métricas falsas;
- não afirmar domínio de idiomas;
- não classificar compatibilidade com vagas ou ATS;
- não apresentar pontuação de empregabilidade.

## 13. Visualização do currículo

### Seções

- identificação demonstrativa;
- objetivo profissional;
- formação;
- experiências e vivências;
- cursos e oficinas;
- competências.

### Ações

- **Editar informações**;
- **Ir para preparação de entrevista**;
- **Imprimir currículo demonstrativo**;
- **Reiniciar demonstração**.

A impressão deve usar `window.print()` e uma folha de estilos `@media print`. Na impressão:

- ocultar cabeçalho, navegação, alertas interativos e botões;
- manter uma identificação discreta como **CURRÍCULO DEMONSTRATIVO - DADOS FICTÍCIOS**;
- evitar quebra inadequada entre títulos e conteúdos;
- produzir layout legível em A4.

Não é necessário implementar biblioteca de PDF. O usuário pode selecionar "Salvar como PDF" na janela de impressão do navegador.

## 14. Preparação para entrevistas

A tela deve apresentar perguntas predefinidas. Cada pergunta deve ter:

- enunciado;
- motivo pelo qual a pergunta costuma ser feita;
- estrutura recomendada de resposta;
- resposta-modelo fictícia;
- cuidados ou erros comuns;
- marcação explícita de conteúdo demonstrativo.

### Conjunto mínimo

1. **Fale sobre você.**
2. **Por que você quer esta oportunidade?**
3. **Quais são seus pontos fortes?**
4. **Conte uma situação em que trabalhou em equipe.**
5. **Como você lida com algo que ainda não sabe fazer?**

### Exemplo

```ts
{
  id: 'strengths',
  question: 'Quais são seus pontos fortes?',
  intent: 'Conhecer qualidades relevantes e verificar se a pessoa consegue apresentar exemplos.',
  answerStructure: [
    'Escolha uma qualidade verdadeira.',
    'Conte uma situação curta em que a qualidade apareceu.',
    'Relacione a qualidade ao tipo de oportunidade.'
  ],
  simulatedAnswer:
    'Um dos meus pontos fortes é a organização. Em um projeto escolar, ajudei a dividir as tarefas e acompanhar o prazo da apresentação. Quero levar essa organização para a rotina da oportunidade.',
  cautions: [
    'Não invente experiências.',
    'Evite listar qualidades sem exemplos.',
    'Use uma resposta curta e verdadeira.'
  ]
}
```

### Interações

- selecionar pergunta;
- expandir e recolher orientações;
- marcar localmente como "revisada" durante a sessão;
- navegar para pergunta anterior e seguinte;
- reiniciar progresso.

Não avaliar a resposta do participante, não gravar áudio e não simular pontuação de entrevista.

## 15. Estado da aplicação

Criar um `DemoStateService` responsável por:

- fornecer cópia do perfil fictício inicial;
- manter os dados enquanto a aplicação estiver aberta;
- atualizar etapas do formulário;
- limpar e restaurar o estado;
- controlar perguntas de entrevista revisadas;
- expor estado com signals ou observables.

O estado deve existir apenas em memória. Recarregar a aplicação pode reiniciar a demonstração.

## 16. Design e responsividade

### Direção visual

- interface limpa e leve;
- abordagem mobile-first;
- aparência profissional e acessível;
- cores com contraste mínimo WCAG AA;
- destaque consistente para avisos de simulação;
- etapas curtas e escaneáveis;
- botões com altura mínima aproximada de 44 px;
- corpo de texto com pelo menos 16 px em dispositivos móveis;
- largura máxima de leitura entre 720 e 960 px nas telas textuais;
- currículo com largura adequada para impressão A4.

### Componentes importantes

- cabeçalho com nome do produto e link "Sobre";
- `SimulationAlertComponent` reutilizável;
- indicador de etapas;
- cartões de funcionalidade;
- feedback de validação junto ao campo;
- confirmação antes de reiniciar os dados;
- rodapé com finalidade acadêmica.

### Acessibilidade

- navegação por teclado;
- foco visível;
- labels associados aos campos;
- uso correto de `fieldset` e `legend` em conjuntos de opções;
- mensagens de erro vinculadas com `aria-describedby`;
- `aria-live` para confirmação de geração e reinício;
- não depender somente de cores;
- respeitar `prefers-reduced-motion`;
- ícones, quando usados, devem ter texto acessível;
- títulos em hierarquia lógica.

## 17. Conteúdo e tom

### Usar

- "protótipo demonstrativo";
- "conteúdo simulado";
- "dados fictícios";
- "exemplo predefinido";
- "revise as informações";
- "não informe dados pessoais reais".

### Evitar

- "nossa IA analisou";
- "currículo otimizado por IA";
- "compatível com ATS";
- "aumente suas chances";
- "resposta perfeita";
- "garantia de contratação";
- "diagnóstico profissional".

## 18. Página Sobre

A página `/sobre` deve explicar:

- finalidade acadêmica do TrampoIA;
- problema que a ideia procura investigar;
- público pretendido;
- diferença entre protótipo, simulação e produto real;
- ausência de API, backend, banco e IA generativa;
- inexistência de armazenamento;
- limitações da demonstração;
- funcionalidades que uma versão futura exigiria;
- orientação para não usar o conteúdo como garantia de contratação.

Usar uma seção clara intitulada **O que este protótipo não faz**.

## 19. Testes

Criar testes unitários mínimos para:

- validação de cada etapa do formulário;
- montagem do currículo com dados completos;
- ocultação de seções vazias;
- restauração dos dados fictícios;
- ausência de persistência no estado;
- seleção determinística de descrições simuladas;
- carregamento das cinco perguntas de entrevista;
- aviso de simulação presente nas telas principais.

Se testes de componente estiverem configurados, cobrir:

- avanço e retorno entre etapas;
- bloqueio de avanço em formulário inválido;
- geração do currículo;
- reinício da demonstração;
- navegação para entrevista.

## 20. Critérios de aceite

O protótipo será considerado concluído quando:

- [ ] executar localmente com os comandos documentados;
- [ ] gerar build de produção sem erros;
- [ ] funcionar em largura de 320 px sem rolagem horizontal;
- [ ] possuir as cinco rotas previstas;
- [ ] deixar explícito que não utiliza IA real;
- [ ] não realizar nenhuma requisição de aplicação para API externa;
- [ ] não usar backend, banco, autenticação ou armazenamento local;
- [ ] fornecer dados fictícios iniciais;
- [ ] permitir editar o formulário demonstrativo;
- [ ] montar o currículo por regras locais determinísticas;
- [ ] permitir revisar e imprimir o currículo demonstrativo;
- [ ] apresentar pelo menos cinco perguntas de entrevista predefinidas;
- [ ] não avaliar respostas nem gerar pontuações;
- [ ] ter navegação por teclado e foco visível;
- [ ] possuir testes das regras críticas;
- [ ] conter README com execução, build, testes, deploy e limitações;
- [ ] não conter segredos, tokens, chaves ou configurações de API;
- [ ] não apresentar dados simulados como resultados reais.

## 21. README obrigatório

Criar ou atualizar `README.md` com:

1. nome e objetivo do projeto;
2. aviso de protótipo acadêmico e simulado;
3. requisitos de ambiente;
4. instalação;
5. execução local;
6. execução dos testes;
7. build de produção;
8. hospedagem estática;
9. estrutura principal do projeto;
10. limitações;
11. declaração de que não existe IA real, API, backend ou banco;
12. orientação para não inserir dados pessoais reais.

Não incluir instruções para configurar chaves de API.

## 22. Restrições para o agente do OpenCode

1. Antes de editar, inspecione a estrutura do repositório e preserve configurações válidas existentes.
2. Se o repositório estiver vazio, crie a aplicação Angular diretamente no diretório atual, sem criar uma pasta aninhada desnecessária.
3. Não altere o escopo para adicionar funcionalidades "interessantes" não solicitadas.
4. Não instale bibliotecas de IA, autenticação, banco ou analytics.
5. Não crie backend, funções serverless ou arquivos de infraestrutura.
6. Não use APIs externas nem mesmo para demonstração.
7. Não invente resultados de pesquisa, estatísticas de uso ou depoimentos.
8. Use somente dados claramente fictícios.
9. Implemente primeiro o fluxo funcional e depois refine o visual.
10. Execute lint, testes e build antes de encerrar.
11. Corrija erros encontrados, sem apenas descrevê-los.
12. Ao concluir, informe arquivos alterados, comandos executados, testes realizados e limitações restantes.

## 23. Ordem recomendada de implementação

1. Inspecionar o repositório e confirmar a versão do Angular.
2. Configurar rotas e layout principal.
3. Criar modelos e dados simulados.
4. Implementar serviço de estado em memória.
5. Implementar página inicial e aviso reutilizável.
6. Implementar formulário guiado com Reactive Forms.
7. Implementar montagem determinística do currículo.
8. Implementar visualização e estilo de impressão.
9. Implementar preparação para entrevistas.
10. Implementar página Sobre.
11. Revisar responsividade e acessibilidade.
12. Criar testes.
13. Atualizar README.
14. Executar lint, testes e build de produção.

## 24. Comandos esperados

Adaptar os comandos conforme o gerenciador de pacotes já utilizado no repositório.

```bash
npm install
npm start
npm test -- --watch=false
npm run build
```

Se houver script de lint:

```bash
npm run lint
```

## 25. Resultado esperado da entrega

Ao final, o repositório deve conter uma aplicação Angular estática, navegável e responsiva que permita demonstrar o conceito do TrampoIA com segurança e transparência. A aplicação deve ser suficiente para que participantes explorem o fluxo e, em seguida, respondam ao formulário acadêmico de validação.

O produto entregue não deve parecer uma IA incompleta. Deve parecer deliberadamente um **protótipo de experiência**, com comportamento simulado, criado para testar uma hipótese antes da implementação de recursos reais de inteligência artificial.
