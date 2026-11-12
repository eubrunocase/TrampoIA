import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DemoStateService } from '../../core/services/demo-state.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { SimulationAlertComponent } from '../../shared/components/simulation-alert/simulation-alert';

@Component({
  selector: 'app-resume-preview',
  imports: [
    RouterLink,
    SimulationAlertComponent,
    ConfirmationDialogComponent,
    EmptyStateComponent,
  ],
  templateUrl: './resume-preview.html',
  styleUrl: './resume-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumePreviewPage {
  readonly state = inject(DemoStateService);

  readonly resume = this.state.resume;
  readonly showResetDialog = signal(false);
  readonly announcement = signal('');

  prepareEdit(): void {
    this.state.setStep(3);
  }

  printResume(): void {
    window.print();
  }

  requestReset(): void {
    this.showResetDialog.set(true);
  }

  cancelReset(): void {
    this.showResetDialog.set(false);
  }

  confirmReset(): void {
    this.state.resetDemo();
    this.showResetDialog.set(false);
    this.announcement.set(
      'Demonstração reiniciada. Os dados fictícios iniciais foram restaurados e o progresso da entrevista foi limpo.',
    );
  }
}
