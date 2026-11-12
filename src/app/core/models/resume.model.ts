export type ResumeSectionId = 'goal' | 'education' | 'experiences' | 'courses' | 'skills';

export interface ResumeSection {
  id: ResumeSectionId;
  title: string;
}

export interface ResumeExperience {
  title: string;
  /** Descrição predefinida localmente a partir do tipo da vivência. */
  description: string;
  /** Relato fictício informado no formulário, quando existir. */
  sourceNote: string;
}

export interface ResumeCourse {
  name: string;
  status: string;
}

export interface ResumeViewModel {
  displayName: string;
  targetOpportunity: string;
  interestArea: string;
  professionalGoal: string;
  educationLines: string[];
  experiences: ResumeExperience[];
  courses: ResumeCourse[];
  skills: string[];
  visibleSections: ResumeSection[];
}
