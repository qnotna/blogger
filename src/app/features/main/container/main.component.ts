import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogId: string;

  constructor(private service: MainService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.blogs$ = this.service.getBlogs();
  }

  onBlogChange(selectedBlogId: string): void {
    this.blogId = selectedBlogId;
    this.service.handleBlogChange(selectedBlogId);
  }

  onSearchPost(query: string): void {
    this.service.handleSearch(this.blogId, query);
  }

  onLogout(): void {
    this.authService.handleAuth();
  }

}
