import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state-service';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-daily-forecast',
  imports: [
    Loader
  ],
  templateUrl: './daily-forecast.html',
  styleUrl: './daily-forecast.scss',
})
export class DailyForecast {
  stateService = inject(StateService)
}
