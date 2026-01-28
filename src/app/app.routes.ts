import { Routes } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details.component';
import { BlogGalleryComponent } from './components/blog-gallery-component/blog-gallery-component.component';
// Import nowego komponentu (upewnij się, że ścieżka jest poprawna po jego utworzeniu)
import { FavoritesComponent } from './components/favorites/favorites.component'; 

export const routes: Routes = [
    { path: '', component: BlogHomeComponent },

    { path: 'blog/detail/:id', component: BlogItemDetailsComponent },

    { path: 'gallery', component: BlogGalleryComponent },

    // Nowa ścieżka dla ulubionych
    { path: 'favorites', component: FavoritesComponent },
];