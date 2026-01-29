import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService, RatingData } from '../../services/rating.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss' // upewnij się, że plik scss istnieje, nawet pusty
})
export class RatingComponent implements OnInit {
  @Input() postId!: string;
  @Input() readonly: boolean = false; // np. true na liście, false w szczegółach

  private ratingService = inject(RatingService);

  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0;
  
  // Dane do wyświetlenia
  currentRating: number = 0; // Ocena użytkownika (dla koloru gwiazdek)
  averageRating: number = 0; // Średnia
  votesCount: number = 0;    // Liczba głosów

  ngOnInit(): void {
    this.refreshData();
  }

  onStarHover(rating: number): void {
    if (!this.readonly) {
      this.hoverRating = rating;
    }
  }

  onStarLeave(): void {
    this.hoverRating = 0;
  }

  onStarClick(rating: number): void {
    if (!this.readonly) {
      this.ratingService.setRating(this.postId, rating);
      this.refreshData();
    }
  }

  private refreshData(): void {
    if (this.postId) {
      const data: RatingData = this.ratingService.getRating(this.postId);
      this.currentRating = data.myRating;
      this.votesCount = data.count;
      this.averageRating = data.count > 0 ? data.sum / data.count : 0;
    }
  }
}