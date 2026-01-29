import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="btn btn-outline-secondary rounded-circle" 
      (click)="toggle()"
      title="Przełącz tryb ciemny/jasny">
      
      <i class="fa" 
         [ngClass]="(isDarkMode$ | async) ? 'fa-sun-o' : 'fa-moon-o'">
      </i>
    </button>
  `,
  styles: [`
    button {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    button:hover {
      background-color: var(--border-color);
      color: var(--text-color);
    }
  `]
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  
  // Publiczny strumień do użycia w HTML z pipe 'async'
  isDarkMode$ = this.themeService.darkMode$;

  toggle() {
    this.themeService.toggleTheme();
  }
}