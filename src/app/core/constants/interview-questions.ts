import { InterviewQuestion } from '../models/interview-question.model';

/**
 * Conteúdo inteiramente predefinido. Nenhuma pergunta é gerada por IA e
 * nenhuma resposta é avaliada, gravada ou pontuada.
 */
export const INTERVIEW_QUESTIONS: readonly InterviewQuestion[] = [
  {
    id: 'tell-me-about-yourself',
    question: 'Fale sobre você.',
    intent:
      'Conhecer sua trajetória de forma resumida e entender o que você considera importante contar.',
    answerStructure: [
      'Comece com uma apresentação curta, usando apenas informações fictícias nesta demonstração.',
      'Cite formação, vivências e competências que ajudem a explicar sua preparação.',
      'Termine relacionando essa apresentação ao tipo de oportunidade que você busca.',
    ],
    simulatedAnswer:
      'Sou a Pessoa Candidata - Exemplo. Estou cursando o ensino médio e já participei de um projeto escolar com divisão de tarefas e prazo. Também apoio uma rotina de atendimento em um negócio familiar, o que me ajudou a desenvolver comunicação e organização. Busco uma oportunidade de Jovem Aprendiz para continuar aprendendo e contribuir com a equipe.',
    cautions: [
      'Não informe dados pessoais reais durante o uso deste protótipo.',
      'Evite decorar uma fala longa; prefira uma sequência curta e verdadeira.',
      'Não invente experiências para preencher a resposta.',
    ],
  },
  {
    id: 'why-this-opportunity',
    question: 'Por que você quer esta oportunidade?',
    intent:
      'Entender se a motivação está conectada ao que a pessoa espera aprender e ao contexto da vaga.',
    answerStructure: [
      'Diga o que chama sua atenção na oportunidade.',
      'Conte o que você espera aprender ou desenvolver.',
      'Relacione a oportunidade com um próximo passo possível para você.',
    ],
    simulatedAnswer:
      'Quero esta oportunidade de Jovem Aprendiz porque quero aprender na prática enquanto continuo estudando. Tenho interesse em atendimento e organização, e acredito que a rotina da vaga pode me ajudar a desenvolver essas competências com acompanhamento. É um próximo passo que faz sentido para o meu momento.',
    cautions: [
      'Evite respostas genéricas como “porque preciso de um emprego”, sem contexto.',
      'Não faça promessas que você não pode cumprir.',
      'Não use informações sobre empresas ou pessoas reais nesta demonstração.',
    ],
  },
  {
    id: 'strengths',
    question: 'Quais são seus pontos fortes?',
    intent:
      'Conhecer qualidades relevantes e verificar se a pessoa consegue apresentar exemplos.',
    answerStructure: [
      'Escolha uma qualidade verdadeira.',
      'Conte uma situação curta em que a qualidade apareceu.',
      'Relacione a qualidade ao tipo de oportunidade.',
    ],
    simulatedAnswer:
      'Um dos meus pontos fortes é a organização. Em um projeto escolar, ajudei a dividir as tarefas e acompanhar o prazo da apresentação. Quero levar essa organização para a rotina da oportunidade.',
    cautions: [
      'Não invente experiências.',
      'Evite listar qualidades sem exemplos.',
      'Use uma resposta curta e verdadeira.',
    ],
  },
  {
    id: 'teamwork',
    question: 'Conte uma situação em que trabalhou em equipe.',
    intent:
      'Observar como a pessoa colabora, combina tarefas e lida com diferenças dentro de um grupo.',
    answerStructure: [
      'Escolha uma situação fictícia ou uma vivência que você conseguiria explicar com clareza.',
      'Diga qual era a tarefa do grupo e qual foi a sua contribuição.',
      'Conte o que funcionou e o que você aprendeu com a experiência.',
    ],
    simulatedAnswer:
      'Em um projeto escolar, a equipe precisava montar uma apresentação. Fiquei responsável por organizar as tarefas e lembrar os combinados de prazo. Em um momento, precisei ajustar a divisão porque uma parte do grupo estava com dificuldade. Conseguimos entregar a apresentação no prazo e aprendi a ouvir antes de reorganizar o trabalho.',
    cautions: [
      'Não fale mal de colegas ou de pessoas que participaram da situação.',
      'Evite dizer apenas “eu trabalho bem em equipe” sem um exemplo.',
      'Não atribua a si toda a responsabilidade por um resultado coletivo.',
    ],
  },
  {
    id: 'learning',
    question: 'Como você lida com algo que ainda não sabe fazer?',
    intent:
      'Entender a postura da pessoa diante de aprendizados, dúvidas e orientações.',
    answerStructure: [
      'Reconheça que ainda está aprendendo, sem se diminuir.',
      'Explique como costuma pedir orientação ou buscar informação confiável.',
      'Diga como pretende acompanhar o próprio aprendizado.',
    ],
    simulatedAnswer:
      'Quando ainda não sei fazer algo, procuro entender qual é o objetivo da tarefa e peço orientação para quem já conhece o processo. Anoto os passos principais e confiro o resultado antes de concluir. Em um curso demonstrativo de informática básica, por exemplo, precisei praticar algumas etapas mais de uma vez e pedir ajuda para não seguir com dúvidas.',
    cautions: [
      'Não diga que sabe tudo nem que aprende sem nenhum apoio.',
      'Evite esconder uma dúvida importante para parecer mais preparado.',
      'Não prometa dominar uma ferramenta ou assunto em pouco tempo.',
    ],
  },
];
