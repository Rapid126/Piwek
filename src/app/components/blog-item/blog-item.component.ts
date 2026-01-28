import { Component, Input, inject } from '@angular/core'; // Dodano inject
import { CommonModule } from '@angular/common'; // Dodano CommonModule
import { BlogItemImageComponent } from "../blog-item-image/blog-item-image.component";
import { BlogItemTextComponent } from "../blog-item-text/blog-item-text.component";
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { FavoritesService } from '../../services/favorites.service'; // Import serwisu

@Component({
    selector: 'blog-item',
    standalone: true,
    imports: [
        CommonModule, // Wymagane dla [ngClass]
        BlogItemImageComponent, 
        BlogItemTextComponent, 
        CommentsSectionComponent
    ],
    templateUrl: './blog-item.component.html',
    styleUrl: './blog-item.component.scss'
})
export class BlogItemComponent {
    @Input() image?: string;
    @Input() text?: string;
    @Input() id?: any;

    // Wstrzyknięcie serwisu
    private favoritesService = inject(FavoritesService);

    // Przełączanie stanu
    toggleFavorite() {
        if (this.id) {
            this.favoritesService.toggleFavorite(String(this.id));
        }
    }

    // Sprawdzanie czy polubione (dla ikony)
    get isFavorite(): boolean {
        return this.id ? this.favoritesService.isFavorite(String(this.id)) : false;
    }
}