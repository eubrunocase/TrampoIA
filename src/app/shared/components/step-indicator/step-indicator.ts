import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  templateUrl: './step-indicator.html',
  styleUrl: './step-indicator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepIndicatorComponent {
  readonly steps = input.required<readonly string[]>();
  readonly current = input.required<number>();
}
