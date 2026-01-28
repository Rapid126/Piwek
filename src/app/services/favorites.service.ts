import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'blog_favorites';

  // Wstrzykujemy identyfikator platformy
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Bezpieczne pobieranie ulubionych
  getFavorites(): string[] {
    // Sprawdzamy, czy jesteśmy w przeglądarce
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    // Jeśli to serwer (SSR), zwracamy pustą tablicę, żeby nie wywołać błędu
    return [];
  }

  // Bezpieczne przełączanie stanu
  toggleFavorite(id: string): void {
    // Zapis ma sens tylko w przeglądarce
    if (isPlatformBrowser(this.platformId)) {
      const favorites = this.getFavorites(); // To wywołanie jest już bezpieczne (patrz wyżej)
      const index = favorites.indexOf(id);

      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(id);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
  }

  // Sprawdzanie stanu
  isFavorite(id: string): boolean {
    // getFavorites obsługuje sprawdzenie platformy, więc tu jest bezpiecznie
    const favorites = this.getFavorites();
    return favorites.includes(id);
  }
}