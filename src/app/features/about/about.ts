import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SimulationAlertComponent } from '../../shared/components/simulation-alert/simulation-alert';

@Component({
  selector: 'app-about',
  imports: [RouterLink, SimulationAlertComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {}
