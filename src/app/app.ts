import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { CurrentForecast } from "./components/current-forecast/current-forecast";
import { DailyForecast } from "./components/daily-forecast/daily-forecast";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { Location } from './services/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header, Footer, CurrentForecast, DailyForecast, HourlyForecast]
})
export class App implements OnInit {
  private locationService = inject(Location);
  protected readonly title = signal('weather-forecast-app');

  async ngOnInit() {
    const location = await this.locationService.getCurrentLocation();
    console.log(location)
  }
}
