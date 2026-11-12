import {
  CandidateProfile,
  CourseStatus,
  EducationLevel,
  EducationStatus,
  ExperienceType,
  InterestArea,
  Skill,
  TargetOpportunity,
} from '../models/candidate-profile.model';

export const MAX_LONG_TEXT = 300;
export const MAX_SHORT_TEXT = 120;

export const DEMO_PROFILE: CandidateProfile = {
  displayName: 'Pessoa Candidata - Exemplo',
  targetOpportunity: 'Jovem Aprendiz',
  interestArea: 'Atendimento',
  professionalGoal:
    'Busco uma oportunidade de Jovem Aprendiz para desenvolver minhas habilidades de comunicação, organização e atendimento ao público.',
  educationLevel: 'Ensino médio em andamento',
  courseOrSchoolArea: 'Formação geral',
  educationStatus: 'Cursando',
  expectedCompletion: '',
  experiences: [
    {
      type: 'Apoio em negócio familiar',
      description:
        'Auxílio na organização de produtos, no atendimento e na comunicação com clientes.',
    },
    {
      type: 'Projeto escolar',
      description:
        'Participação na organização de uma apresentação em grupo, com divisão de tarefas e cumprimento de prazo.',
    },
  ],
  skills: ['Comunicação', 'Organização', 'Responsabilidade', 'Trabalho em equipe'],
  courses: [
    {
      name: 'Informática básica - curso demonstrativo',
      status: 'Concluído',
    },
  ],
};

export const TARGET_OPPORTUNITIES: readonly TargetOpportunity[] = [
  'Jovem Aprendiz',
  'Estágio',
  'Primeiro emprego',
];

export const TARGET_OPPORTUNITY_HINTS: Record<TargetOpportunity, string> = {
  'Jovem Aprendiz': 'Para quem busca aprender e estudar ao mesmo tempo.',
  Estágio: 'Para quem está estudando ou acabou de concluir um curso.',
  'Primeiro emprego': 'Para quem ainda não teve uma experiência formal.',
};

export const INTEREST_AREAS: readonly InterestArea[] = [
  'Atendimento',
  'Administrativo',
  'Tecnologia',
  'Vendas',
  'Logística',
  'Outra',
];

export const EDUCATION_LEVELS: readonly EducationLevel[] = [
  'Ensino fundamental em andamento',
  'Ensino fundamental completo',
  'Ensino médio em andamento',
  'Ensino médio completo',
  'Ensino técnico',
  'Ensino superior em andamento',
  'Ensino superior completo',
  'Outro',
];

export const EDUCATION_STATUSES: readonly EducationStatus[] = [
  'Cursando',
  'Concluído',
  'Interrompido',
];

export const EXPERIENCE_TYPES: readonly ExperienceType[] = [
  'Apoio em negócio familiar',
  'Projeto escolar',
  'Voluntariado',
  'Trabalho informal',
  'Atividade comunitária',
];

export const EXPERIENCE_PLACEHOLDERS: Record<ExperienceType, string> = {
  'Apoio em negócio familiar': 'Exemplo fictício: ajudei em uma loja da família e atendi clientes.',
  'Projeto escolar': 'Exemplo fictício: organizei uma apresentação em grupo na escola.',
  Voluntariado: 'Exemplo fictício: participei de uma ação de doação de alimentos.',
  'Trabalho informal': 'Exemplo fictício: fiz pequenos serviços de organização para vizinhos.',
  'Atividade comunitária': 'Exemplo fictício: ajudei em um evento do bairro com a equipe.',
};

/**
 * Opções locais e predefinidas para transformar o tipo da vivência em uma
 * descrição demonstrativa. A escolha é determinística e não usa IA.
 */
export const EXPERIENCE_DESCRIPTIONS: Record<ExperienceType, readonly string[]> = {
  'Apoio em negócio familiar': [
    'Apoio no atendimento ao cliente, organização do espaço e comunicação com o público.',
    'Colaboração na rotina de um negócio familiar, com organização de produtos e atendimento.',
  ],
  'Projeto escolar': [
    'Participação na organização de uma apresentação em grupo, com divisão de tarefas e cumprimento de prazo.',
    'Colaboração em projeto escolar, combinando organização, trabalho em equipe e comunicação.',
  ],
  Voluntariado: [
    'Apoio voluntário em atividades coletivas, com colaboração, organização e contato com o público.',
    'Participação em ação voluntária, contribuindo com a equipe e com a organização das atividades.',
  ],
  'Trabalho informal': [
    'Realização de atividades de apoio com responsabilidade, organização e cumprimento de combinados.',
    'Prestação de pequenos serviços, com atenção às necessidades das pessoas e organização das tarefas.',
  ],
  'Atividade comunitária': [
    'Participação em ações comunitárias, com trabalho em equipe, organização e comunicação.',
    'Apoio em evento comunitário, colaborando com a equipe e com a organização do espaço.',
  ],
};

export const SKILLS: readonly Skill[] = [
  'Comunicação',
  'Organização',
  'Pontualidade',
  'Trabalho em equipe',
  'Atendimento ao público',
  'Responsabilidade',
  'Facilidade com tecnologia',
  'Resolução de problemas',
];

export const COURSE_STATUSES: readonly CourseStatus[] = ['Concluído', 'Cursando', 'Planejado'];

export const PROFESSIONAL_GOAL_EXAMPLE =
  'Busco uma oportunidade de Jovem Aprendiz para desenvolver minhas habilidades de comunicação, organização e atendimento ao público.';
