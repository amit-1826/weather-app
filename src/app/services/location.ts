import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { defer, from, Observable, of, tap } from 'rxjs';
import { Backend } from './backend';

@Injectable({
  providedIn: 'root',
})
export class Location {
  private http = inject(HttpClient);
  private backendService = inject(Backend);

  getGeoLocation$(): Observable<GeolocationPosition> {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject('Geolocation not supported');
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 0
          }
        );
      })
    );
  }

  getLocationFromIP$(): Observable<any> {
    return this.http.get('https://ipapi.co/json/');
  }

  reverseGeocode$(lat: number, lon: number): Observable<any> {
    return defer(() => {
      const cacheKey = this.getCacheKey(lat, lon);
      const cached = localStorage.getItem(cacheKey);

      // ✅ Cache hit
      if (cached) {
        return of(JSON.parse(cached));
      }

      // ❌ Cache miss → backend call
      return this.backendService.getGeoCode(lat, lon)
        .pipe(
          tap(response => {
            localStorage.setItem(cacheKey, JSON.stringify(response));
          })
        );
    });
  }

  private getCacheKey(lat: number, lon: number): string {
    return `reverse_geocode_${lat.toFixed(5)}_${lon.toFixed(5)}`;
  }
}
