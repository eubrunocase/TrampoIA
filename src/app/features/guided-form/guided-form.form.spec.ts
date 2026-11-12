import { DEMO_PROFILE } from '../../core/constants/demo-data';
import { cloneProfile } from '../../core/services/demo-state.service';
import {
  createCourseGroup,
  createProfileForm,
  hasSelectedSkill,
  isStepFourValid,
  isStepOneValid,
  isStepThreeValid,
  isStepTwoValid,
  isStepValid,
  toProfile,
} from './guided-form.form';

describe('Formulário guiado de currículo', () => {
  it('considera o perfil fictício válido nas três primeiras etapas', () => {
    const form = createProfileForm(cloneProfile(DEMO_PROFILE));

    expect(isStepOneValid(form)).toBe(true);
    expect(isStepTwoValid(form)).toBe(true);
    expect(isStepThreeValid(form)).toBe(true);
    expect(isStepFourValid(form)).toBe(false);
    expect(isStepValid(form, 0)).toBe(true);
    expect(isStepValid(form, 1)).toBe(true);
    expect(isStepValid(form, 2)).toBe(true);
    expect(isStepValid(form, 3)).toBe(false);
  });

  it('exige a confirmação de dados fictícios na etapa 4', () => {
    const form = createProfileForm(cloneProfile(DEMO_PROFILE));

    form.controls.fictionalDataConfirmed.setValue(true);
    expect(isStepFourValid(form)).toBe(true);

    form.controls.fictionalDataConfirmed.setValue(false);
    expect(isStepFourValid(form)).toBe(false);
  });

  it('valida a etapa 1: oportunidade, área e objetivo', () => {
    const form = createProfileForm(cloneProfile(DEMO_PROFILE));

    form.controls.professionalGoal.setValue('');
    expect(isStepOneValid(form)).toBe(false);

    form.controls.professionalGoal.setValue('Curto demais');
    expect(form.controls.professionalGoal.hasError('minlength')).toBe(true);
    expect(isStepOneValid(form)).toBe(false);

    form.controls.professionalGoal.setValue('a'.repeat(301));
    expect(form.controls.professionalGoal.hasError('maxlength')).toBe(true);
    expect(isStepOneValid(form)).toBe(false);

    form.controls.professionalGoal.setValue('Objetivo fictício com tamanho suficiente.');
    form.controls.interestArea.setValue('');
    expect(isStepOneValid(form)).toBe(false);

    form.controls.interestArea.setValue('Atendimento');
    form.controls.targetOpportunity.setValue('');
    expect(isStepOneValid(form)).toBe(false);
  });

  it('valida a etapa 2: formação obrigatória e campos curtos', () => {
    const form = createProfileForm(cloneProfile(DEMO_PROFILE));

    form.controls.educationLevel.setValue('');
    expect(isStepTwoValid(form)).toBe(false);

    form.controls.educationLevel.setValue('Ensino médio em andamento');
    form.controls.courseOrSchoolArea.setValue('');
    expect(isStepTwoValid(form)).toBe(false);

    form.controls.courseOrSchoolArea.setValue('a'.repeat(121));
    expect(isStepTwoValid(form)).toBe(false);

    form.controls.courseOrSchoolArea.setValue('Formação geral');
    form.controls.educationStatus.setValue('');
    expect(isStepTwoValid(form)).toBe(false);

    form.controls.educationStatus.setValue('Cursando');
    expect(isStepTwoValid(form)).toBe(true);
  });

  it('valida a etapa 3: exige ao menos uma competência', () => {
    const form = createProfileForm(cloneProfile(DEMO_PROFILE));

    expect(hasSelectedSkill(form)).toBe(true);

    form.controls.skills.controls.forEach((skill) => {
      skill.controls.selected.setValue(false);
    });

    expect(hasSelectedSkill(form)).toBe(false);
    expect(isStepThreeValid(form)).toBe(false);

    form.controls.skills.controls[0].controls.selected.setValue(true);
    expect(isStepThreeValid(form)).toBe(true);
  });

  it('converte apenas as seleções do formulário em perfil', () => {
    const form = createProfileForm(cloneProfile(DEMO_PROFILE));

    form.controls.professionalGoal.setValue('  Objetivo fictício revisado.  ');
    form.controls.courseOrSchoolArea.setValue('  Formação geral  ');
    form.controls.experiences.controls.forEach((experience) => {
      if (experience.controls.type.value === 'Projeto escolar') {
        experience.controls.selected.setValue(false);
      }
    });
    form.controls.skills.controls.forEach((skill) => {
      if (skill.controls.name.value !== 'Comunicação') {
        skill.controls.selected.setValue(false);
      }
    });
    form.controls.courses.push(createCourseGroup());
    form.controls.courses.controls[1].controls.name.setValue('   ');
    form.controls.courses.controls[1].controls.status.setValue('Cursando');

    const profile = toProfile(form, 'Pessoa Candidata - Exemplo');

    expect(profile.professionalGoal).toBe('Objetivo fictício revisado.');
    expect(profile.courseOrSchoolArea).toBe('Formação geral');
    expect(profile.experiences.map((experience) => experience.type)).toEqual([
      'Apoio em negócio familiar',
    ]);
    expect(profile.skills).toEqual(['Comunicação']);
    expect(profile.courses).toEqual([
      { name: 'Informática básica - curso demonstrativo', status: 'Concluído' },
    ]);
    expect(profile.displayName).toBe('Pessoa Candidata - Exemplo');
  });
});
