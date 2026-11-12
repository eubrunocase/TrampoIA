import { computed, inject, Injectable, signal } from '@angular/core';

import { CandidateProfile } from '../models/candidate-profile.model';
import { DEMO_PROFILE } from '../constants/demo-data';
import { SimulatedResumeService } from './simulated-resume.service';

export function cloneProfile(profile: CandidateProfile): CandidateProfile {
  return JSON.parse(JSON.stringify(profile)) as CandidateProfile;
}

/**
 * Estado exclusivamente em memória. Nada é gravado em localStorage,
 * sessionStorage, cookies, IndexedDB ou servidores.
 */
@Injectable({ providedIn: 'root' })
export class DemoStateService {
  private readonly resumeService = inject(SimulatedResumeService);

  private readonly profileState = signal<CandidateProfile>(cloneProfile(DEMO_PROFILE));
  private readonly stepState = signal(0);
  private readonly reviewedState = signal<ReadonlySet<string>>(new Set());
  private readonly resumeGeneratedState = signal(false);

  readonly profile = this.profileState.asReadonly();
  readonly currentStep = this.stepState.asReadonly();
  readonly reviewedQuestionIds = this.reviewedState.asReadonly();
  readonly resumeGenerated = this.resumeGeneratedState.asReadonly();
  readonly reviewedCount = computed(() => this.reviewedState().size);
  readonly resume = computed(() => this.resumeService.buildResume(this.profileState()));

  updateProfile(profile: CandidateProfile): void {
    this.profileState.set(cloneProfile(profile));
  }

  setStep(step: number): void {
    const lastStep = 3;
    this.stepState.set(Math.min(Math.max(Math.trunc(step), 0), lastStep));
  }

  nextStep(): void {
    this.setStep(this.stepState() + 1);
  }

  previousStep(): void {
    this.setStep(this.stepState() - 1);
  }

  markResumeGenerated(): void {
    this.resumeGeneratedState.set(true);
  }

  isQuestionReviewed(id: string): boolean {
    return this.reviewedState().has(id);
  }

  setQuestionReviewed(id: string, reviewed: boolean): void {
    const next = new Set(this.reviewedState());
    if (reviewed) {
      next.add(id);
    } else {
      next.delete(id);
    }
    this.reviewedState.set(next);
  }

  resetInterviewProgress(): void {
    this.reviewedState.set(new Set());
  }

  /** Restaura os dados fictícios e limpa todo o progresso da sessão. */
  resetDemo(): void {
    this.profileState.set(cloneProfile(DEMO_PROFILE));
    this.stepState.set(0);
    this.reviewedState.set(new Set());
    this.resumeGeneratedState.set(false);
  }
}
