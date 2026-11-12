import { Injectable } from '@angular/core';

import { InterviewQuestion } from '../models/interview-question.model';
import { INTERVIEW_QUESTIONS } from '../constants/interview-questions';

/**
 * Acesso somente de leitura ao roteiro predefinido de entrevista.
 * Não avalia respostas, não grava áudio e não calcula pontuações.
 */
@Injectable({ providedIn: 'root' })
export class InterviewDemoService {
  readonly questions: readonly InterviewQuestion[] = INTERVIEW_QUESTIONS;

  findById(id: string): InterviewQuestion | undefined {
    return this.questions.find((question) => question.id === id);
  }

  nextId(id: string): string | null {
    const index = this.questions.findIndex((question) => question.id === id);
    if (index < 0 || index >= this.questions.length - 1) {
      return null;
    }
    return this.questions[index + 1].id;
  }

  previousId(id: string): string | null {
    const index = this.questions.findIndex((question) => question.id === id);
    if (index <= 0) {
      return null;
    }
    return this.questions[index - 1].id;
  }
}
