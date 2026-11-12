import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simulation-alert',
  imports: [RouterLink],
  templateUrl: './simulation-alert.html',
  styleUrl: './simulation-alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimulationAlertComponent {
  readonly compact = input(false);
}
