import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
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
  private blogId: string;
  routeChangeSub: Subscription;
  noBlogs$: BehaviorSubject<boolean>;

  constructor(private mainService: MainService, private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.fetchBlogs();
    this.noBlogs$ = this.mainService.noBlogs$;
    this.routeChangeSub = this.mainService.getRouteChange()
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        const blogId = urlAfterRedirects.split('/')[3];
        this.fetchBlog(blogId);
      });
  }

  fetchBlogs(): void {
    this.blogs$ = this.mainService.getBlogs();
  }

  fetchBlog(blogId: string): void {
    this.blog$ = this.mainService.getBlogById(blogId);
  }

  onBlogChange(selectedBlogId: string): void {
    this.blogId = selectedBlogId;
    this.mainService.handleBlogChange(selectedBlogId);
  }

  onSearchPost(query: string): void {
    this.mainService.handleSearch(this.blogId, query);
  }

  onLogout(): void {
    this.authService.handleAuth();
  }

  ngOnDestroy(): void {
    this.routeChangeSub.unsubscribe();
  }

}
