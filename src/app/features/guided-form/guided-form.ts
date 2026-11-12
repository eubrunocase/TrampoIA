import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  COURSE_STATUSES,
  EDUCATION_LEVELS,
  EDUCATION_STATUSES,
  EXPERIENCE_PLACEHOLDERS,
  EXPERIENCE_TYPES,
  INTEREST_AREAS,
  MAX_LONG_TEXT,
  MAX_SHORT_TEXT,
  PROFESSIONAL_GOAL_EXAMPLE,
  TARGET_OPPORTUNITIES,
  TARGET_OPPORTUNITY_HINTS,
} from '../../core/constants/demo-data';
import { DemoStateService } from '../../core/services/demo-state.service';
import { SimulationAlertComponent } from '../../shared/components/simulation-alert/simulation-alert';
import { StepIndicatorComponent } from '../../shared/components/step-indicator/step-indicator';
import {
  createCourseGroup,
  createProfileForm,
  hasSelectedSkill,
  isStepOneValid,
  isStepTwoValid,
  isStepThreeValid,
  isStepValid,
  selectedExperienceValue,
  selectedSkillValue,
  toProfile,
} from './guided-form.form';

const STEP_LABELS = ['Objetivo', 'Formação', 'Vivências', 'Revisão'] as const;

@Component({
  selector: 'app-guided-form',
  imports: [ReactiveFormsModule, SimulationAlertComponent, StepIndicatorComponent],
  templateUrl: './guided-form.html',
  styleUrl: './guided-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidedFormPage {
  private readonly state = inject(DemoStateService);
  private readonly router = inject(Router);

  readonly stepLabels = STEP_LABELS;
  readonly maxLongText = MAX_LONG_TEXT;
  readonly maxShortText = MAX_SHORT_TEXT;
  readonly targetOpportunities = TARGET_OPPORTUNITIES;
  readonly targetOpportunityHints = TARGET_OPPORTUNITY_HINTS;
  readonly interestAreas = INTEREST_AREAS;
  readonly educationLevels = EDUCATION_LEVELS;
  readonly educationStatuses = EDUCATION_STATUSES;
  readonly courseStatuses = COURSE_STATUSES;
  readonly experienceTypes = EXPERIENCE_TYPES;
  readonly experiencePlaceholders = EXPERIENCE_PLACEHOLDERS;
  readonly goalExample = PROFESSIONAL_GOAL_EXAMPLE;
  readonly currentStep = this.state.currentStep;
  readonly showErrors = signal(false);

  readonly form = createProfileForm(this.state.profile());

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.syncToState());
  }

  goNext(): void {
    if (!isStepValid(this.form, this.currentStep())) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      return;
    }
    this.syncToState();
    this.showErrors.set(false);
    this.state.nextStep();
    this.focusStepHeading();
  }

  goBack(): void {
    this.showErrors.set(false);
    this.syncToState();
    this.state.previousStep();
    this.focusStepHeading();
  }

  goToStep(step: number): void {
    this.showErrors.set(false);
    this.syncToState();
    this.state.setStep(step);
    this.focusStepHeading();
  }

  generate(): void {
    const invalidStep = this.firstInvalidStep();
    if (invalidStep !== null) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      if (invalidStep !== this.currentStep()) {
        this.state.setStep(invalidStep);
        this.focusStepHeading();
      }
      return;
    }

    this.syncToState();
    this.state.markResumeGenerated();
    void this.router.navigate(['/curriculo/visualizar']);
  }

  addCourse(): void {
    this.form.controls.courses.push(createCourseGroup());
  }

  removeCourse(index: number): void {
    this.form.controls.courses.removeAt(index);
  }

  hasAnySkill(): boolean {
    return hasSelectedSkill(this.form);
  }

  selectedExperiences(): { type: string; description: string }[] {
    return selectedExperienceValue(this.form);
  }

  selectedSkills(): string[] {
    return selectedSkillValue(this.form);
  }

  courseNames(): string[] {
    return this.form.controls.courses.controls
      .filter((course) => course.controls.name.value.trim())
      .map((course) => course.controls.name.value.trim());
  }

  textLength(value: string): number {
    return value.length;
  }

  private firstInvalidStep(): number | null {
    if (!isStepOneValid(this.form)) {
      return 0;
    }
    if (!isStepTwoValid(this.form)) {
      return 1;
    }
    if (!isStepThreeValid(this.form)) {
      return 2;
    }
    if (!this.form.controls.fictionalDataConfirmed.valid) {
      return 3;
    }
    return null;
  }

  private syncToState(): void {
    this.state.updateProfile(toProfile(this.form, this.state.profile().displayName));
  }

  private focusStepHeading(): void {
    setTimeout(() => {
      document.getElementById('step-heading')?.focus();
    }, 0);
  }
}
