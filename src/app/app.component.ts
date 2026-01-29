import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme.service'; // Import serwisu
import { ThemeToggleComponent } from './shared/theme-toggle/theme-toggle.component'; // Import komponentu przełącznika

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    ThemeToggleComponent // Dodaj do importów
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog';

  // Wstrzyknięcie serwisu inicjalizuje go (sprawdza preferencje systemowe/localStorage)
  private themeService = inject(ThemeService);
}