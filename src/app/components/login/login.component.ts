import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// Zamieniamy FormsModule na ReactiveFormsModule
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError = false;

  // Definicja zasad walidacji
  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.email]], // Walidacja formatu email
    password: ['', Validators.required]
  });

  // Getter dla łatwego dostępu do pól w HTML
  get f() { return this.loginForm.controls; }

  signIn() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginError = false;
    // Przekazujemy wartości bezpośrednio z formularza
    this.authService.authenticate(this.loginForm.value).subscribe({
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