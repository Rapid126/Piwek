import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogItemImageComponent } from "../blog-item-image/blog-item-image.component";
import { BlogItemTextComponent } from "../blog-item-text/blog-item-text.component";
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { FavoritesService } from '../../services/favorites.service';
import { RatingComponent } from '../../shared/rating/rating.component'; // <--- NOWY IMPORT

@Component({
    selector: 'blog-item',
    standalone: true,
    imports: [
        CommonModule,
        BlogItemImageComponent, 
        BlogItemTextComponent, 
        CommentsSectionComponent,
        RatingComponent // <--- DODANO TUTAJ
    ],
    templateUrl: './blog-item.component.html',
    styleUrl: './blog-item.component.scss'
})
export class BlogItemComponent {
    @Input() image?: string;
    @Input() text?: string;
    @Input() id?: any;

    private favoritesService = inject(FavoritesService);

    toggleFavorite() {
        if (this.id) {
            this.favoritesService.toggleFavorite(String(this.id));
        }
    }

    get isFavorite(): boolean {
        return this.id ? this.favoritesService.isFavorite(String(this.id)) : false;
    }
}