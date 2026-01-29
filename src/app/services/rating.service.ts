import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface RatingData {
  sum: number;      // Suma wszystkich ocen
  count: number;    // Liczba głosów
  myRating: number; // Ocena wystawiona przez tego użytkownika (0 jeśli brak)
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private readonly STORAGE_KEY = 'blog_ratings';
  private ratingsCache: { [key: string]: RatingData } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadRatings();
  }

  // Pobierz dane dla konkretnego posta
  getRating(postId: string): RatingData {
    if (!this.ratingsCache[postId]) {
      // Domyślne wartości, jeśli post nie ma jeszcze ocen
      return { sum: 0, count: 0, myRating: 0 };
    }
    return this.ratingsCache[postId];
  }

  // Dodaj ocenę
  setRating(postId: string, rating: number): void {
    const data = this.getRating(postId);

    // Jeśli użytkownik już głosował, odejmujemy starą ocenę od sumy
    if (data.myRating > 0) {
      data.sum -= data.myRating;
      data.count--; // Zmniejszamy licznik, zaraz dodamy go z powrotem
    }

    // Dodajemy nową ocenę
    data.sum += rating;
    data.count++;
    data.myRating = rating;

    this.ratingsCache[postId] = data;
    this.saveRatings();
  }

  // Pomocnicza metoda do obliczania średniej (użyjemy przy sortowaniu)
  getAverage(postId: string): number {
    const data = this.getRating(postId);
    return data.count === 0 ? 0 : data.sum / data.count;
  }

  private saveRatings(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.ratingsCache));
    }
  }

  private loadRatings(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.ratingsCache = JSON.parse(stored);
      }
    }
  }
}