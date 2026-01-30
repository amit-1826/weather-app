import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { CurrentForecast } from "./components/current-forecast/current-forecast";
import { DailyForecast } from "./components/daily-forecast/daily-forecast";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { Location } from './services/location';
import { Backend } from './services/backend';
import { map, catchError, switchMap } from 'rxjs';
import { IWeather } from './models/weather.model';
import { StateService } from './services/state-service';
import { Error } from './components/error/error';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header, Footer, Error, CurrentForecast, DailyForecast, HourlyForecast]
})
export class App implements OnInit {
  private locationService = inject(Location);
  private backendService = inject(Backend);
  private stateService = inject(StateService);

  hasError = signal(false);
  weatherData = signal<IWeather | null>(null);
  userAddress = signal<{ city: string; country: string } | null>(null);
  private userCoords: { lat: number; lon: number } | null = null;

  ngOnInit() {
    this.stateService.isLoading.set(true);
    this.locationService.getLocationFromIP$()
      .subscribe({
        next: (response) => {
          const { city, country_name, latitude, longitude } = response;
          this.userAddress.set({ city, country: country_name });
          this.userCoords = {
            lat: latitude,
            lon: longitude
          };
          this.getWeather();
          this.stateService.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true)
          this.stateService.isLoading.set(false);
        }
      });
  }

  detectLocation() {
    this.hasError.set(false)
    this.stateService.isLoading.set(true);
    this.locationService.getGeoLocation$().pipe(

      // GPS success → extract lat/lng
      map(pos => ({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })),

      // GPS failure → fallback to IP
      catchError(() =>
        this.locationService.getLocationFromIP$().pipe(
          map(ip => ({
            lat: ip.latitude,
            lon: ip.longitude
          }))
        )
      ),

      // Reverse geocode
      switchMap(coords => {
        this.userCoords = coords; // Store for weather fetching
        return this.locationService.reverseGeocode$(coords.lat, coords.lon)
      }),

      // Extract city & country
      map(res => {
        return {
          city:
            res.city ||
            res.town ||
            res.village ||
            res.county,
          country: res.country_name
        };
      })
    ).subscribe({
      next: location => {
        this.userAddress.set(location);
        this.getWeather();
        this.stateService.isLoading.set(false);
      },
      error: err => {
        this.hasError.set(true);
        this.stateService.isLoading.set(false);
        console.error('Location detection failed', err);
      }
    });
  }

  getWeather() {
    if (!this.userCoords) {
      console.error('User coordinates not available for weather fetching.');
      return;
    }

    this.hasError.set(false);
    this.stateService.isLoading.set(true);
    this.backendService.getWeather(this.userCoords.lat, this.userCoords.lon)
      .subscribe({
        next: (weatherData) => {
          this.weatherData.set(weatherData);
          this.stateService.isLoading.set(false);
        },
        error: err => {
          this.hasError.set(true);
          this.stateService.isLoading.set(false);
          console.error('Failed to fetch weather data', err);
        }
      });
  }


}
