import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogs: Blog[];

  constructor(private api: ApiWebService, private authService: AuthService) {}

  ngOnInit() {
    // this.api.getBlogsByUser().subscribe((res: Blog[]) => {
    //   console.log(res);
    //   this.blogs = res;
    // });

    this.blogs$ = this.api.getBlogsByUser();
  }

  fetchBlogs() {
    this.blogs$ = this.api.getBlogsByUser();
  }

  onBlogChange(selectedBlogId: string) {
    console.log(selectedBlogId);
  }

  logout() {
    this.authService.handleAuth();
  }
}
