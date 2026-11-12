import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DemoStateService } from '../../core/services/demo-state.service';
import { InterviewDemoService } from '../../core/services/interview-demo.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog';
import { SimulationAlertComponent } from '../../shared/components/simulation-alert/simulation-alert';

@Component({
  selector: 'app-interview-preparation',
  imports: [RouterLink, SimulationAlertComponent, ConfirmationDialogComponent],
  templateUrl: './interview-preparation.html',
  styleUrl: './interview-preparation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewPreparationPage {
  readonly state = inject(DemoStateService);
  private readonly interviewService = inject(InterviewDemoService);

  readonly questions = this.interviewService.questions;
  readonly selectedId = signal(this.questions[0].id);
  readonly detailsOpen = signal(true);
  readonly resetDialogOpen = signal(false);
  readonly announcement = signal('');

  readonly selectedQuestion = computed(
    () =>
      this.questions.find((question) => question.id === this.selectedId()) ?? this.questions[0],
  );
  readonly selectedIndex = computed(() =>
    this.questions.findIndex((question) => question.id === this.selectedId()),
  );
  readonly selectedReviewed = computed(() =>
    this.state.isQuestionReviewed(this.selectedId()),
  );
  readonly progressPercent = computed(() =>
    Math.round((this.state.reviewedCount() / this.questions.length) * 100),
  );

  isReviewed(id: string): boolean {
    return this.state.isQuestionReviewed(id);
  }

  selectQuestion(id: string): void {
    this.selectedId.set(id);
    this.detailsOpen.set(true);
    this.announcement.set('');
    this.focusQuestionHeading();
  }

  toggleDetails(): void {
    this.detailsOpen.update((isOpen) => !isOpen);
  }

  previousQuestion(): void {
    const id = this.interviewService.previousId(this.selectedId());
    if (id) {
      this.selectQuestion(id);
    }
  }

  nextQuestion(): void {
    const id = this.interviewService.nextId(this.selectedId());
    if (id) {
      this.selectQuestion(id);
    }
  }

  hasPrevious(): boolean {
    return this.selectedIndex() > 0;
  }

  hasNext(): boolean {
    return this.selectedIndex() < this.questions.length - 1;
  }

  toggleReviewed(): void {
    const reviewed = !this.state.isQuestionReviewed(this.selectedId());
    this.state.setQuestionReviewed(this.selectedId(), reviewed);
    this.announcement.set(
      reviewed
        ? 'Pergunta marcada como revisada nesta sessão. Nenhuma resposta foi avaliada ou gravada.'
        : 'Marcação de revisão removida. Nenhuma resposta foi avaliada ou gravada.',
    );
  }

  requestResetProgress(): void {
    this.resetDialogOpen.set(true);
  }

  cancelResetProgress(): void {
    this.resetDialogOpen.set(false);
  }

  confirmResetProgress(): void {
    this.state.resetInterviewProgress();
    this.resetDialogOpen.set(false);
    this.announcement.set(
      'Progresso da entrevista reiniciado. As perguntas voltaram a ficar não revisadas.',
    );
  }

  private focusQuestionHeading(): void {
    setTimeout(() => {
      document.getElementById('question-heading')?.focus();
    }, 0);
  }
}
