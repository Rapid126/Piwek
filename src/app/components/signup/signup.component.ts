import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Warto dodać

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss' // <-- Zmiana na SCSS zgodnie z Twoim projektem
})
export class SignupComponent {
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  create() {
    this.authService.createOrUpdate(this.credentials).subscribe({
      next: () => {
        // Po udanej rejestracji przekieruj do logowania
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Błąd rejestracji:', err);
        alert('Wystąpił błąd podczas rejestracji. Sprawdź konsolę.');
      }
    });
  }
}