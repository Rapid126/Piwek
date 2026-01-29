import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
// Importujemy Reactive Forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ReactiveFormsModule tu musi być!
  templateUrl: './add-post-component.component.html',
  styleUrl: './add-post-component.component.scss'
})
export class AddPostComponent {
  private dataService = inject(DataService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Inicjalizacja formularza z walidacją
  public postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    text: ['', [Validators.required, Validators.minLength(10)]],
    image: [''] // Opcjonalne
  });

  // Getter dla łatwego dostępu do błędów w HTML
  get f() { return this.postForm.controls; }

  savePost() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched(); // Podświetl błędy jeśli ktoś klika "na siłę"
      return;
    }

    console.log('--- [DEBUG] Dane wysyłane do serwera: ---', this.postForm.value);

    this.dataService.addPost(this.postForm.value).subscribe({
      next: (result: any) => {
        console.log('Post dodany pomyślnie:', result);
        this.router.navigate(['/blog']);
      },
      error: (err: any) => {
        console.error('Błąd podczas dodawania posta:', err);
        alert('Nie udało się dodać posta. Upewnij się, że jesteś zalogowany.');
      }
    });
  }
}