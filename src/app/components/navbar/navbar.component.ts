import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service'; // <--- Import serwisu

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  public authService = inject(AuthService); // Używamy inject() dla spójności
  private router = inject(Router);
  private weatherService = inject(WeatherService);

  // Zmienne do pogody
  public temperature: number | null = null;
  public weatherIcon: string = 'fa-sun-o';

  ngOnInit() {
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        const code = data.current_weather.weathercode;
        this.temperature = data.current_weather.temperature;
        this.weatherIcon = this.getIcon(code);
      },
      error: (err) => console.error('Błąd pogody:', err)
    });
  }

  getIcon(code: number): string {
    if (code === 0) return 'fa-sun-o text-warning';            
    if (code >= 1 && code <= 3) return 'fa-cloud text-secondary'; 
    if (code >= 45 && code <= 48) return 'fa-align-justify text-muted'; 
    if (code >= 51 && code <= 67) return 'fa-tint text-primary';  
    if (code >= 71) return 'fa-snowflake-o text-info';      
    return 'fa-cloud';
  }

  signOut() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }
}