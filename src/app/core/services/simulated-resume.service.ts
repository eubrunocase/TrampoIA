import { Injectable } from '@angular/core';

import {
  CandidateProfile,
  ExperienceType,
} from '../models/candidate-profile.model';
import {
  ResumeCourse,
  ResumeExperience,
  ResumeSection,
  ResumeViewModel,
} from '../models/resume.model';
import { EXPERIENCE_DESCRIPTIONS } from '../constants/demo-data';

/**
 * Monta o currículo demonstrativo com regras locais e determinísticas.
 * Não há IA, chamada de rede, inferência de cargos ou criação de métricas.
 */
@Injectable({ providedIn: 'root' })
export class SimulatedResumeService {
  buildResume(profile: CandidateProfile): ResumeViewModel {
    const professionalGoal = profile.professionalGoal.trim();

    const educationLines: string[] = [];
    if (profile.educationLevel) {
      educationLines.push(profile.educationLevel);
    }
    if (profile.courseOrSchoolArea.trim()) {
      educationLines.push(`Área de formação: ${profile.courseOrSchoolArea.trim()}`);
    }
    if (profile.educationStatus) {
      educationLines.push(`Situação: ${profile.educationStatus}`);
    }
    if (profile.expectedCompletion.trim()) {
      educationLines.push(`Conclusão: ${profile.expectedCompletion.trim()}`);
    }

    const experiences: ResumeExperience[] = profile.experiences
      .filter((experience) => experience.type)
      .map((experience) => ({
        title: experience.type,
        description: this.descriptionFor(experience.type),
        sourceNote: experience.description.trim(),
      }));

    const courses: ResumeCourse[] = profile.courses
      .filter((course) => course.name.trim())
      .map((course) => ({
        name: course.name.trim(),
        status: course.status,
      }));

    const skills = profile.skills.filter((skill) => skill.trim());

    const visibleSections: ResumeSection[] = [];
    if (professionalGoal) {
      visibleSections.push({ id: 'goal', title: 'Objetivo profissional' });
    }
    if (educationLines.length > 0) {
      visibleSections.push({ id: 'education', title: 'Formação' });
    }
    if (experiences.length > 0) {
      visibleSections.push({ id: 'experiences', title: 'Experiências e vivências' });
    }
    if (courses.length > 0) {
      visibleSections.push({ id: 'courses', title: 'Cursos e oficinas' });
    }
    if (skills.length > 0) {
      visibleSections.push({ id: 'skills', title: 'Competências' });
    }

    return {
      displayName: profile.displayName,
      targetOpportunity: profile.targetOpportunity,
      interestArea: profile.interestArea,
      professionalGoal,
      educationLines,
      experiences,
      courses,
      skills,
      visibleSections,
    };
  }

  /**
   * Escolhe uma descrição local a partir do tipo da vivência.
   * O índice é sempre o mesmo para o mesmo tipo, o que torna o resultado
   * previsível e reproduzível.
   */
  descriptionFor(type: ExperienceType): string {
    const options = EXPERIENCE_DESCRIPTIONS[type];
    const index =
      Array.from(type).reduce((total, character) => total + character.charCodeAt(0), 0) %
      options.length;
    return options[index];
  }
}
