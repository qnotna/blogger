import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/posts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  posts$: Observable<Post[]>;
  blogId: string;

  constructor(
    private api: ApiWebService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.blogs$ = this.api.getBlogsByUser();
  }

  fetchBlogs() {
    this.blogs$ = this.api.getBlogsByUser();
  }

  onBlogChange(selectedBlogId: string) {
    this.blogId = selectedBlogId;
    this.router.navigate([`home/blogs/${selectedBlogId}/posts`]);
  }

  logout() {
    this.authService.handleAuth();
  }


}
