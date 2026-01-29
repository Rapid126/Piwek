import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogItemImageComponent } from "../blog-item-image/blog-item-image.component";
import { BlogItemTextComponent } from "../blog-item-text/blog-item-text.component";
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { FavoritesService } from '../../services/favorites.service';
import { RatingComponent } from '../../shared/rating/rating.component';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'blog-item',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
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
    @Input() title?: string; 
    @Input() id?: any; 
    @Input() userId?: string;
    @Input() likes: string[] = []; 

    private favoritesService = inject(FavoritesService);
    public authService = inject(AuthService);
    private dataService = inject(DataService);

   
    get isAuthor(): boolean {
        const currentUserId = this.authService.currentUser?._id || this.authService.currentUser?.id;
        return !!this.userId && !!currentUserId && String(this.userId) === String(currentUserId);
    }

   
    onLikeClick() {
        if (!this.authService.isLoggedIn()) {
            alert('Musisz być zalogowany, aby polubić ten post!');
            return;
        }


        if (this.id) {
            this.dataService.toggleLike(String(this.id)).subscribe({
                next: (updatedPost: any) => {
                    this.likes = updatedPost.likes;
                },
                error: (err) => console.error('Błąd like:', err)
            });
        }
    }

    get isLiked(): boolean {
        const currentUserId = this.authService.currentUser?._id || this.authService.currentUser?.id;
        return !!this.likes && !!currentUserId && this.likes.includes(String(currentUserId));
    }

    get likesCount(): number {
        return this.likes ? this.likes.length : 0;
    }


    toggleFavorite() {
        if (this.id) {
            this.favoritesService.toggleFavorite(String(this.id));
        }
    }

    get isFavorite(): boolean {
        return this.id ? this.favoritesService.isFavorite(String(this.id)) : false;
    }

  
    confirmDelete() {
 
        if (this.id && confirm('Czy na pewno chcesz usunąć ten post?')) {

            this.dataService.deletePost(String(this.id)).subscribe(() => {
                window.location.reload();
            });
        }
    }
}