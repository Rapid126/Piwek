import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-post.component.html'
})
export class EditPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  public postId: string = '';
  public post = { title: '', text: '', image: '' };

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    if (this.postId) {
      this.dataService.getById(this.postId).subscribe((res: any) => {
        this.post = {
          title: res.title,
          text: res.text,
          image: res.image
        };
      });
    }
  }

  updatePost(): void {
    this.dataService.updatePost(this.postId, this.post).subscribe(() => {
      this.router.navigate(['/blog']);
    });
  }
}