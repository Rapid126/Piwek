import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './edit-post.component.html'
})
export class EditPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);

  public postId: string = '';
  
  public editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    text: ['', [Validators.required, Validators.minLength(10)]],
    image: [''] 
  });

  get f() { return this.editForm.controls; }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    if (this.postId) {
      this.dataService.getById(this.postId).subscribe((res: any) => {
        this.editForm.patchValue({
          title: res.title,
          text: res.text,
          image: res.image
        });
      });
    }
  }

  updatePost(): void {
    if (this.editForm.invalid) return;


    this.dataService.updatePost(this.postId, this.editForm.value).subscribe(() => {
      this.router.navigate(['/blog']);
    });
  }
}