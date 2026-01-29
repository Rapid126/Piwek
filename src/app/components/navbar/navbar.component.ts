import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Warto dodać

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss' // <-- Zmiana na SCSS
})
export class NavbarComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  signOut() {
    this.authService.logout().subscribe({
      next: () => {
        // Po wylogowaniu wróć na główną
        this.router.navigate(['/']);
      }
    });
  }
}