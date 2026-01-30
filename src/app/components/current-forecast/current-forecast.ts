import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Current } from '../../models/weather.model';
import { StateService } from '../../services/state-service';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-current-forecast',
  imports: [
    DatePipe,
    DecimalPipe,
    Loader
  ],
  templateUrl: './current-forecast.html',
  styleUrl: './current-forecast.scss',
})
export class CurrentForecast {
  stateService = inject(StateService);
  currentForecast = input.required<Current | undefined>();
  userAddress = input.required<{ city: string; country: string } | null>();
  dateToday: Date = new Date();
}
