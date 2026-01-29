import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  
  // URL do darmowego API Open-Meteo (ustawione na Warszawę: lat=52.23, long=21.01)
  // Możesz zmienić współrzędne na swoje miasto
  private apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true';

  getWeather(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}