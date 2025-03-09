import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { Observable, tap } from 'rxjs';

const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const CACHE_TIME = 10 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  constructor(private readonly httpClientService: HttpClient) {}
  fetchData(cityName: string) {
    const cached = this.cache.get(cityName);
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_TIME) {
      return new Observable((observer) => {
        observer.next(cached.data);
        observer.complete();
      });
    }
    return this.httpClientService
      .get(`${URL}${cityName}&APPID=${enviroment.API_KEY}&units=metric`)
      .pipe(
        tap((data: any) => {
          this.cache.set(cityName, { data, timestamp: now });
        }),
      );
  }
}
