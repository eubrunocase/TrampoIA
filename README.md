# TrampoIA — protótipo demonstrativo

Aplicação web estática em Angular para demonstrar uma experiência guiada de apoio a jovens na
organização de um currículo e na preparação inicial para entrevistas de Jovem Aprendiz, estágio ou
primeiro emprego.

> **Protótipo demonstrativo:** o TrampoIA não utiliza inteligência artificial generativa nesta
> versão. As informações, currículos, perguntas e respostas são simulados. Nenhum dado é enviado
> para servidor ou armazenado em banco de dados. **Não informe dados pessoais reais.**

Este é um projeto acadêmico. Não é um produto comercial, não é um serviço de empregabilidade e não
garante contratação ou aprovação em processos seletivos.

## 1. Objetivo

Validar a compreensão, a utilidade percebida e a usabilidade de uma experiência que ajuda a:

- organizar informações fictícias para um currículo;
- valorizar vivências escolares, comunitárias, familiares e informais;
- conhecer perguntas comuns de entrevista, dicas e respostas-modelo predefinidas.

O protótipo demonstra a ideia do produto. Ele não implementa IA real, backend, banco de dados,
autenticação, busca de vagas ou análise automatizada de currículo.

## 2. Requisitos de ambiente

- Node.js compatível com Angular 21 (testado com Node 24);
- npm;
- navegador moderno com suporte a ES2022.

Não é necessário configurar chaves, variáveis de ambiente ou serviços externos.

## 3. Instalação

Na raiz do projeto:

```bash
npm install
```

## 4. Execução local

```bash
npm start
```

Abra `http://localhost:4200/`.

O formulário começa preenchido com um perfil fictício. Os dados ficam apenas em memória e podem ser
restaurados pela opção **Reiniciar demonstração**.

## 5. Testes

```bash
npm test -- --watch=false
```

Os testes cobrem validações das etapas do formulário, montagem determinística do currículo,
ocultação de seções vazias, restauração dos dados fictícios, ausência de persistência, carregamento
das perguntas, navegação entre etapas, geração do currículo, reinício da demonstração e presença do
aviso de simulação nas telas principais.

## 6. Build de produção

```bash
npm run build
```

O resultado é gerado em `dist/trampoia/browser/`.

Não existe script de lint configurado neste projeto. A validação estática é feita pelo TypeScript
em modo estrito e pelo build de produção do Angular.

## 7. Hospedagem estática

O build é composto apenas por arquivos estáticos.

- **Netlify / Vercel:** publique a pasta `dist/trampoia/browser` e configure fallback de SPA para
  `index.html`, pois as rotas usam caminhos do Angular Router.
- **GitHub Pages:** publique a mesma pasta. Para um repositório em subpasta, gere o build com
  `ng build --base-href /nome-do-repositorio/` e configure um fallback de SPA (`404.html`) para as
  rotas profundas.
- Não há funções serverless, servidor Node, banco ou variáveis secretas necessárias.

## 8. Rotas

| Rota | Tela |
| --- | --- |
| `/` | Página inicial e início da demonstração |
| `/curriculo` | Formulário guiado em quatro etapas |
| `/curriculo/visualizar` | Currículo demonstrativo e impressão |
| `/entrevista` | Preparação para entrevista |
| `/sobre` | Explicação do protótipo e de suas limitações |

Rotas inexistentes redirecionam para a página inicial.

## 9. Estrutura principal

```text
src/app/
  core/
    constants/
      demo-data.ts
      interview-questions.ts
    models/
      candidate-profile.model.ts
      interview-question.model.ts
      resume.model.ts
    services/
      demo-state.service.ts
      interview-demo.service.ts
      simulated-resume.service.ts
  shared/components/
    confirmation-dialog/
    empty-state/
    simulation-alert/
    step-indicator/
  features/
    about/
    guided-form/
    home/
    interview-preparation/
    resume-preview/
  app.config.ts
  app.routes.ts
  app.ts
```

- **Dados simulados:** constantes com o perfil fictício, opções e perguntas predefinidas.
- **Regras locais:** `SimulatedResumeService` monta o currículo de forma determinística.
- **Estado:** `DemoStateService` mantém o perfil e as marcações de revisão apenas em memória, usando
  Angular Signals.
- **Interface:** componentes standalone, `ChangeDetectionStrategy.OnPush`, Reactive Forms, HTML
  semântico e SCSS local.

## 10. Como a simulação funciona

1. O perfil fictício é carregado no formulário.
2. A pessoa avança por objetivo, formação, vivências e revisão.
3. O currículo é montado apenas pela organização dos campos preenchidos, ocultação de seções vazias
   e escolha de descrições predefinidas conforme o tipo de vivência.
4. A impressão usa `window.print()` e uma folha de estilos `@media print`. O navegador pode salvar
   como PDF.
5. Na entrevista, cinco perguntas predefinidas exibem intenção, estrutura, resposta-modelo fictícia
   e cuidados. As respostas não são avaliadas, gravadas ou pontuadas.

Não há inferência de duração de experiência, criação de cargos, inclusão de cursos não informados,
atribuição de conhecimentos técnicos, métricas falsas, análise de idiomas, compatibilidade com ATS
ou pontuação de empregabilidade.

## 11. Privacidade e ausência de persistência

- Nenhum dado é enviado para servidor.
- Nenhum uso de `localStorage`, `sessionStorage`, cookies ou IndexedDB.
- Nenhuma autenticação, conta ou telemetria.
- Ao recarregar a página, a demonstração pode retornar ao perfil fictício inicial.
- O botão de reinício restaura os dados fictícios e limpa o progresso da entrevista.

**Não informe CPF, RG, data de nascimento, endereço, telefone, e-mail ou qualquer dado pessoal
real.** Use apenas os exemplos fictícios.

## 12. Limitações

- Não há IA generativa, LLM, API externa ou análise automática de texto.
- Não há backend, banco de dados, funções serverless ou infraestrutura de deploy incluída.
- Não há busca ou indicação real de vagas.
- Não há upload de arquivos, geração de PDF no servidor ou envio de formulários.
- Não há armazenamento entre sessões, histórico ou sincronização entre dispositivos.
- As descrições de vivências são exemplos gerais, não uma avaliação individual.
- O conteúdo de entrevista é genérico e não substitui preparação para uma vaga específica.
- O protótipo não garante contratação, aprovação ou qualquer resultado em processos seletivos.
- A aplicação não representa uma instituição, empresa ou serviço oficial de emprego.

## 13. Uso responsável

Este projeto existe para validação acadêmica de uma experiência. Antes de qualquer evolução para
produto real, seriam necessários pesquisa com usuários, revisão de conteúdo, diretrizes de
privacidade e proteção de dados, testes de acessibilidade e infraestrutura segura. Nenhuma dessas
etapas está implementada aqui.
