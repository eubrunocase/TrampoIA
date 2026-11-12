export type TargetOpportunity = 'Jovem Aprendiz' | 'Estágio' | 'Primeiro emprego';

export type InterestArea =
  | 'Atendimento'
  | 'Administrativo'
  | 'Tecnologia'
  | 'Vendas'
  | 'Logística'
  | 'Outra';

export type EducationLevel =
  | 'Ensino fundamental em andamento'
  | 'Ensino fundamental completo'
  | 'Ensino médio em andamento'
  | 'Ensino médio completo'
  | 'Ensino técnico'
  | 'Ensino superior em andamento'
  | 'Ensino superior completo'
  | 'Outro';

export type EducationStatus = 'Cursando' | 'Concluído' | 'Interrompido';

export type ExperienceType =
  | 'Apoio em negócio familiar'
  | 'Projeto escolar'
  | 'Voluntariado'
  | 'Trabalho informal'
  | 'Atividade comunitária';

export type Skill =
  | 'Comunicação'
  | 'Organização'
  | 'Pontualidade'
  | 'Trabalho em equipe'
  | 'Atendimento ao público'
  | 'Responsabilidade'
  | 'Facilidade com tecnologia'
  | 'Resolução de problemas';

export type CourseStatus = 'Concluído' | 'Cursando' | 'Planejado';

export interface Experience {
  type: ExperienceType;
  /** Relato curto e fictício informado pela pessoa. Nunca é enviado a um servidor. */
  description: string;
}

export interface Course {
  name: string;
  status: CourseStatus;
}

export interface CandidateProfile {
  /** Identificação claramente fictícia. Não é solicitado nenhum dado pessoal real. */
  displayName: string;
  targetOpportunity: TargetOpportunity | '';
  interestArea: InterestArea | '';
  professionalGoal: string;
  educationLevel: EducationLevel | '';
  courseOrSchoolArea: string;
  educationStatus: EducationStatus | '';
  expectedCompletion: string;
  experiences: Experience[];
  skills: Skill[];
  courses: Course[];
}
