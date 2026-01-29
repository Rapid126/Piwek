import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service'; 
import { FavoritesService } from '../../services/favorites.service';
import { BlogItemComponent } from '../blog-item/blog-item.component'; 

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
    this.dataService.getAll().subscribe((posts: any[]) => {
      
      this.favoritePosts = posts.filter(post => 
        this.favoritesService.isFavorite(String(post.id))
      );
      
    });
  }
}