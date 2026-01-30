import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state-service';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-hourly-forecast',
  imports: [
    Loader
  ],
  templateUrl: './hourly-forecast.html',
  styleUrl: './hourly-forecast.scss',
})
export class HourlyForecast {
  stateService = inject(StateService)
}
