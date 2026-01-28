import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service'; // Upewnij się co do ścieżki
import { FavoritesService } from '../../services/favorites.service';
import { BlogItemComponent } from '../blog-item/blog-item.component'; // Upewnij się co do ścieżki

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, BlogItemComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  // Wstrzykiwanie serwisów
  private dataService = inject(DataService);
  private favoritesService = inject(FavoritesService);

  public favoritePosts: any[] = [];

  ngOnInit(): void {
    // 1. Pobieramy wszystkie posty (zakładam, że getAll zwraca Observable)
    this.dataService.getAll().subscribe((posts: any[]) => {
      
      // 2. Filtrujemy listę, zostawiając tylko te, które są ulubione
      this.favoritePosts = posts.filter(post => 
        this.favoritesService.isFavorite(String(post.id))
      );
      
    });
  }
}