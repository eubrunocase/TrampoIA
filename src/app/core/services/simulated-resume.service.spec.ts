import { DEMO_PROFILE, EXPERIENCE_DESCRIPTIONS } from '../constants/demo-data';
import { CandidateProfile } from '../models/candidate-profile.model';
import { cloneProfile } from './demo-state.service';
import { SimulatedResumeService } from './simulated-resume.service';

const EMPTY_PROFILE: CandidateProfile = {
  displayName: 'Pessoa Candidata - Exemplo',
  targetOpportunity: '',
  interestArea: '',
  professionalGoal: '',
  educationLevel: '',
  courseOrSchoolArea: '',
  educationStatus: '',
  expectedCompletion: '',
  experiences: [],
  skills: [],
  courses: [],
};

describe('SimulatedResumeService', () => {
  const service = new SimulatedResumeService();

  it('monta o currículo com dados completos', () => {
    const resume = service.buildResume(cloneProfile(DEMO_PROFILE));

    expect(resume.displayName).toBe(DEMO_PROFILE.displayName);
    expect(resume.professionalGoal).toBe(DEMO_PROFILE.professionalGoal);
    expect(resume.visibleSections.map((section) => section.id)).toEqual([
      'goal',
      'education',
      'experiences',
      'courses',
      'skills',
    ]);
    expect(resume.educationLines.length).toBeGreaterThan(0);
    expect(resume.experiences).toHaveLength(2);
    expect(resume.courses).toHaveLength(1);
    expect(resume.skills).toEqual(DEMO_PROFILE.skills);
  });

  it('oculta todas as seções quando não há conteúdo', () => {
    const resume = service.buildResume(EMPTY_PROFILE);

    expect(resume.visibleSections).toEqual([]);
    expect(resume.educationLines).toEqual([]);
    expect(resume.experiences).toEqual([]);
    expect(resume.courses).toEqual([]);
    expect(resume.skills).toEqual([]);
  });

  it('oculta apenas as seções vazias', () => {
    const profile = cloneProfile(EMPTY_PROFILE);
    profile.professionalGoal = 'Objetivo fictício para o teste.';
    profile.skills = ['Organização'];

    const resume = service.buildResume(profile);

    expect(resume.visibleSections.map((section) => section.id)).toEqual(['goal', 'skills']);
  });

  it('seleciona descrições simuladas de forma determinística', () => {
    const first = service.descriptionFor('Apoio em negócio familiar');
    const second = service.descriptionFor('Apoio em negócio familiar');
    const third = service.descriptionFor('Projeto escolar');

    expect(first).toBe(second);
    expect(EXPERIENCE_DESCRIPTIONS['Apoio em negócio familiar']).toContain(first);
    expect(EXPERIENCE_DESCRIPTIONS['Projeto escolar']).toContain(third);
    expect(service.buildResume(cloneProfile(DEMO_PROFILE))).toEqual(
      service.buildResume(cloneProfile(DEMO_PROFILE)),
    );
  });

  it('não cria cargos, cursos ou competências que não foram informados', () => {
    const profile = cloneProfile(EMPTY_PROFILE);
    profile.experiences = [
      { type: 'Trabalho informal', description: 'Relato fictício informado no formulário.' },
    ];

    const resume = service.buildResume(profile);

    expect(resume.experiences.map((experience) => experience.title)).toEqual([
      'Trabalho informal',
    ]);
    expect(resume.experiences[0].sourceNote).toBe(
      'Relato fictício informado no formulário.',
    );
    expect(resume.courses).toEqual([]);
    expect(resume.skills).toEqual([]);
  });
});
