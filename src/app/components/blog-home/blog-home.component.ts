import { Component, ViewChild } from '@angular/core';
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";
import { BlogComponent } from "../blog/blog.component";

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [SearchBarComponent, BlogComponent],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss'
})
export class BlogHomeComponent {
  public filterText: string = '';

  @ViewChild(BlogComponent) blogComponent!: BlogComponent;

  getName($event: string): void {
    this.filterText = $event;
  }

  refreshPosts(): void {
    this.blogComponent.getAll();
    this.filterText = '';
  }
}