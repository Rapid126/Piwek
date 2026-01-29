import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'blog_theme';
  // BehaviorSubject przechowuje stan i emituje go do nowych subskrybentów
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initTheme();
  }

  private initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.THEME_KEY);
      if (saved !== null) {
        // Jeśli mamy zapisane ustawienie, używamy go
        this.setDarkMode(saved === 'dark');
      } else {
        // Jeśli nie, sprawdzamy preferencje systemu operacyjnego
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setDarkMode(prefersDark);
      }
    }
  }

  toggleTheme(): void {
    this.setDarkMode(!this.darkMode.value);
  }

  private setDarkMode(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Aktualizacja stanu w serwisie
      this.darkMode.next(isDark);

      // 2. Zapis do LocalStorage
      localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');

      // 3. Manipulacja klasą na elemencie <body>
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }
}