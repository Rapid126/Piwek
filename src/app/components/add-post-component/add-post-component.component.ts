import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post-component.component.html',
  styleUrl: './add-post-component.component.scss'
})
export class AddPostComponent {
  public post = {
    image: '',
    text: ''
  };

  constructor(private service: DataService) { }

  submitPost() {
    if (this.post.text && this.post.image) {
      this.service.addPost({ ...this.post });
      this.post = { image: '', text: '' };
      alert('Post dodany!');
    } else {
      alert('Wypełnij wszystkie pola!');
    }
  }
}