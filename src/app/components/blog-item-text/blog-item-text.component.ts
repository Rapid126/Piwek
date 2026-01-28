import { Component, Input } from '@angular/core';
import { SummaryPipe } from '../../pipes/summary.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [SummaryPipe, CommonModule, RouterModule],
  templateUrl: './blog-item-text.component.html',
  styleUrl: './blog-item-text.component.scss'
})
export class BlogItemTextComponent {
  @Input() text?: string;
  @Input() id?: any;
}