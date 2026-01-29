import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog-home/blog-home.component').then(m => m.BlogHomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'blog/detail/:id',
    loadComponent: () => import('./components/blog-item-details/blog-item-details.component').then(m => m.BlogItemDetailsComponent)
  },
  {
    path: 'add-post',
    loadComponent: () => import('./components/add-post-component/add-post-component.component').then(m => m.AddPostComponent),
    canActivate: [authGuard]
  },

  {
    path: 'edit-post/:id', 
    loadComponent: () => import('./components/edit-post/edit-post.component').then(m => m.EditPostComponent),
    canActivate: [authGuard] 
  },
  {
    path: 'favorites',
    loadComponent: () => import('./components/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./components/blog-gallery-component/blog-gallery-component.component').then(m => m.BlogGalleryComponent)
  }
];