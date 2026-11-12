import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SimulationAlertComponent } from '../../shared/components/simulation-alert/simulation-alert';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SimulationAlertComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
