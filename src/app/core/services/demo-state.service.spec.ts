import { TestBed } from '@angular/core/testing';

import { DEMO_PROFILE } from '../constants/demo-data';
import { CandidateProfile } from '../models/candidate-profile.model';
import { DemoStateService, cloneProfile } from './demo-state.service';

function modifiedProfile(): CandidateProfile {
  const profile = cloneProfile(DEMO_PROFILE);
  profile.professionalGoal = 'Objetivo alterado apenas para um teste local.';
  profile.skills = ['Comunicação'];
  return profile;
}

describe('DemoStateService', () => {
  let service: DemoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoStateService);
  });

  it('inicia com uma cópia do perfil fictício, sem compartilhar referências', () => {
    expect(service.profile()).toEqual(DEMO_PROFILE);
    expect(service.profile()).not.toBe(DEMO_PROFILE);
    expect(service.profile().experiences).not.toBe(DEMO_PROFILE.experiences);
    expect(service.currentStep()).toBe(0);
    expect(service.reviewedCount()).toBe(0);
    expect(service.resumeGenerated()).toBe(false);
  });

  it('mantém os dados em memória e restaura o perfil fictício no reinício', () => {
    service.updateProfile(modifiedProfile());
    service.setStep(2);
    service.setQuestionReviewed('strengths', true);
    service.markResumeGenerated();

    expect(service.profile().professionalGoal).toBe(
      'Objetivo alterado apenas para um teste local.',
    );
    expect(service.reviewedCount()).toBe(1);

    service.resetDemo();

    expect(service.profile()).toEqual(DEMO_PROFILE);
    expect(service.currentStep()).toBe(0);
    expect(service.reviewedCount()).toBe(0);
    expect(service.resumeGenerated()).toBe(false);
  });

  it('não usa armazenamento do navegador', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    service.updateProfile(modifiedProfile());
    service.setQuestionReviewed('teamwork', true);
    service.markResumeGenerated();
    service.resetDemo();

    expect(setItemSpy).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    expect(document.cookie).toBe('');

    setItemSpy.mockRestore();
  });

  it('marca e desmarca perguntas revisadas de forma imutável', () => {
    const initialSet = service.reviewedQuestionIds();

    service.setQuestionReviewed('learning', true);
    expect(service.isQuestionReviewed('learning')).toBe(true);
    expect(service.reviewedQuestionIds()).not.toBe(initialSet);

    service.setQuestionReviewed('learning', false);
    expect(service.isQuestionReviewed('learning')).toBe(false);

    service.setQuestionReviewed('strengths', true);
    service.resetInterviewProgress();
    expect(service.reviewedCount()).toBe(0);
  });

  it('expõe o currículo montado a partir do estado atual', () => {
    expect(service.resume().displayName).toBe(DEMO_PROFILE.displayName);
    expect(service.resume().visibleSections.map((section) => section.id)).toEqual([
      'goal',
      'education',
      'experiences',
      'courses',
      'skills',
    ]);

    service.updateProfile(modifiedProfile());
    expect(service.resume().skills).toEqual(['Comunicação']);
  });
});
