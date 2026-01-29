import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-post-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-post-component.component.html',
  styleUrl: './add-post-component.component.scss'
})
export class AddPostComponent {
  // To rozwiązuje błąd: Property 'title' does not exist
  post = {
    title: '', 
    text: '',
    image: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  // To rozwiązuje błąd: Property 'savePost' does not exist
  savePost() {
    console.log('--- [DEBUG] Dane wysyłane do serwera: ---', this.post);

    this.dataService.addPost(this.post).subscribe({
      next: (result: any) => {
        console.log('Post dodany pomyślnie:', result);
        this.router.navigate(['/blog']);
      },
      error: (err: any) => {
        console.error('Błąd podczas dodawania posta:', err);
        alert('Nie udało się dodać posta. Sprawdź czy wypełniłeś wszystkie pola.');
      }
    });
  }
}