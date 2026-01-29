import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [
    CommonModule, 
    BlogItemComponent, 
    FilterTextPipe, 
    PaginatePipe,       
    PaginationComponent 
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private dataService = inject(DataService);
  private ratingService = inject(RatingService);
  
  items$: any[] = [];

  @Input() filterText: string = '';
  @Input() currentPage: number = 1; 
  @Output() pageChange = new EventEmitter<number>();
  
  public itemsPerPage = 4;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.dataService.getAll().subscribe(response => {
        this.items$ = response as any[];
    });
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  sortByRating(): void {
    if (this.items$ && this.items$.length > 0) {
      console.log('Rozpoczynam sortowanie...'); 


      const sortedItems = [...this.items$].sort((a, b) => {
        const rateA = this.ratingService.getAverage(a._id);
        const rateB = this.ratingService.getAverage(b._id);
        

        return rateB - rateA;
      });

      this.items$ = sortedItems; 
      
  
      this.pageChange.emit(1);
    }
  }
}