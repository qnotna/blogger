import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/api/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  blogs$: Observable<Blog[]>;

  constructor(private api: ApiWebService) { }

  ngOnInit() {
    // this.api.getBlogsByUser().subscribe((res: Blog[]) => {
    //   console.log(res);
    // });

    this.blogs$ = this.api.getBlogsByUser();
  }

  fetchBlogs() {
    this.blogs$ = this.api.getBlogsByUser();
  }
}
