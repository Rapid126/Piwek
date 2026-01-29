import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './add-post-component.component.html',
  styleUrl: './add-post-component.component.scss'
})
export class AddPostComponent {
  private dataService = inject(DataService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

 
  public postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    text: ['', [Validators.required, Validators.minLength(10)]],
    image: [''] 
  });

  get f() { return this.postForm.controls; }

  savePost() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched(); 
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