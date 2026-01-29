import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  
  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
  });

  get f() { return this.signupForm.controls; }

  create() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); 
      return;
    }

    this.authService.createOrUpdate(this.signupForm.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        console.error('Błąd rejestracji:', err);
        alert('Nie udało się utworzyć konta. Spróbuj inny email.');
      }
    });
  }
}