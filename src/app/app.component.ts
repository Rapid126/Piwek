import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { NavbarComponent } from './components/navbar/navbar.component'; // <--- 1. NOWY IMPORT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent // <--- 2. DODAJEMY KOMPONENT DO TABLICY
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog';

  // To zostawiamy - inicjalizuje Twój motyw (Ciemny/Jasny) przy starcie
  private themeService = inject(ThemeService);
}