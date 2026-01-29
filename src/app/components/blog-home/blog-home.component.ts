import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";
import { BlogComponent } from "../blog/blog.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, BlogComponent],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss'
})
export class BlogHomeComponent implements OnInit {
  public filterText: string = '';
  public currentPage: number = 1;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild(BlogComponent) blogComponent!: BlogComponent;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const pageFromUrl = params['page'] ? Number(params['page']) : 1;
      
      if (!isNaN(pageFromUrl)) {
        this.currentPage = pageFromUrl;
      }
    });
  }

  getName($event: string): void {
    if (this.filterText !== $event) {
      this.filterText = $event;
      this.resetPage();
    }
  }

  refreshPosts(): void {
    if (this.blogComponent) {
        this.blogComponent.getAll();
    }
    this.filterText = '';
    this.resetPage();
  }

  // NOWA METODA WYWOŁYWANA PRZEZ PRZYCISK
  sortPosts(): void {
    if (this.blogComponent) {
      this.blogComponent.sortByRating();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private resetPage(): void {
    this.currentPage = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
  }
}