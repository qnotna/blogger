import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../services/main.service';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  blogs$: Observable<Blog[]>;
  blog$: Observable<Blog>;
  blogId: string;
  routeChangeSub: Subscription;

  constructor(private service: MainService, private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.fetchBlogs();
    this.routeChangeSub = this.service.getRouteChange()
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        const blogId = urlAfterRedirects.split('/')[3];
        this.fetchBlog(blogId);
      });
  }

  fetchBlogs(): void {
    this.blogs$ = this.service.getBlogs();
  }

  fetchBlog(blogId: string): void {
    this.blog$ = this.service.getBlogById(blogId);
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

  ngOnDestroy(): void {
    this.routeChangeSub.unsubscribe();
  }

}
