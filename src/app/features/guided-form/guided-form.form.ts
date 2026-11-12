import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  CandidateProfile,
  Course,
  CourseStatus,
  EducationLevel,
  EducationStatus,
  ExperienceType,
  InterestArea,
  Skill,
  TargetOpportunity,
} from '../../core/models/candidate-profile.model';
import {
  COURSE_STATUSES,
  EXPERIENCE_TYPES,
  MAX_LONG_TEXT,
  MAX_SHORT_TEXT,
  SKILLS,
} from '../../core/constants/demo-data';

export interface ExperienceFormControls {
  type: FormControl<ExperienceType>;
  selected: FormControl<boolean>;
  description: FormControl<string>;
}

export interface SkillFormControls {
  name: FormControl<Skill>;
  selected: FormControl<boolean>;
}

export interface CourseFormControls {
  name: FormControl<string>;
  status: FormControl<CourseStatus>;
}

export interface ProfileFormControls {
  targetOpportunity: FormControl<TargetOpportunity | ''>;
  interestArea: FormControl<InterestArea | ''>;
  professionalGoal: FormControl<string>;
  educationLevel: FormControl<EducationLevel | ''>;
  courseOrSchoolArea: FormControl<string>;
  educationStatus: FormControl<EducationStatus | ''>;
  expectedCompletion: FormControl<string>;
  experiences: FormArray<FormGroup<ExperienceFormControls>>;
  skills: FormArray<FormGroup<SkillFormControls>>;
  courses: FormArray<FormGroup<CourseFormControls>>;
  fictionalDataConfirmed: FormControl<boolean>;
}

export type ProfileFormGroup = FormGroup<ProfileFormControls>;

function createExperienceGroup(
  type: ExperienceType,
  profile: CandidateProfile,
): FormGroup<ExperienceFormControls> {
  const existing = profile.experiences.find((experience) => experience.type === type);
  return new FormGroup<ExperienceFormControls>({
    type: new FormControl<ExperienceType>(type, { nonNullable: true }),
    selected: new FormControl<boolean>(Boolean(existing), { nonNullable: true }),
    description: new FormControl<string>(existing?.description ?? '', {
      nonNullable: true,
      validators: [Validators.maxLength(MAX_LONG_TEXT)],
    }),
  });
}

export function createCourseGroup(course?: Course): FormGroup<CourseFormControls> {
  return new FormGroup<CourseFormControls>({
    name: new FormControl<string>(course?.name ?? '', {
      nonNullable: true,
      validators: [Validators.maxLength(MAX_SHORT_TEXT)],
    }),
    status: new FormControl<CourseStatus>(course?.status ?? 'Concluído', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}

export function createProfileForm(profile: CandidateProfile): ProfileFormGroup {
  return new FormGroup<ProfileFormControls>({
    targetOpportunity: new FormControl<TargetOpportunity | ''>(profile.targetOpportunity, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    interestArea: new FormControl<InterestArea | ''>(profile.interestArea, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    professionalGoal: new FormControl<string>(profile.professionalGoal, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(MAX_LONG_TEXT),
      ],
    }),
    educationLevel: new FormControl<EducationLevel | ''>(profile.educationLevel, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    courseOrSchoolArea: new FormControl<string>(profile.courseOrSchoolArea, {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(MAX_SHORT_TEXT)],
    }),
    educationStatus: new FormControl<EducationStatus | ''>(profile.educationStatus, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    expectedCompletion: new FormControl<string>(profile.expectedCompletion, {
      nonNullable: true,
      validators: [Validators.maxLength(60)],
    }),
    experiences: new FormArray<FormGroup<ExperienceFormControls>>(
      EXPERIENCE_TYPES.map((type) => createExperienceGroup(type, profile)),
    ),
    skills: new FormArray<FormGroup<SkillFormControls>>(
      SKILLS.map(
        (skill) =>
          new FormGroup<SkillFormControls>({
            name: new FormControl<Skill>(skill, { nonNullable: true }),
            selected: new FormControl<boolean>(profile.skills.includes(skill), {
              nonNullable: true,
            }),
          }),
      ),
    ),
    courses: new FormArray<FormGroup<CourseFormControls>>(
      profile.courses.map((course) => createCourseGroup(course)),
    ),
    fictionalDataConfirmed: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });
}

export function isStepOneValid(form: ProfileFormGroup): boolean {
  return (
    form.controls.targetOpportunity.valid &&
    form.controls.interestArea.valid &&
    form.controls.professionalGoal.valid
  );
}

export function isStepTwoValid(form: ProfileFormGroup): boolean {
  return (
    form.controls.educationLevel.valid &&
    form.controls.courseOrSchoolArea.valid &&
    form.controls.educationStatus.valid &&
    form.controls.expectedCompletion.valid &&
    form.controls.courses.valid
  );
}

export function hasSelectedSkill(form: ProfileFormGroup): boolean {
  return form.controls.skills.controls.some((skill) => skill.controls.selected.value);
}

export function isStepThreeValid(form: ProfileFormGroup): boolean {
  return form.controls.experiences.valid && hasSelectedSkill(form);
}

export function isStepFourValid(form: ProfileFormGroup): boolean {
  return isAllStepsValid(form) && form.controls.fictionalDataConfirmed.valid;
}

export function isAllStepsValid(form: ProfileFormGroup): boolean {
  return isStepOneValid(form) && isStepTwoValid(form) && isStepThreeValid(form);
}

export function isStepValid(form: ProfileFormGroup, step: number): boolean {
  switch (step) {
    case 0:
      return isStepOneValid(form);
    case 1:
      return isStepTwoValid(form);
    case 2:
      return isStepThreeValid(form);
    case 3:
      return isStepFourValid(form);
    default:
      return false;
  }
}

export function selectedExperienceValue(
  form: ProfileFormGroup,
): { type: ExperienceType; description: string }[] {
  return form.controls.experiences.controls
    .filter((experience) => experience.controls.selected.value)
    .map((experience) => ({
      type: experience.controls.type.value,
      description: experience.controls.description.value.trim(),
    }));
}

export function selectedSkillValue(form: ProfileFormGroup): Skill[] {
  return form.controls.skills.controls
    .filter((skill) => skill.controls.selected.value)
    .map((skill) => skill.controls.name.value);
}

export function toProfile(form: ProfileFormGroup, displayName: string): CandidateProfile {
  const raw = form.getRawValue();
  return {
    displayName,
    targetOpportunity: raw.targetOpportunity,
    interestArea: raw.interestArea,
    professionalGoal: raw.professionalGoal.trim(),
    educationLevel: raw.educationLevel,
    courseOrSchoolArea: raw.courseOrSchoolArea.trim(),
    educationStatus: raw.educationStatus,
    expectedCompletion: raw.expectedCompletion.trim(),
    experiences: selectedExperienceValue(form),
    skills: selectedSkillValue(form),
    courses: raw.courses
      .filter((course) => course.name.trim())
      .map((course) => ({
        name: course.name.trim(),
        status: COURSE_STATUSES.includes(course.status) ? course.status : 'Concluído',
      })),
  };
}
