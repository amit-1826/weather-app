import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAddress } from '../models/address.model';
import { IWeather } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class Backend {
  backendUrl = 'http://72.61.242.106:4000';

  httpClient = inject(HttpClient);

  getGeoCode(lat: number, lng: number): Observable<IAddress> {
    return this.httpClient.get<{ address: IAddress }>(
      `${this.backendUrl}/reverse-geo?lat=${lat}&lng=${lng}`
    ).pipe(
      map(res => {
        console.log('Reverse geocode response from backend:', res);
        return res.address
      })
    )
  }

  getWeather(lat: number, lon: number): Observable<IWeather> {
    return this.httpClient.get<IWeather>(
      `${this.backendUrl}/weather?lat=${lat}&lng=${lon}`
    );
  }
}
