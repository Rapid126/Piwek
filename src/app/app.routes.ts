import { Routes } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component'; // Upewnij się, że masz ten import

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Teraz Home jest na głównej
  { path: 'blog', component: BlogHomeComponent }, // Blog przesunięty tutaj
  { path: 'blog/detail/:id', component: BlogItemDetailsComponent },
  { path: 'favorites', component: FavoritesComponent }, // ZACHOWUJEMY TO
  // { path: 'gallery', component: GalleryComponent } // Jeśli masz galerię, też ją zostaw
];