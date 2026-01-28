import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../../services/data.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [CommonModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.scss'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';

  constructor(private service: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.service.getById(id).subscribe((res: any) => {
        this.image = res.image;
        this.text = res.text;
      });
    });
  }
}