import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Dodano dla routerLink
import { BlogItemImageComponent } from "../blog-item-image/blog-item-image.component";
import { BlogItemTextComponent } from "../blog-item-text/blog-item-text.component";
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { FavoritesService } from '../../services/favorites.service';
import { RatingComponent } from '../../shared/rating/rating.component';
import { AuthService } from '../../services/auth.service'; // <--- DODANO
import { DataService } from '../../services/data.service'; // <--- DODANO

@Component({
    selector: 'blog-item',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule, // <--- DODANO
        BlogItemImageComponent, 
        BlogItemTextComponent, 
        CommentsSectionComponent,
        RatingComponent
    ],
    templateUrl: './blog-item.component.html',
    styleUrl: './blog-item.component.scss'
})
export class BlogItemComponent {
    @Input() image?: string;
    @Input() text?: string;
    @Input() id?: any;
    @Input() userId?: string; // <--- DODANO: Przekazane ID autora z bazy

    private favoritesService = inject(FavoritesService);
    public authService = inject(AuthService); // <--- DODANO
    private dataService = inject(DataService); // <--- DODANO

    // Getter sprawdzający czy zalogowany to autor posta
    get isAuthor(): boolean {
    // 1. Pobieramy Twoje ID z serwisu (używając _id z podkreślnikiem!)
    const currentUserId = this.authService.currentUser?._id;
    
    // 2. Pobieramy ID autora posta
    const postAuthorId = this.userId;

    // Logi dla Ciebie - sprawdź je w konsoli przeglądarki (F12)
    // console.log('JA:', currentUserId);
    // console.log('AUTOR POSTA:', postAuthorId);

    if (!currentUserId || !postAuthorId) return false;

    // 3. Porównujemy oba ID
    return String(currentUserId) === String(postAuthorId);
}
    confirmDelete() {
        if (confirm('Czy na pewno chcesz usunąć ten post?')) {
            this.dataService.deletePost(this.id).subscribe(() => {
                window.location.reload(); // Odświeżenie po usunięciu
            });
        }
    }
}