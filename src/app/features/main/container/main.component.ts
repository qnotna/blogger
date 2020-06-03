import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/posts.model';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  posts$: Observable<Post[]>;
  blogId: string;

  constructor(private service: MainService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogs$ = this.service.getBlogs();
  }

  onBlogChange(selectedBlogId: string) {
    this.blogId = selectedBlogId;
    this.service.handleBlogChange(selectedBlogId);
  }

  onSearchPost(query: string) {
    this.service.handleSearch(this.blogId, query);
  }

  onLogout() {
    this.authService.handleAuth();
  }

}
