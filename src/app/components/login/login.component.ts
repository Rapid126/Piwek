import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Warto dodać dla pewności

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss' // Upewnij się, że masz tu scss (zgodnie z projektem)
})
export class LoginComponent {
  credentials = {
    login: '',
    password: ''
  };
  loginError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signIn() {
    this.loginError = false;
    this.authService.authenticate(this.credentials).subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.loginError = true;
        }
      },
      error: () => {
        this.loginError = true;
      }
    });
  }
}